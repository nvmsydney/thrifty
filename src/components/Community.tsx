import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";

interface Post {
  prof_pic: string | undefined;
  id: number;
  username: string;
  caption: string;
  imageSrc: string;
}

const Community = () => {
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [relaodPage, setReloadPage] = useState(false);
  const [image, setImage] = useState("");
  const [bodyText, setBodyText] = useState("");
  const userCookie = document.cookie.split('; ').find((row) => row.startsWith('username='))?.split('=')[1];


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "GetPostInfo" }),
        }
      );
      const data = await response.json();
      if (data.success) {
        const posts = data.post.map((postArray: any[][]) => ({
          id: postArray[0][0],
          username: postArray[0][1],
          prof_pic: postArray[0][2],
          imageSrc: postArray[0][3],
        }));
        setCommunityPosts(posts);
      }
    };
    fetchPosts();
  }, [relaodPage]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    if (name === "bodyText") {
      setBodyText(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // send data here?
    try {
      event.preventDefault();
      const response = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/API.php', {
          method:"POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              action: 'AddPost',
              username: userCookie,
              photo_link: image,
              body_text: bodyText
          })
      });
      const data = await response.json();

      if(data.success){
        setShowModal(false);
        setReloadPage(true);
      }else{
          
      }
      }catch{
      }
   
  };

  return (
    <Container className="communityFeed">
      {communityPosts.map((post) => (
        <Card key={post.id} className="postCard">
          <Card.Header className="postHeader">
            <img
              src={post.prof_pic}
              alt="Avatar"
              className="avatar rounded-circle"
            />
            <div className="postUsername">{post.username}</div>
          </Card.Header>
          <Card.Img variant="top" src={post.imageSrc} className="postImage" />
          <Card.Body className="postCaption">
            <Card.Text>
          
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Button className="addPostButton" onClick={() => setShowModal(true)}>
        +
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload your image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Caption</Form.Label>
              <textarea
                rows={3}
                name="bodyText"
                value={bodyText}
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Community;
