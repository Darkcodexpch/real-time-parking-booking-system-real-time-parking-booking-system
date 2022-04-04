import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

function Addfeedback() {
  let userDatabase = JSON.parse(localStorage.getItem("logindata"));
  const [message,setMessage] = useState('')
  const messageHandler =(e)=>{
    e.preventDefault();
    if(message===''){
      alert("Please Add message first")
    }
    else{
      let messagedetail ={
        id:userDatabase[0].uid,
        email:userDatabase[0].email,
        name:userDatabase[0].name,
        message
      } 
      setMessage('')

    }
    }
  return (
    <>

      <Col lg={12} >
        <h1 className='text-center text-muted'>Add Feedback</h1>
        <Form className='Form' onSubmit={messageHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Leave us  a message 😊</Form.Label>
            <Form.Control as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }} value={message} onChange={(e)=>setMessage(e.target.value)}/>
          </Form.Group>
          <Button className="btn btn-prmary" type="submit">
            Add Feedback
          </Button>

        </Form>
      </Col>

    </>
  )
}

export default Addfeedback