import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (

        <Row className='mt-2'>
            <Col md={12} sm={6}>
                <nav className="navbar navbar-dark bg-primary header">
                    <h3>Real-time Parking Booking System</h3>
                    <div className='nav'>
                        <ul className='navbar-nav me-auto my-2 my-lg-0'>
                            <Link to='/'> <li className="nav-item">Home</li></Link>
                            <Link to='/'><li className="nav-item">
                                Login
                            </li></Link>
                            <Link to="/About">
                            <li className="nav-item">
                                About
                            </li>
                            </Link>
                        </ul>
                    </div>

                </nav>
            </Col>
        </Row>

    )
}
