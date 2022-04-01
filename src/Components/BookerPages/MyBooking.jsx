import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

export default function MyBooking() {
  return (
    <>
    <Row className='mt-3'>
          <Col md={12}>
              <input type="search" placeholder='Search' className='form-control searchip' />
          </Col>
      </Row>
      <Row className='mt-3'>
              <Col md={12}>
                  <h3 className='text-muted text-center'>My Booking</h3>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Booker Id</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Status</th>
                              <th>Cancle Booking</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>Booker id</td>
                              <td>Start Time</td>
                              <td>End Time</td>
                               <td>Status</td>
                              <td><Button variant='danger'>Cancle</Button></td>
                          </tr>
                      </tbody>
                  </Table>
              </Col>
          </Row>
          </>
  )
}
