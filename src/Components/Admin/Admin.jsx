import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import './Admin.css'
import { useState } from 'react'
import React from 'react'
import AdminBookingPage from './AdminBookingPage'
import BookingDetails from './BookingDetails'
import Feedback from './Feedback'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet, NavLink } from 'react-router-dom'
function Admin() {
    return (
        <>
        <Header/>
            {/* Adminheading */}
            <Row>
                <Col>
                    <h1 className='text-muted text-center mt-3'>Admin Panel</h1>
                </Col>
            </Row>
            {/* AdminHead */}
            <Row className='mt-3'>
                <Col md={12} className="d-flex justify-content-between">
                    <h1 className='Admin-Head'>Admin</h1>
                    <Button variant='danger'>Logout</Button>
                </Col>
            </Row>

            {/* AdminBody */}
           
               <Row>
                <Col md={4}>
                    <ul className="Sidebarul">
                        <NavLink to="/Admin"><li className='sidebarli shadow-sm p-2 mb-3 rounded'>User Data</li></NavLink>
                        <NavLink to="/Admin/Bookingdetails"><li className='sidebarli shadow-sm p-2 mb-3 rounded'>Booking Data</li></NavLink>
                        <NavLink to="/Admin/Feedback"> <li className='sidebarli shadow-sm p-2 mb-3 rounded'>Feedbacks</li></NavLink>
                        <NavLink to="/Admin/Addslots"> <li className='sidebarli shadow-sm p-2 mb-3 rounded'>Add Slots</li></NavLink>
                    </ul>
                </Col>
                <Col md={8}>
                 <Outlet />
                </Col>
            </Row>
       <Footer/>

        </>
    )
}

export default Admin