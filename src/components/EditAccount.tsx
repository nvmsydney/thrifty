import { ChangeEvent, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const userBioCookie = document.cookie.split('; ').find(row => row.startsWith('bio='))?.split('=')[1];
const decodedBio = userBioCookie ? decodeURIComponent(userBioCookie) : "";
const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
const storedProfilePic = sessionStorage.getItem('profilePic') || ''; 

const EditAccount = () => {
  const [image, setImage] = useState(sessionStorage.getItem('profilePic') || '');
  const [bio, setBio] = useState<string>(decodedBio);

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

      
  const handlePicAndBioSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const base64Image = image.startsWith("data:image")
      ? image.split(",")[1]
      : null;

    const payload = JSON.stringify({
      action: "UpdatePicAndBio",
      username: usernameCookie,
      bio,
      prof_pic: base64Image,
    });

    try {
      const response = await fetch(
        "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        }
      );
      const data = await response.json();

      if (data.success) {
        console.log("Successful update");
        setImage(image);
        setBio(bio);
        sessionStorage.setItem("profilePic", image);
        document.cookie = `bio=${encodeURIComponent(bio)}; path=/;`;
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
              <input type="file" onChange={handleImageChange} />
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
