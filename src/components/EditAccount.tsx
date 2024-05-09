import { ChangeEvent, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const userBioCookie = document.cookie.split('; ').find(row => row.startsWith('bio='))?.split('=')[1];
const decodedBio = userBioCookie ? decodeURIComponent(userBioCookie) : '';
const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
const storedProfilePic = sessionStorage.getItem('profilePic') || ''; 

const EditAccount = () => {
  const [image, setImage] = useState(sessionStorage.getItem('profilePic') || '');
  const [bio, setBio] = useState<string>(userBioCookie || "");
  const [headCircumference, setHeadCircumference] = useState<string>("");
  const [shoulderWidth, setShoulderWidth] = useState<string>("");
  const [neckSize, setNeckSize] = useState<string>("");
  const [hipMeasurments, setHipMeasurments] = useState<string>("");
  const [armLength, setArmLength] = useState<string>("");
  const [legLength, setLegLength] = useState<string>("");
  const [footLength, setFootLength] = useState<string>("");
  const [bodyHeight, setBodyHeight] = useState<string>("");
  const [shoeSize, setShoeSize] = useState<string>("");
  const [bustGirth, setBustGirth] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleHeadChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setHeadCircumference(event.target.value);
  };

  const handleShoulderChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setShoulderWidth(event.target.value);
  };
  const handleNeckChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNeckSize(event.target.value);
  };
  const handleHipChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setHipMeasurments(event.target.value);
  };
  const handleArmChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArmLength(event.target.value);
  };
  const handleLegChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLegLength(event.target.value);
  };
  const handleFootChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFootLength(event.target.value);
  };
  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyHeight(event.target.value);
  };
  const handleShoeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setShoeSize(event.target.value);
  };
  const handleBustChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBustGirth(event.target.value);
  };

      
  const handlePicAndBioSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const base64Image = image;

    const payload = JSON.stringify({
      action: 'UpdatePicAndBio',
      username: usernameCookie,
      bio,
      prof_pic: base64Image,
    });

    try {
      const response = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/API.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload
      });
      const data = await response.json();

      if (data.success) {
        console.log("Successful update");
        setImage(image);
        setBio(bio);
        sessionStorage.setItem('profilePic', image);
        document.cookie = `bio=${encodeURIComponent(bio)}; path=/;`;
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Failed to connect to the API:", error);
    }
  };

  const handleMeasurementsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = JSON.stringify({
      action: 'UpdateMeasurements',
      username_measurment: usernameCookie,
      head_circumference: headCircumference,
      shoulder_width: shoulderWidth,
      neck_size: neckSize,
      hip_measurments: hipMeasurments,
      arm_length: armLength,
      leg_length: legLength,
      foot_length: footLength,
      body_height: bodyHeight,
      shoe_size: shoeSize,
      bust_girth: bustGirth,
    });

    try {
      const response = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/API.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload
      });
      const data = await response.json();

      if (data.success) {
        console.log("Successful update");
        setHeadCircumference(headCircumference);
        setShoulderWidth(shoulderWidth);
        setNeckSize(neckSize);
        setHipMeasurments(hipMeasurments);
        setArmLength(armLength);
        setLegLength(legLength);
        setFootLength(footLength);
        setBodyHeight(bodyHeight);
        setShoeSize(shoeSize);
        setBustGirth(bustGirth);
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Failed to connect to the API:", error);
    }
  };


  return (
    <Container>
      <Row className="my-4">
        <Col md={8}>
          <h2>Account</h2>
          <Form onSubmit={handlePicAndBioSubmit}>
            <div className="profile-pic-wrapper mt-4">
              <Image src={image} roundedCircle />
              <input type="file" onChange={handleImageChange.bind(this)} />
            </div>
            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label>Bio:</Form.Label>
              <Form.Control
                as="textarea"
                className="input"
                name="bio"
                rows={3}
                value={bio}
                onChange={handleBioChange}
              />          
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 mb-5 btn btn-dark">
              Update Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAccount;