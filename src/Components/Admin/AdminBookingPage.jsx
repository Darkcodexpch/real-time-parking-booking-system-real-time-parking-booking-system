import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import './Admin.css'
import React from 'react'

function AdminBookingPage() {
  return (
    <><Row className='mt-3'>
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
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>Booker Name</td>
                              <td>Booker Email</td>
                              <td><Button variant='primary'>Edit</Button></td>
                              <td><Button variant='danger'>Delete</Button></td>
                          </tr>
                      </tbody>
                  </Table>
              </Col>
          </Row></>
  )
}

export default AdminBookingPage