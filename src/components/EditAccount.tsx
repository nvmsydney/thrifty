import { ChangeEvent, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
const userBioCookie = document.cookie.split('; ').find((row) => row.startsWith('bio='))?.split('=')[1];
const usernameCookie = document.cookie.split('; ').find((row) => row.startsWith('username='))?.split('=')[1];
const profilePic = sessionStorage.getItem('profilePic') || ''; 
const EditAccount = () => {
  const [image, setImage] = useState("");
  const [bio, setBio] = useState<string>(userBioCookie || "");
  const [headCircumference, setHeadCircumference] = useState<string>("");
  const [shoulderWidth, setShoulderWidth] = useState<string>("");
  const [neckSize, setNeckSize] = useState<string>("");
  const [hipMeasurements, setHipMeasurements] = useState<string>("");
  const [armLength, setArmLength] = useState<string>("");
  const [legLength, setLegLength] = useState<string>("");
  const [footLength, setFootLength] = useState<string>("");
  const [bodyHeight, setBodyHeight] = useState<string>("");
  const [shoeSize, setShoeSize] = useState<string>("");
  const [bustGirth, setBustGirth] = useState<string>("");

  useEffect(()=>{
    
    setImage(profilePic);
  }, []);


  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
        setImage(reader.result! as string); 
    }
    if(file){
        reader.readAsDataURL(file);
    }
}

const handleChange = (event: { target: { name: any; value: any; }; }) => {
  const { name, value } = event.target;

  if (name === "bio") {
    setBio(value);
  }
  if (name === "headCircumference") {
    setHeadCircumference(value);
  }
  if (name === "shoulderWidth") {
    setShoulderWidth(value);
  }
  if (name === "neckSize") {
    setNeckSize(value);
  }
  if (name === "hipMeasurements") {
    setHipMeasurements(value);
  }
  if (name === "armLength") {
    setArmLength(value);
  }
  if (name === "legLength") {
    setLegLength(value);
  }
  if (name === "footLength") {
    setFootLength(value);
  }
  if (name === "bodyHeight") {
    setBodyHeight(value);
  }
  if (name === "shoeSize") {
    setShoeSize(value);
  }
  if (name === "bustGirth") {
    setBustGirth(value);
  }
};


const handleSubmit = async (event: { preventDefault: () => void; }) =>{
    try {
    event.preventDefault();
    const response = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/API.php', {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            action: 'EditAccount', 
            username: usernameCookie,
            bio: bio,
            headCircumference: headCircumference,
            shoulderWidth: shoulderWidth,
            neckSize: neckSize,
            hipMeasurements: hipMeasurements,
            armLength: armLength,
            legLength: legLength,
            footLength: footLength,
            bodyHeight: bodyHeight,
            shoeSize: shoeSize,
            bustGirth: bustGirth
            
        })
    });
    const data = await response.json();

    if(data.success){
      console.log("Sucessful")
    }else{
        
    }
    }catch{
    }
}
const handleImageSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault();
  try {
    const response = await fetch(
      "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action:"SetImage",
          username:usernameCookie,
          prof_pic:image
        }),
      }
    );
    const data = await response.json();
    if(data.success){
      console.log("deed is done");
      sessionStorage.removeItem('profilePic');
      sessionStorage.setItem('profilePic',data.prof_pic);
    }
  } catch {}
} 

  
  return (
    <Container>
      <Row className="my-4">
        <Col md={8}>
          <h2>Account</h2>
          <Form onSubmit={handleImageSubmit}>
            <div className="profile-pic-wrapper mt-4">
              <Image src={image || profilePic} roundedCircle /> 
              <input type="file" onChange={handleImageChange} /> 
            </div>
            <Button variant="primary" className="btn btn-dark" type="submit" onSubmit={handleImageSubmit} >
              Upload Profile Picture
            </Button>
            </Form>
            {/* Bio */}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBio">
              <Form.Label>Bio:</Form.Label>
              <Form.Control
                as="textarea"
                className="input"
                name="bio"
                onChange={handleChange} 
                rows={3}
                value={bio}
              />
            </Form.Group>
            {/* Head Circumference */}
            <Form.Group className="mb-3" controlId="formHeadCircumference">
              <Form.Label>Head Circumference:</Form.Label>
              <Form.Control
                type="text"
                className="input"
                name="headCircumference"
                onChange={handleChange} 
                placeholder="Head Circumference"
                value={headCircumference}
              />
            </Form.Group>
            {/* Shoulder Width */}
            <Form.Group className="mb-3" controlId="formShoulderWidth">
              <Form.Label>Shoulder Width:</Form.Label>
              <Form.Control
                type="text"
                className="input"
                name="shoulderWidth"
                onChange={handleChange} 
                placeholder="Shoulder Width"
                value={shoulderWidth}
              />
            </Form.Group>
            {/* Neck Size */}
            <Form.Group className="mb-3" controlId="formNeckSize">
              <Form.Label>Neck Size:</Form.Label>
              <Form.Control type="text" value={neckSize} className="input" name="neckSize" onChange={handleChange}  placeholder="Neck Size" />
            </Form.Group>
            {/* Hip Measurements */}
            <Form.Group className="mb-3" controlId="formHipMeasurements">
              <Form.Label>Hip Measurements:</Form.Label>
              <Form.Control type="text" value={hipMeasurements} className="input" name="hipMeasurements" onChange={handleChange} placeholder="Hip Measurements" />
            </Form.Group>
            {/* Arm Length */}
            <Form.Group className="mb-3" controlId="formArmLength">
              <Form.Label>Arm Length:</Form.Label>
              <Form.Control type="text" value={armLength} className="input" name="armLength" onChange={handleChange}  placeholder="Arm Length" />
            </Form.Group>
            {/* Leg Length */}
            <Form.Group className="mb-3" controlId="formLegLength">
              <Form.Label>Leg Length:</Form.Label>
              <Form.Control type="text" value={legLength} className="input"name="legLength" onChange={handleChange}  placeholder="Leg Length" />
            </Form.Group>
            {/* Foot Length */}
            <Form.Group className="mb-3" controlId="formFootLength">
              <Form.Label>Foot Length:</Form.Label>
              <Form.Control type="text" value={footLength} className="input" name="footLength" onChange={handleChange}  placeholder="Foot Length" />
            </Form.Group>
            {/* Body Height */}
            <Form.Group className="mb-3" controlId="formBodyHeight">
              <Form.Label>Body Height:</Form.Label>
              <Form.Control type="text" value={bodyHeight} className="input" name="bodyHeight" onChange={handleChange}   placeholder="Body Height" />
            </Form.Group>
            {/* Shoe Size */}
            <Form.Group className="mb-3" controlId="formShoeSize">
              <Form.Label>Shoe Size:</Form.Label>
              <Form.Control type="text" value={shoeSize} className="input" name="shoeSize" onChange={handleChange}   placeholder="Shoe Size" />
            </Form.Group>
            {/* Bust Girth */}
            <Form.Group className="mb-3" controlId="formShoeSize">
              <Form.Label>Bust Girth:</Form.Label>
              <Form.Control type="text" value={bustGirth} className="input" name="bustGirth" onChange={handleChange}  placeholder="Bust Girth" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 btn btn-dark"
            >
              Update Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAccount;
