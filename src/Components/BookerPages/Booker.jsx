import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { BookingSlots } from './BookingSlots'
import './Booker.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'


function Booker(){
    let navigate = useNavigate();
    const logoutHandler = ()=>{
        localStorage.removeItem('logindata');
        navigate('/')
        
    }
    let logdata =  JSON.parse(localStorage.getItem('logindata'));

    return (
        <>
            <Header />
            {/* Adminheading */}
            <Row className='my-2'>
                <Col>
                    <h1 className='text-muted text-center mt-3'>Booking Slot Section</h1>
                </Col>
            </Row>
            {/* AdminHead */}
            <Row className='my-2'>
                <Col md={12} className="d-flex justify-content-around">
                    <h1 className='Admin-Head'>{`Welcom ${logdata && logdata[0].name}`}</h1>
                    <Button variant='danger' onClick={logoutHandler}>Logout</Button>
                </Col>
            </Row>

            {/* AdminBody */}

            <Row>
                <Col md={4}>
                    <ul className="Sidebarul">
                        <NavLink to="/Booker">
                            <li className='sidebarli shadow-sm p-2 mb-3 rounded'>Dashboard</li>
                        </NavLink>
                        <NavLink to="/Booker/MyBooking">
                            <li className='sidebarli shadow-sm p-2 mb-3 rounded'>My Bookings</li>
                        </NavLink>
                        <NavLink to="/Booker/Feedback">
                            <li className='sidebarli shadow-sm p-2 mb-3 rounded'>Add Feedback to Admin</li>
                        </NavLink>
                    </ul>
                </Col>
                <Col md={8}>
                    <Outlet />
                </Col>
            </Row>
            <Footer />
        </>
    )
}

export default Booker