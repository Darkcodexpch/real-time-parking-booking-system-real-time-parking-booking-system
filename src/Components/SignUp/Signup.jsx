import './Signup.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { db, auth } from '../Firebase/FirebaseConfig'
import { useState } from 'react'
function Signup() {
    let navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type,setType] = useState(1)
    const formHandler = (e) => {
        e.preventDefault()
        if (name === "" || email === "" || password === "") {
            toast.error('Please Fill All Fields !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

        else {
            let user = {
                name,
                email,
                password,
                type
            }
            auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                let uid = userCredential.user.uid
                user.uid = uid;
                db.ref('/').child('users').child(uid).set(user)
                toast.success('🦄 Signup Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                setName('')
                setEmail('')
                setPassword('')
                navigate('/')
            })
            .catch((error) => {
                if(error.code === "auth/email-already-in-use"){
                     toast.error('Please try anoter email Current Email is already used by another User!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setName('')
                    setEmail('')
                    setPassword('')

                }
            });
        }
    }
  return (
    <>
    <Header />
    <Row className='Signup-form my-2 py-4'>

        <Col lg={8} className="offset-2">
            <h1 className='text-center text-muted'>Sign up Form</h1>
            <Form className='Form' onSubmit={formHandler}>
                <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" className='form-ip' value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className='form-ip' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted form-ip">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className='form-ip' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button className="btn1" type="submit">
                    Sign up
                </Button>

                <Form.Text>
                    <Link to="/">
                        <p className="font-monospace mt-1  fw-bold">Have an Account?</p>
                    </Link>
                </Form.Text>
            </Form>
        </Col>
    </Row>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    <Footer />

</>
  )
}

export default Signup