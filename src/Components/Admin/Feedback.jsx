import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import './Admin.css'
import { db } from '../Firebase/FirebaseConfig'
import { useState, useEffect } from 'react'
import React from 'react'
export default function Feedback() {
    const [userData, setUserDAta] = useState('')
    useEffect(() => {
        db.ref("users").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({ data: data.val() })

            })
            newdata && setUserDAta(newdata)
        })
    }, [])

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
            </Row>
            <Row className='mt-3'>

                <Col md={12}>
                    <h3 className='text-muted text-center'>Feedback Section</h3>
                    {userData.length === 0 ? <h3 className='text-center mt-5 text-muted'>No data Available</h3> : <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>Booker Message</th>
                                <th>Reply Feeback</th>
                            </tr>
                        </thead>
                        <tbody>{userData && userData.map((v, k) => {
                            return <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{v.data.name}</td>
                                <td>Something Happens</td>
                                <td><Button variant='primary' onClick={() => editHandler(v.data.uid)}>Add feedback</Button></td>
                            </tr>
                        })}

                        </tbody>
                    </Table>}
                </Col>
            </Row></>
    )
}
