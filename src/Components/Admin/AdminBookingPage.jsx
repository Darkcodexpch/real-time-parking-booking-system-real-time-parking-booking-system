import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import './Admin.css'
import React from 'react'
import { db } from '../Firebase/FirebaseConfig'
import { useEffect, useState } from 'react'
function AdminBookingPage() {
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

    const [updatename, setUpdatename] = useState('');
    const [userid, setUserid] = useState('')
    const [updateemail, setUpdateemail] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true)
        setUpdatename(data.name);
        setUpdateemail(data.email);
        setUserid(data.uid)

    }

    const editHandler = () => {
        db.ref("users").child(`${userid}`).update({ name: updatename, email: updateemail }).then(() => {
            alert("Data Updated")
            setUpdatename('')
            setUpdateemail('')
            setShow(false)

        })
    }
    const deleteHandler = (id) => {
        db.ref("users").child(id).remove()
        setUserDAta(userData.filter((elem, index) => { if (elem.data.uid != id) return elem }))
        alert("delete Succefully")

    }

    return (
        <>
            <Row className='mt-3'>
                <Col md={12}>
                    <input type="search" placeholder='Search' className='form-control searchip' />
                </Col>
            </Row><Row className='mt-3'>
                <Col md={12}>
                    <h3 className='text-muted text-center'>User Details</h3>
                    {userData.length === 0 ? <h3 className='text-center mt-5 text-muted'>No data Available</h3> : <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>{userData && userData.map((v, k) => {
                            return <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{v.data.name}</td>
                                <td>{v.data.email}</td>
                                <td><Button variant='primary' onClick={() => handleShow(v.data)}>Edit</Button></td>
                                <td><Button variant='danger' onClick={() => deleteHandler(v.data.uid)}>Delete</Button></td></tr>
                        })}

                        </tbody>
                    </Table>}

                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control m-2' value={updatename} onChange={(e) => { setUpdatename(e.target.value) }} />
                    <input type="text" className='form-control m-2' value={updateemail} onChange={(e) => { setUpdateemail(e.target.value) }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminBookingPage