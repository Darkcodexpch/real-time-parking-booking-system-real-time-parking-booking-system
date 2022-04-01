import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Footer.css'

const Footer = () => {
  return (
<Row className='bg-primary text-white lead fw-bold mt-2'>
    <Col>
    <footer className='d-flex justify-content-center align-items-center'>
    <p>&copy;  Real-time Parking Booking System</p>
    </footer>
    </Col>
    </Row>    
  )
}

export default Footer