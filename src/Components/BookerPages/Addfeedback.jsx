import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useState,useEffect} from 'react'
import { db } from '../Firebase/FirebaseConfig'

function Addfeedback() {
  let userDatabase = JSON.parse(localStorage.getItem("logindata"));
  const [message, setMessage] = useState('')
  const messageHandler = (e) => {
    e.preventDefault();
    if (message === '') {
      alert("Please Add message first")
    }
    else {
      let messagedetail = {
        id: userDatabase[0].uid,
        email: userDatabase[0].email,
        name: userDatabase[0].name,
        message,
        adminreply: "No message Yet"
      }
      db.ref('/').child('feedbackmessage').child(userDatabase[0].uid).set(messagedetail)
      setMessage('')
      alert("Message Sent Succesfully ✨")

    }
  }

  
//  feeting feedback data behalf id
const [feedback, setfeedback] = useState('')
useEffect(() => {
  db.ref("feedbackmessage").on('value', (snapshot) => {
    let newdata = [];
    snapshot.forEach(data => {
      newdata.push({
        data: data.val()
      })
    })
    var newArray = newdata.filter(function (el) {
      return el.data.id ===  userDatabase[0].uid
    }
    );
    setfeedback(newArray)
  })
}, [])

console.log(feedback)
  return (
    <>
      <Row className="mt-2">
        <Col lg={6} >
          <h1 className='text-center text-muted'>Add Feedback</h1>
          <Form className='Form' onSubmit={messageHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Leave us  a message 😊</Form.Label>
              <Form.Control as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }} value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <Button className="btn btn-prmary" type="submit">
              Add Feedback
            </Button>

          </Form>
        </Col>


        <Col lg={6} calssName="my-3" >
          <h1 className='text-center text-muted'>Admin Reply</h1>
          {feedback.length===0 ?<h3 className='text-center text-muted my-5'>
            No Data Available

          </h3> : <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Admin Reply</th>
              </tr>
            </thead>
            <tbody>
            {feedback && feedback.map((v,k)=>{
              return <tr key={k}>
                <td>{k+1}</td>
                <td>{v.data.adminreply}</td>

              </tr>
            })}
            </tbody>
          </Table> }
        </Col>
      </Row>

    </>
  )
}

export default Addfeedback