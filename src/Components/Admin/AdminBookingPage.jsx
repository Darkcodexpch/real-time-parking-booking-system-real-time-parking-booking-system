import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import './Admin.css'
import React from 'react'
import { db } from '../Firebase/FirebaseConfig'
import { useEffect,useState } from 'react'
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

    const editHandler = (id)=>{
        console.log(id)
    }
    const deleteHandler = (id)=>{
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
                  <h3 className='text-muted text-center'>User Details</h3>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Edit</th>
                              <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody>{userData && userData.map((v,k)=>{
                              return<tr key={k}>
                              <td>{k+1}</td>
                              <td>{v.data.name}</td>
                              <td>{v.data.email}</td>
                              <td><Button variant='primary' onClick={()=>editHandler(v.data.uid)}>Edit</Button></td>
                              <td><Button variant='danger' onClick={()=>deleteHandler(v.data.uid)}>Delete</Button></td></tr>})}

                              </tbody>
                  </Table>
              </Col>
          </Row>
          </>
  )
}

export default AdminBookingPage