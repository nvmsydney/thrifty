
import { Container, Card, Button } from 'react-bootstrap';
import cat from '../assets/cat.jpg';
import husky2 from '../assets/husky2.jpg';
import cat2 from '../assets/cat.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import husky from '../assets/husky.webp';
import { post } from 'jquery';
//trying a function to get all of the data used for the post( need to do this off the following)

interface Post {
  id: number;
  username: string;
  caption: string;
  imageSrc: string;
}
const Community =()=> {

  const [communityPosts, setCommunityPosts] = useState<Post[]>([]); 
  
  useEffect(() => {
    
    const getPost = async () => {
      try {
        const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
          action: 'GetPostInfo'
        })
      });
      const data = await response.json();
      if (data.success ) {
        const posts = data.post.map((postArray: any[][]) => ({
          id: postArray[0][0],
          username: postArray[0][1],
          caption: postArray[0][2],
          imageSrc: postArray[0][3]
        }));
        setCommunityPosts(posts);
      } else {
        // Handle unsuccessful response
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call loading function when component mounts
  getPost();
}, []); 

// Mock data
const communityPostss = [
  {
    id: 1,
    username: 'nvmSydney',
    avatar: husky2,
    caption: 'HEY GUYS!!! Here’s my outfit today :)',
    imageSrc: "", // Replace with actual path to image
    
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

  const navigate = useNavigate();
  const navigateTo=()=> {
    navigate("/~24SP_Jacksonja13/addpost");
  }
  
  return (
    <Container className="communityFeed">
      {communityPosts.map((post) => (
        <Card key={post.id} className="postCard">
          <Card.Header className="postHeader">
            <img src={husky} alt="Avatar" className="avatar rounded-circle" />
            <div className="postUsername">{post.username}</div>
          </Card.Header>
          <Card.Img variant="top" src={post.imageSrc} className="postImage" />
          <Card.Body className="postCaption">
          <Card.Text><b>{post.username}</b> {post.caption}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Button className="addPostButton" onClick={navigateTo}>+</Button>
    </Container>
  );
}


export default Community;


