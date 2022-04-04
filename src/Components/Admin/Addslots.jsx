import Row from 'react-bootstrap/Row'
import uuid from 'react-uuid'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { db } from '../Firebase/FirebaseConfig'
import { useState, useEffect } from 'react'
import { useToastContainer } from 'react-toastify'
function Addslots() {
    const [nameparking, setNameparking] = useState('')
    const [numberparking, setNumberparking] = useState('')

    const [userData, setUserDAta] = useState('')
    useEffect(() => {
        db.ref("slotdetails").on('value', (snapshot) => {
            let newdata = [];
            snapshot.forEach(data => {
                newdata.push({ data: data.val() })

            })
            newdata && setUserDAta(newdata)
        })
    }, [])

    const [show,setShow] = useState('')
    const [updateparkingname,setUpdateparkingname] = useState('');
    const [updateparkingnumber,setUpdateparkingnumber] = useState('');
    const [id,setId] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true)
        setUpdateparkingname(data.nameparking);
        setUpdateparkingnumber(data.numberparking);
        setId(data.id)

    }

    const editHandler = () => {
        db.ref("slotdetails").child(`${id}`).update({ nameparking: updateparkingname, numberparking: updateparkingnumber }).then(() => {
            alert("Data Updated")
            setUpdateparkingname('')
            setUpdateparkingnumber('')
            setShow(false)

        })
    }
    const deleteHandler = (id) => {
        db.ref("slotdetails").child(id).remove()
    setUserDAta(userData.filter((elem, index) => { if (elem.data.id != id) return elem }))
    alert("Deleted Succesfully")

    }


    const addSlotsHandler = (e) => {
        e.preventDefault();
        if (nameparking === '' || numberparking === '') {
            alert("Fill All fields")
        }
        else {
            let id = uuid();
            let slotDetails = {
                id,
                nameparking,
                numberparking
            }
            db.ref('/').child(`slotdetails/${id}`).set(slotDetails)
            alert("slot Added Successfully")
            setNameparking('')
            setNumberparking('')
        }


    }
    return (
        <><Row>
            <Col>
                <h1 className='text-center text-muted'>Add Slots</h1>
                <Form className='Form' onSubmit={addSlotsHandler}>

                    <Form.Group className="mb-3">
                        <Form.Label>Slot Name</Form.Label>
                        <Form.Control type="text" placeholder="Slot Name" value={nameparking} onChange={(e) => { setNameparking(e.target.value) }} />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Slot Number</Form.Label>
                        <Form.Control type="text" placeholder="Slot Number" value={numberparking} onChange={(e) => { setNumberparking(e.target.value) }} />
                    </Form.Group>

                    <Button variant='primary btn-lg' type="submit">
                        Add Slot
                    </Button>
                </Form>
            </Col>
        </Row>

            <Row>
                <Col md={12}>
                    <h3 className='text-muted text-center'>Slots Details</h3>
                    {userData.length === 0 ? <h3 className='text-center mt-5 text-muted'>No data Available</h3> : <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Slot Name</th>
                                <th>Slots Number</th>
                                <th>Edit Slot</th>
                                <th>Delete Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData && userData.map((v, k) => {
                                return <tr key={k}>
                                    <td>{k + 1}</td>
                                    <td>{v.data.nameparking}</td>
                                    <td>{v.data.numberparking}</td>
                                    <td><Button variant='primary' onClick={()=>handleShow(v.data)}>Edit</Button></td>
                                    <td><Button variant='danger' onClick={()=>deleteHandler(v.data.id)}>Delete</Button></td>
                                </tr>

                            })}
                        </tbody>
                    </Table>}
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Slot Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control m-2' value={updateparkingname} onChange={(e) => { setUpdateparkingname(e.target.value) }} />
                    <input type="text" className='form-control m-2' value={updateparkingnumber} onChange={(e) => { setUpdateparkingnumber(e.target.value) }} />
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

export default Addslots