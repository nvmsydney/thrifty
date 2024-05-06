import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Define the error state here

  const navigate = useNavigate();

  //Function that will set the email and password for the hooks
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "bio") {
      setBio(value);
    } else if (name === "gender") {
      setGender(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const passwordencode = btoa(password);
    try {
      const respone = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SignUp",
          username: username,
          email: email,
          bio: bio,
          gender: gender,
          password: passwordencode,
        }),
      });

      const data = await respone.json();

      if (data.success) {
        navigate("/~24SP_Jacksonja13/");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
  };
  return (
    <div className="WholeBackGround">
      <div className="Container">
        <form onSubmit={handleSubmit} className="form-container">
          <h1 className="title pb-2">Thrifty</h1>
          {error && <div className="alert alert-danger w-100">{error}</div>}
          <div className="form-group">
            <label className="label">Username</label>
            <input
              type="text"
              className="form-control input mb-2"
              id="username"
              placeholder="Enter your username"
              name="username"
              required
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="text"
              className="form-control input mb-2"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Bio</label>
            <input
              type="text"
              className="form-control input mb-2"
              id="bio"
              placeholder="Enter your bio"
              name="bio"
              required
              value={bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Gender</label>
            <select
              className="form-control input mb-2 w-100"
              id="gender"
              name="gender"
              required
              value={gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="form-control input mb-2"
              id="password"
              placeholder="Enter your Password"
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="mt-2 btn btn-dark submission">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
