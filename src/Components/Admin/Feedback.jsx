import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import './Admin.css'
import { db } from '../Firebase/FirebaseConfig'
import { useState, useEffect } from 'react'
import React from 'react'
export default function Feedback() {
    const [userData, setUserDAta] = useState('')
    useEffect(() => {
        db.ref("feedbackmessage").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({ data: data.val() })

            })
            newdata && setUserDAta(newdata)
        })
    }, [])

    const [show, setShow] = useState(false)
    const [feeback,setFeedback] = useState('');
    const [uid,setUid] = useState('')
    const [adminreply,setAdminreply] = useState('');
    const hanldeShow = (data) => {
        setShow(true)
        setUid(data.id)
        setAdminreply(data.adminreply)
        }
    const hanldeClose = () => setShow(false)

    const editHandler = () => {
        db.ref("feedbackmessage").child(`${uid}`).update({ 
            adminreply: feeback
         
           }).then(() => {
               alert("Feedback Added")
               setFeedback("")
               setShow(false)
             })
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
                                <th>Booker Name</th>
                                <th>Reply Feeback</th>
                            </tr>
                        </thead>
                        <tbody>{userData && userData.map((v, k) => {
                            return <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{v.data.name}</td>
                                <td>{v.data.message}</td>
                                {v.data.adminreply === 'No message Yet' ? <td><Button variant='primary' onClick={() => hanldeShow(v.data)}>Add feedback</Button></td> : <td><Button variant='disable'>Already Reply</Button></td>}
                            </tr>
                        })}

                        </tbody>
                    </Table>}
                </Col>
            </Row>

            <Modal show={show} onHide={hanldeClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Reply Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="form-control" style={{height:100}} placeholder="Add Feedback" value={feeback} onChange={(e)=>setFeedback(e.target.value)}></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hanldeClose}>
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
