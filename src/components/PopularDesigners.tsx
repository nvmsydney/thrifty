import React, { useState, useEffect } from 'react';
import { Container, Row, Image } from "react-bootstrap";
import stare from "../assets/stare.png"

interface User {
  username: string,
  email: string,
  bio: string,
  prof_pic?: string;
  gender: string,
  followers: string | null,
  following: string | null,
  password: string,
}

const DesignerIcons = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const postData = {
        action: "GetUsers",  
      };

      try {
        const response = await fetch('http://localhost/thrifty/API.php', {
          method: 'POST',  
          headers: {
            'Content-Type': 'application/json',  
          },
          body: JSON.stringify(postData),  
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          throw new Error(data.message || "An error occurred while fetching the users");
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start">Popular Users</h3>
      </Row>
      <Row className="scrollable-row">
        {users.map((user) => (
          <Image
            key={user.username}
            src={user.prof_pic || stare}
            className="designer-icon rounded-circle"
          />
        ))}
      </Row>
    </Container>
  );
};

export default DesignerIcons;
