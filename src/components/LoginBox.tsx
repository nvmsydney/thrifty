import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Function creates a the login Box
const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("email="))
    ?.split("=")[1];

  const navigate = useNavigate();
  //Function routes to sign in page
  const signing_up = () => {
    navigate("/Signup");
  };
  useEffect(() => {
    if (userCookie || userLoggedIn) {
      navigate("/home");
    }
  }, []);

  //Function that will set the email and password for the hooks
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  //Function sends the data to PHP server in a json to log in
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const encodedPass = btoa(password);
    try {
      const response = await fetch(
        "https://www.cmsc508.com/~24SP_jacksonja13/server.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: encodedPass,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        //sets the cookie
        document.cookie = "email=" + data.email + "; path=/;"; 
        document.cookie = "username=" + data.username + "; path=/;"; 
        document.cookie = "bio=" + data.bio + "; path=/;";
        sessionStorage.setItem('profilePic', data.profilePic);
        

        setUserLoggedIn(true);
        navigate("/~24SP_jacksonja13/home");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError(true);
    }
  };
  //Creates the html and css for the login page
  return (
    <>
      <div className="WholeBackGround">
        <div className="Container">
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <h1 className="title pb-2">Thrifty</h1>
              <label className="label">Email</label>
              <input
                type="email"
                className="form-control input mb-2"
                name="email"
                placeholder="Enter an email"
                id="email"
                required
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                className="form-control input"
                name="password"
                placeholder="Enter password"
                id="password"
                required
                value={password}
                onChange={handleChange}
              />
            </div>
            {loginError && (
              <p className="text-danger">
                Incorrect password or email, check again{" "}
              </p>
            )}
            <button type="submit" className="mt-3 btn btn-dark submission">
              Log in
            </button>
            <button
              onClick={signing_up}
              className="mt-3 btn btn-dark submission"
              id="sign_up"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginBox;
