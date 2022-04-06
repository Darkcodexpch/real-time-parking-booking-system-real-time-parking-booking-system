import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import emailjs, { init } from "@emailjs/browser"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { db } from '../Firebase/FirebaseConfig'
import Modal from 'react-bootstrap/Modal'
import uuid from 'react-uuid'
import { useState, useEffect, useRef } from 'react'
import moment from 'moment';

export const BookingSlots = () => {
    init("PAfOiyPTYcTSLRiQK");
    const form = useRef();
    let logdata = JSON.parse(localStorage.getItem('logindata'));
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
    const [show, setShow] = useState(false);
    const [bookername, setBookername] = useState(logdata[0].name)
    const [userid, setUserid] = useState(logdata[0].uid)
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

    console.log(startDate)
    let emailid = uuid();
    // email work
    const [message, setmessage] = useState(`Hello ${logdata[0].name} your Booking number is ${emailid}`);

    const bookingHandler = (e) => {
        e.preventDefault()
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
            setShow(false)
        }

        emailjs.sendForm("service_xlvqvk7", "template_hhwgxkh", form.current, "PAfOiyPTYcTSLRiQK").then(
            (result) => {
                alert("Message Sent Successfully");
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );


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


      //    get current Date Slots work
// const [currentDAte, setCurrentDate] = useState(moment().format('MMM DD YYYY h:mm A'))
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
        if (!getBookedSlotData) {
            return <></>
        } else if (getBookedSlotData.find(({ data }) => data.bookerid === i && data.parking === v.data.nameparking && moment(endDate).format('MMM DD YYYY h:mm A') < moment(data.endDate).format('MMM DD YYYY h:mm A'))) {
            return <button key={i} className='slots' style={{ backgroundColor: "green" }} onClick={() => handleShow(i, v.data.nameparking)} disabled>
                <h3>{`Slot ${i + 1} Booked`}</h3>
            </button>
        } else {
            return <button key={i} className='slots' style={{backgroundColor:"red",color:"white"}} onClick={() => handleShow(i, v.data.nameparking)}>
                <h3>{`Slot ${i + 1} Available For booking`}</h3>
            </button>
        }
    }


    return (
        <>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" onSubmit={bookingHandler}>
                            <Form.Label>Enter Start time</Form.Label>
                            <Form.Control type="datetime-local"  value={startDate} onChange={(e) => { setStartDate(e.target.value) }}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter End time</Form.Label>
                            <Form.Control type="datetime-local" value={endDate} onChange={(e) => { setEndDate(e.target.value) }}/>
                        </Form.Group>
                        {/* <Button variant="primary" type="submit">
                            View Available slots
                        </Button> */}
                    </Form>

                </Col>
            </Row>

            {endDate ===''?<h1>Please Select dates to show slots</h1>: slotData && slotData.map((v, index) => {
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
                    <form onSubmit={bookingHandler} ref={form}>
                        <input type="text" className='form-control m-2' placeholder='Booker id' value={bookerid} onChange={(e) => { setBookerid(e.target.value) }} name='bookerid' />
                        <input type="text" className='form-control m-2' placeholder='Booker id' value={bookername} onChange={(e) => { setBookername(e.target.value) }} name='bookername' />
                        <input type="datetime-local" className='form-control m-2' value={startDate} />
                        <input type="datetime-local" className='form-control m-2' value={endDate}/>
                        <input type="hidden" className='form-control m-2' value={message} onChange={(e) => { setmessage(e.target.value) }} name='message' />
                        <button className='btn btn-primary mt-2'>Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}
