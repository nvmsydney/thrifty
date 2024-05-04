import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

interface Post {
  id: number;
  imageSrc: string;
}

interface ProfileData {
  username: string;
  bio: string;
  avatar: string;
  posts: Post[];
  followers: number;
  following: number;
}

interface ProfileComponentProps {
  profileData: ProfileData;
}

const Profile: React.FC<ProfileComponentProps> = ({ profileData }) => {
  // State to manage follow status
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // handle the follow/unfollow logic, updating a database or sending a request to backend
  };

  return (
    <Container>
      <Row className="py-5 profile-header">
        <Col md={3} className="d-flex justify-content-center">
          <Image src={profileData.avatar} className="avatar2 rounded-circle" />
        </Col>
        <Col md={9}>
          <h3>{profileData.username}</h3>
          <p>{profileData.bio}</p>
          <div>
            <strong>{profileData.posts.length}</strong> posts
          </div>
          <div>
            <strong>{profileData.followers}</strong> followers
          </div>
          <div>
            <strong>{profileData.following}</strong> following
          </div>
          <Button variant="dark" onClick={handleFollowClick} className="follow-button mt-3">
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Col>
      </Row>
      <Row className="post-grid">
        {profileData.posts.map((post) => (
          <Col key={post.id} xs={6} md={4} className="px-2 mb-2">
            <Image src={post.imageSrc} className="postImage w-100" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;