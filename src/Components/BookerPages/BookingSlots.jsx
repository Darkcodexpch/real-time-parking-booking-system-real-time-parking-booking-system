import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { db } from '../Firebase/FirebaseConfig'
import Modal from 'react-bootstrap/Modal'
import uuid from 'react-uuid'
import { useState, useEffect } from 'react'

export const BookingSlots = () => {
    let logdata =  JSON.parse(localStorage.getItem('logindata'));
    console.log("lodData",logdata)
    const [parkingdata, setParkingData] = useState();
    useEffect(() => {
        db.ref("Parkings").on('value', (snapshot) => {
            let newdata = []
            snapshot.forEach(data => {
                newdata.push(data.val())
            })
            setParkingData(newdata)
        })
    }, [])

    // Modal Work

    // logdata[0].name
    // logdata[0].uid
    const [show, setShow] = useState(false);
    const [bookername, setBookername] = useState('')
    const [userid, setUserid] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [bookingstatus, setBookingstatus] = useState(true);

    const handleClose = () => setShow(false);
    const [bookerid, setBookerid] = useState('')
    const [parking, setParking] = useState('')
    const handleShow = (i, daata) => {
        setShow(true);
        setParking(daata)
        setBookerid(i)
    }

    const bookingHandler = () => {
        if (parking === '' || bookerid === '' || bookername === '' || startDate === '' || endDate === '') {
            alert("Please fill All fields")
        }
        else {
            let id = uuid()
            let bookingData = {
                id,
                parking,
                bookerid,
                bookername,
                userid,
                startDate,
                endDate,
                bookingstatus

            }
            db.ref('/').child(`Bookedslots/${id}`).set(bookingData)
            alert("slot booked Successfully")
            setBookerid('')
            setEndDate('')
            setStartDate('')
        }


    }

    // get slotData
    const [slotData, setSlotDAta] = useState('')
    useEffect(() => {
        db.ref("slotdetails").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({ data: data.val() })

            })
            newdata && setSlotDAta(newdata)
        })
    }, [])

    // get Booked SlotDAta
    const [getBookedSlotData, setgetBookedSlotData] = useState('')
    useEffect(() => {
        db.ref("Bookedslots").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({ data: data.val() })

            })
            newdata && setgetBookedSlotData(newdata)
        })
    }, [])

    const bookedSlot = (v, i) => {
        if (!getBookedSlotData) return <></>
        const data = getBookedSlotData.find(({ data }) => data.bookerid == i && data.parking == v.data.nameparking)
        return data ? <button key={i} className='slots' style={{backgroundColor:"yellow"}} onClick={() => handleShow(i, v.data.nameparking)} disabled>
        <h3>{`Slot ${i + 1} Booked`}</h3>
    </button> : <button key={i} className='slots' onClick={() => handleShow(i, v.data.nameparking)}>
            <h3>{`Slot ${i + 1}`}</h3>
        </button>
    }

    return (
        <>
            {slotData && slotData.map((v, index) => {
                console.log("v", v.data.nameparking)
                return <Row className="text-center mt-2 myd" key={v.data.numberparking}>
                    <h3>{v.data.nameparking}</h3>
                    {new Array(Number(v.data.numberparking)).fill(" ").map((a, i) => {
                        return <Col md={4} key={i} className='my-2'>
                            {bookedSlot(v, i)}
                        </Col>
                    })}

                </Row>
            })}

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Book This Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control m-2' placeholder='Booker id' value={bookerid} onChange={(e) => { setBookerid(e.target.value) }} />
                    <input type="datetime-local" className='form-control m-2' value={startDate} onChange={(e) => { setStartDate(e.target.value) }} />
                    <input type="datetime-local" className='form-control m-2' value={endDate} onChange={(e) => { setEndDate(e.target.value) }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={bookingHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
