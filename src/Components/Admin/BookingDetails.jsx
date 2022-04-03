import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import './Admin.css'
import { db } from '../Firebase/FirebaseConfig'
import { useState, useEffect } from 'react'
import React from 'react'

export default function BookingDetails() {
    const [userData, setUserDAta] = useState('')
    useEffect(() => {
        db.ref("Bookedslots").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({ data: data.val() })

            })
            newdata && setUserDAta(newdata)
        })
    }, [])
console.log(userData)
    const editHandler = (id) => {
        console.log(id)
    }
    const deleteHandler = (id) => {
        console.log(id)

    }
    return (
        <>
            <Row className='mt-3'>
                <Col md={12}>
                    <input type="search" placeholder='Search' className='form-control searchip' />
                </Col>
            </Row><Row className='mt-3'>
                <Col md={12}>
                    <h3 className='text-muted text-center'>Booking Details</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Booking id</th>
                                <th>Booker Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>{userData && userData.map((v, k) => {
                            return <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{v.data.bookerid}</td>
                                <td>{v.data.bookername}</td>
                                <td>{v.data.startDate}</td>
                                <td>{v.data.endDate}</td>
                                <td><Button variant='primary' onClick={() => editHandler(v.data.uid)}>Edit</Button></td>
                                <td><Button variant='danger' onClick={() => deleteHandler(v.data.uid)}>Delete</Button></td></tr>
                        })}

                        </tbody>
                    </Table>
                </Col>
            </Row>

        </>)

}
