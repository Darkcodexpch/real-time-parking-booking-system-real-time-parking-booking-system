import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { db } from '../Firebase/FirebaseConfig'
import { useState, useEffect } from 'react'

export const BookingSlots = () => {
    const [parkingdata, setParkingData] = useState([]);

    useEffect(() => {
        db.ref("Parkings").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({
                    data: data.val()
                })
            })
            setParkingData(newdata)
        })
    }, [])
    return (
        <>
            {parkingdata && parkingdata.map((parking, index) => {
                return <Row key={index} className="text-center mt-2">
                    <Col>
                        <button className='slots'>
                            <h3>{parking.data.Slot1.parkingname}</h3>
                        </button>
                    </Col>
                    <Col>
                        <button className='slots'>
                            <h3>{parking.data.Slot2.parkingname}</h3>
                        </button>
                    </Col>
                    <Col>
                        <button className='slots'>
                            <h3>{parking.data.Slot3.parkingname}</h3>
                        </button>
                    </Col>
                </Row>
            })}
        </>
    )
}
