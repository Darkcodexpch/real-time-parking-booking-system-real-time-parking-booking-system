import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import './Admin.css'
import React from 'react'
export default function Feedback() {
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
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Booker Name</th>
                              <th>Booker Message</th>
                              <th>Reply Feeback</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>Booker Name</td>
                              <td>Booker Message</td>
                              <td><Button variant='primary'>Reply Feedback</Button></td>
                          </tr>
                      </tbody>
                  </Table>
              </Col>
          </Row></>
  )
}
