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
    const [bookername,setBookername] = useState(lodData[0].name)
    const [userid,setUserid] = useState(lodData[0].uid)
    const[startDate,setStartDate] =useState('')
    const[endDate,setEndDate] =useState('')
    const [bookingstatus,setBookingstatus] = useState(true);

    const handleClose = () => setShow(false);
    const[bookerid,setBookerid]=useState('')
      const handleShow = (parking) => {
      setShow(true);
       setBookerid(parking.parkingid)
    }

    const bookingHandler =()=>{
        let bookingData ={
            bookerid,
            bookername,
            userid,
            startDate,
            endDate,
            bookingstatus

        }
        console.log(bookingData)
    }

    return (
        <>
            
                 <Row  className="text-center mt-2 myd">
                {parkingdata && parkingdata.map((parking, index) => { 
                 return <Col md={4} key={index}>
                    <button className='slots' onClick={() => handleShow(parking)}>
                        <h3>{parking.parkingname}</h3>
                    </button>
                </Col>
                })}
            </Row>
             
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Book This Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control m-2' placeholder='Booker id' value={bookerid} onChange={(e)=>{setBookerid(e.target.value)}} />
                    <input type="datetime-local" className='form-control m-2' value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} />
                    <input type="datetime-local" className='form-control m-2' value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} />
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
