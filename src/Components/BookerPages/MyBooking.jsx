import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { db } from '../Firebase/FirebaseConfig'
import { useState,useEffect } from 'react'

export default function MyBooking() {
    let user = JSON.parse(localStorage.getItem('logindata'));
    const [bookingData,setbookingData] = useState('')
    useEffect(() => {
        db.ref("Bookedslots").on('value', (snapshot) => {
          let newdata = [];
          snapshot.forEach(data => {
            newdata.push({
              data: data.val()
            })
          })
          var newArray = newdata.filter(function (el) {
            return el.data.userid === user[0].uid && user[0].uid
          }
          );
          setbookingData(newArray)
        })
      }, [])

      const cancleBookingHandler =(id)=>{
          db.ref("Bookedslots").child(id).remove()
          setbookingData(bookingData.filter((elem, index) => { if (elem.data.id != id) return elem }))
          alert("delete Succefully")
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
                  <h3 className='text-muted text-center'>My Booking</h3>
                  {bookingData.length === 0 ? <h3 className='text-center mt-5 text-muted'>No data Available</h3>:<Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Booker Id</th>
                              <th>Booker Name</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Cancle Booking</th>
                          </tr>
                      </thead>
                      <tbody>{bookingData && bookingData.map((v,k)=>{
                              return <tr key={k}>
                              <td>{k+1}</td>
                              <td>{v.data.bookerid}</td>
                              <td>{v.data.bookername}</td>
                              <td>{v.data.startDate}</td>
                              <td>{v.data.endDate}</td>
                              <td><Button variant='danger' onClick={()=>{(cancleBookingHandler(v.data.id))}}>Cancle</Button></td>
                          </tr>})}</tbody>
                  </Table>}
              </Col>
          </Row>
          </>
  )
}
