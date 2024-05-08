import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

interface Post {
  post_id: number;
  photo: string;
  bio: string;
  be_real_post_id: string;
}


const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [profilePost, setProfilePost] = useState<Post[]>([]);

  const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
  const profilePic = sessionStorage.getItem('profilePic') || '';
  const bioCookie = document.cookie.split('; ').find(row => row.startsWith('bio='))?.split('=')[1];

  useEffect(() => {
    const getUserPost = async () => {
      const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "GetUserPost",
          username: usernameCookie,
        })
      });
      const data = await response.json();
      if (data.success) {
        setProfilePost(data.profilePost);
      }
    };

    getUserPost(); 
  }, [usernameCookie]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
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
          <Col key={post.be_real_post_id} xs={6} md={4} className="px-2 mb-2">
            <Image key={post.be_real_post_id} src={post.photo} className="postImage w-100" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;