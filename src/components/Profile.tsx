import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import dog2 from "../assets/dog2.jpg";

interface Post {
  id: number;
  photo: string;
}




const Profile= () => {
  // State to manage follow status
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  const [profilePost, setProfilePost] = useState<Post[]>([]);

  const usernameCookie = document.cookie.split('; ').find((row) => row.startsWith('username='))?.split('=')[1];
  const profilePic = sessionStorage.getItem('profilePic') || ''; 
  const bioCookie = document.cookie.split('; ').find((row) => row.startsWith('bio='))?.split('=')[1];
  
  useEffect(()=>{
    const getUserPost  = async () =>{
    const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
      method:'POST',
      headers:{"Content-Type" : "applicaton/json"},
      body: JSON.stringify({
        action:"GetUserPost",
        username:usernameCookie,
      })
    });
    const data = await response.json();
    if (data.success) {
      if (data.profilePostObject) {
        const profilePostObjects = data.profilePostObject.map((post: any[]) => ({
          id: post[0],
          photo: post[1],
          caption: post[2]
        }));
        console.log(profilePostObjects);
        setProfilePost(profilePostObjects);
      }
    }
  }
  getUserPost();
  }, []);
  
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // handle the follow/unfollow logic, updating a database or sending a request to backend
  };

  return (
    <Container>
      
      <Row className="py-5 profile-header">
        <Col md={3} className="d-flex justify-content-center">
          
          <Image src={profilePic} className="avatar2 rounded-circle" />
        </Col>
        <Col md={9}>
          <h3>{usernameCookie}</h3>
          <p>{bioCookie}</p>
          <div>
            <strong>{2}</strong> posts
          </div>
          <div>
            <strong>{100}</strong> followers
          </div>
          <div>
            <strong>{30}</strong> following
          </div>
          <Button variant="dark" onClick={handleFollowClick} className="mt-3">
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Col>
      </Row>
      <Row key="ub" className="post-grid">
        {profilePost.map((post) => (
          <Col key={post.id} xs={6} md={4} className="px-2 mb-2">
            <Image key={post.id}src={post.photo} className="postImage w-100" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;