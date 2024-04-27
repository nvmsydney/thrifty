import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
const info = document.cookie.split(';');
 

const EditAccount = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col md={8}>
          <h2>Account</h2>
          <Form>
            <div className="profile-pic-wrapper mt-4">
              <Image src="src/assets/men1.jpg" roundedCircle />
              <Button variant="primary" className="btn btn-dark">
                Upload Profile Picture
              </Button>
            </div>
            {/* Email Address */}
            <Form.Group className="mb-3 pt-4" controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control type="email" value={info[1].substring(info[1].indexOf('=') + 1,info[1].length )} />
            </Form.Group>
            {/* Username */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value= {info[0].substring(info[0].indexOf('=') + 1,info[0].length )} />
            </Form.Group>
            {/* Bio */}
            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label>Bio:</Form.Label>
              <Form.Control as="textarea" rows={3} value={info[2].substring(info[2].indexOf('=') + 1,info[2].length )} />
            </Form.Group>
            {/* Head Circumference */}
            <Form.Group className="mb-3" controlId="formHeadCircumference">
              <Form.Label>Head Circumference:</Form.Label>
              <Form.Control type="text" placeholder="Head Circumference" />
            </Form.Group>
            {/* Shoulder Width */}
            <Form.Group className="mb-3" controlId="formShoulderWidth">
              <Form.Label>Shoulder Width:</Form.Label>
              <Form.Control type="text" placeholder="Shoulder Width" />
            </Form.Group>
            {/* Neck Size */}
            <Form.Group className="mb-3" controlId="formNeckSize">
              <Form.Label>Neck Size:</Form.Label>
              <Form.Control type="text" placeholder="Neck Size" />
            </Form.Group>
            {/* Hip Measurements */}
            <Form.Group className="mb-3" controlId="formHipMeasurements">
              <Form.Label>Hip Measurements:</Form.Label>
              <Form.Control type="text" placeholder="Hip Measurements" />
            </Form.Group>
            {/* Arm Length */}
            <Form.Group className="mb-3" controlId="formArmLength">
              <Form.Label>Arm Length:</Form.Label>
              <Form.Control type="text" placeholder="Arm Length" />
            </Form.Group>
            {/* Leg Length */}
            <Form.Group className="mb-3" controlId="formLegLength">
              <Form.Label>Leg Length:</Form.Label>
              <Form.Control type="text" placeholder="Leg Length" />
            </Form.Group>
            {/* Foot Length */}
            <Form.Group className="mb-3" controlId="formFootLength">
              <Form.Label>Foot Length:</Form.Label>
              <Form.Control type="text" placeholder="Foot Length" />
            </Form.Group>
            {/* Body Height */}
            <Form.Group className="mb-3" controlId="formBodyHeight">
              <Form.Label>Body Height:</Form.Label>
              <Form.Control type="text" placeholder="Body Height" />
            </Form.Group>
            {/* Shoe Size */}
            <Form.Group className="mb-3" controlId="formShoeSize">
              <Form.Label>Shoe Size:</Form.Label>
              <Form.Control type="text" placeholder="Shoe Size" />
            </Form.Group>
            {/* Bust Girth */}
            <Form.Group className="mb-3" controlId="formShoeSize">
              <Form.Label>Bust Girth:</Form.Label>
              <Form.Control type="text" placeholder="Bust Girth" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 btn btn-dark">
              Update Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAccount;
