import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { db } from '../Firebase/FirebaseConfig'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'

export const BookingSlots = () => {
    const [parkingdata, setParkingData] = useState();
    let lodData = JSON.parse(localStorage.getItem('logindata'));
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
    const [show, setShow] = useState(false);
    const [bookername, setBookername] = useState(lodData[0].name)
    const [userid, setUserid] = useState(lodData[0].uid)
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
            let bookingData = {
                parking,
                bookerid,
                bookername,
                userid,
                startDate,
                endDate,
                bookingstatus

            }
            db.ref('/').child('Bookedslots').push(bookingData)
            alert("slot booked Successfully")
            setBookerid('')
            setEndDate('')
            setStartDate('')
        }


    }
    let logdata = JSON.parse(localStorage.getItem('logindata'));

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

    return (
        <>
            {slotData && slotData.map(({ data }, index) => {
                return <Row className="text-center mt-2 myd" key={data.numberparking}>
                    <h3>{data.nameparking}</h3>
                    {new Array(Number(data.numberparking)).fill(" ").map((a, i) => {
                        return <Col md={4} key={i} className='my-2'>
                            <button key={i} className='slots' onClick={() => handleShow(i, data.nameparking)}>
                                <h3>{`Slot ${i + 1}`}</h3>
                            </button>
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
