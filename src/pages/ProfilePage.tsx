import NavBar from "../components/NavBar";
import Profile from "../components/Profile";
import dog from "../assets/dummypic1.jpg";
import dog2 from "../assets/dog2.jpg";
import dog3 from "../assets/dummypic3.jpg";
import profpic from "../assets/profpic1.jpg";

// dummy data
const profileData = {
    username: "retriever432",
    bio: "dog lover who likes to sell clothes",
    avatar: profpic, 
    posts: [
      { id: 1, imageSrc: dog },  
      { id: 2, imageSrc: dog2 },  
      { id: 3, imageSrc: dog3 },  
      { id: 4, imageSrc: dog3 },  
      { id: 5, imageSrc: dog },  
      { id: 6, imageSrc: dog2 },  
      { id: 7, imageSrc: dog3 }, 
    ],
    followers: 124000,
    following: 960,
  };

function AccountPage() {
    
  return (
    
    <div className="d-flex flex-column h-100">
     <NavBar /> 
      <Profile profileData={profileData} />
    </div>
    
    
  );
}

export default AccountPage;