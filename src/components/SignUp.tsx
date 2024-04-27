import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [bio, setBio] = useState("");
   const [gender, setGender] = useState("");
   const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //Function that will set the email and password for the hooks
    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'bio') {
            setBio(value);  
        } else if (name === 'gender'){
            setGender(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        
        try{
            const respone = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/API.php', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'  
            },
                body: JSON.stringify( {
                    action: 'SignUp',
                    username: username,
                    email: email,
                    bio: bio,
                    gender: gender,
                    password: password
                })

            });

            const data = await respone.json();

            if(data.success){
                navigate("/~24SP_Jacksonja13/");
            }
            else {

            }
        } catch {
            
        }
    };
 return(
<> 
    <Container className="mt-3 mb-3">
		<form onSubmit={handleSubmit}> 
			<div className="row justify-content-center">
				<div className="col-4">
					<div className="form-group">
						<label>Username:</label>
						<input type="username" className="form-control" id="username" placeholder="Enter username" name="username" required value = {username} onChange={handleChange}/>
					</div>
                    <div className="form-group">
						<label>email:</label>
						<input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required value = {email} onChange={handleChange}/>
					</div>
                    <div className="form-group">
						<label>bio:</label>
						<input type="bio" className="form-control" id="bio" placeholder="What is your bio" name="bio" required value = {bio} onChange={handleChange}/>
					</div>
                    <div className="form-group">
						<label>gender:</label>
						<input type="gender" className="form-control" id="gender" placeholder="Enter gender" name="gender" required value = {gender} onChange={handleChange}/>
					</div>
					<div className="form-group">
						<label>password:</label>
						<input type="password" className="form-control" id="password" placeholder="Enter password" name="password" required value = {password} onChange={handleChange}/>
					</div>
					<button type="submit" className="btn btn-primary"  >Sign up</button>
				</div>
			</div>
		</form>
	</Container>
    </>

 );  
}
export default SignUp;