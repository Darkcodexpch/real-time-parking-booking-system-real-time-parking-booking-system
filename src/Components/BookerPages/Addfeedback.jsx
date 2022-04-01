import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Addfeedback() {
  return (
    <>

      <Col lg={12} >
        <h1 className='text-center text-muted'>Add Feedback</h1>
        <Form className='Form'>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" className='form-ip' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }} className='form-ip'/>
          </Form.Group>


          <Button className="btn1" type="submit">
            Submit
          </Button>

        </Form>
      </Col>

    </>
  )
}

export default Addfeedback