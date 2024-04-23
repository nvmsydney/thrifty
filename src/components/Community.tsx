import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import husky from '../assets/husky.webp';
import cat from '../assets/cat.jpg';
import husky2 from '../assets/husky2.jpg';
import cat2 from '../assets/cat.jpg';

// Mock data
const communityPosts = [
  {
    id: 1,
    username: 'nvmSydney',
    avatar: husky2,
    caption: 'HEY GUYS!!! Here’s my outfit today :)',
    imageSrc: husky, // Replace with actual path to image
  },
  {
    id: 2,
    username: 'jermaneJ',
    avatar: cat2,
    caption: 'Just chilling in my new hoodie...',
    imageSrc: cat, // Replace with actual path to image
  },
  // Add more posts as needed...
];

const Community = () => {
  return (
    <Container className="communityFeed">
      {communityPosts.map((post) => (
        <Card key={post.id} className="postCard">
          <Card.Header className="postHeader">
            <img src={post.avatar} alt="Avatar" className="avatar rounded-circle" />
            <div className="postUsername">{post.username}</div>
          </Card.Header>
          <Card.Img variant="top" src={post.imageSrc} className="postImage" />
          <Card.Body className="postCaption">
          <Card.Text><b>{post.username}</b> {post.caption}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Button className="addPostButton">+</Button>
    </Container>
  );
};

export default Community;
