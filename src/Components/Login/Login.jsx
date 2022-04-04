import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db,auth } from '../Firebase/FirebaseConfig'

function Login() {
    let navigate = useNavigate()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    // const [loginData,setLoginData] = useState('')
    // useEffect(()=>{
    //     if(loginData !== ""){
    //         localStorage.setItem("logindata",JSON.stringify(loginData));
    //     }
         
    //     console.log("LoginData: ", loginData)
    // },[loginData])
 
    const loginHandler = (e)=>{
        e.preventDefault();
        if(email==="" || password===""){
            toast.error('Please Fill All fileds Correctly!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else{
            auth.signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Signed in
                var user = userCredential.user;   
                db.ref().child("users").child(user.uid).get().then((snapshot) => {
                    if (!snapshot.exists()) return;
                    let userdata = snapshot.val()
                    localStorage.setItem("logindata",JSON.stringify([userdata]));
                    if(userdata?.type === 1){
                        navigate('/Booker')
                    }
                    else if(userdata?.type === 2){
                        navigate('/Admin')
                    }
                  })
              })
              .catch((error) => {
                console.error(error);
                
              });
            
        }   

    }
  return (
      <>
      <Header/>
    <Row className='Signup-form my-2 py-4'>
    <Col lg={8} className="offset-2">
        <h1 className='text-center text-muted'>Login Form</h1>
        <Form className='Form' onSubmit={loginHandler}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" className='form-ip' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Form.Text className="text-muted form-ip">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" className='form-ip' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>

            <Button className="btn1" type="submit">
                Login
            </Button>

            <Form.Text>
                <Link to="Signup">
                <p className="font-monospace mt-1  fw-bold">Didn't Have an Account?</p>
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
<Footer/>
</>
  )
}

export default Login