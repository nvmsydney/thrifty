import { useEffect, useState } from 'react';

import {  useNavigate} from 'react-router-dom';
import './css/backgroundVideo.css';


//Function creates a the login Box
const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const userCookie = document.cookie.split('; ').find((row) => row.startsWith('email='))?.split('=')[1];
    const navigate = useNavigate();
//Function routes to sign in page
    const signing_up = () =>{
        navigate('/~24SP_Jacksonja13/Signup')
    }
    
    useEffect (  ()=>{
        
        if(userCookie){
        navigate("/~24SP_Jacksonja13/home");
        }
    
}, []);

//Function that will set the email and password for the hooks
    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };
//Function sends the data to PHP server in a json to log in 
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {
                //sets the cookie 
                document.cookie = 'email='+data.email;
                document.cookie = 'username='+data.username;
                document.cookie = 'bio='+data.bio; 
                setUserLoggedIn(true);
                navigate("/~24SP_Jacksonja13/home");
            } else {
                setLoginError(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError(true);
        }
    };
//Creates the html and css for the login page
    return (
        <>
        <div className='WholeBackGround' >
        
        
            <div className = 'Container'>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter a email" id="email" required value={email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" name="password"  placeholder="Enter password" id="password"  required value={password} onChange={handleChange} />
                        </div>
                        {loginError && <p className="text-danger">Incorrect password or email, check again </p>}
                        <button type="submit" className="btn btn-primary">Log in</button>
                        <button onClick = {signing_up} className="btn btn-primary" id="sign_up">Sign up</button>
                    </div>
                </div>
            </form>
            </div>
         </div>
       
        </> 
    );
    
    
}

export default LoginBox;

