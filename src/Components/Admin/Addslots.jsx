import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { db } from '../Firebase/FirebaseConfig'
import { useState,useEffect } from 'react'
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

    const editHandler = (id)=>{
        console.log(id)
    }
    const deleteHandler = (id)=>{
        console.log(id)
        
    }


    const addSlotsHandler = (e) => {
        e.preventDefault();
        if(nameparking ==='' ||numberparking==='' ){
        alert("Fill All fields")
        }
        else{
            let slotDetails = {
                nameparking,
                numberparking
            }
            db.ref('/').child('slotdetails').push(slotDetails)
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
                    <Table striped bordered hover>
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
                            {userData && userData.map((v,k)=>{
                                return <tr key={k}>
                                <td>{k+1}</td>
                                <td>{v.data.nameparking}</td>
                                <td>{v.data.numberparking}</td>
                                <td><Button variant='primary'>Edit</Button></td>
                                <td><Button variant='danger'>Cancle</Button></td>
                            </tr>
 
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default Addslots