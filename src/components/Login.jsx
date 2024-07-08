import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Login-Signup.css";

import user_icon from "../Assets/user_icon.svg";
import password_icon from "../Assets/password_icon.svg";
import email_icon from "../Assets/email_icon.svg";
import business_icon from "../Assets/business_icon.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState(""); // State for signup errors
  const navigate = useNavigate(); // Hook for navigation

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function handleLogin(event){
    console.log("Handle Login event");
    event.preventDefault(); // Prevents the default form submission behavior

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isValid) return;

    const user = {
      clientEmail: email,
      clientPassword: password,
    };

    try {
      console.log("1-1");
      const response = await fetch(
        "http://localhost:5073/api/Authentication/LoginClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(user).toString(),
        }
      );
      console.log("1-2");

      const data = await response.json();
      console.log(data);

      if (data === "Fail") {
        console.log("UNSUCCESSFUL LOG ATTEMPT.");
        setSignupError("Incorrect email and/ or password.")
      } 
      else if (data.Token) {
        console.log("Successfully logged in");
        // Successfully signed up, retrieve JWT token from response
        const token = data.Token;
        const userInfo = data;

        // Store the token securely (localStorage or sessionStorage)
        localStorage.setItem('jwtToken', token); // Store in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Store in sessionStorage
        console.log(token);
        console.log(userInfo);

        // Redirect or navigate to another page
        navigate("/Invoice");
      } else {
        console.log("Error: " + data);
        setSignupError("Unable to login. Please try again later.");
      }
      
    } catch (error) {
      console.error("Error:", error);
      setSignupError("Something went wrong. Please try again later.");
    }
  }

  

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={handleLogin}>
          <h3 className="text-center">Login</h3>
          <div className="mb-2">
            <img class="icon" src={email_icon} alt="icon representing email" />
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="mb-2">
            <img
              class="icon"
              src={password_icon}
              alt="icon representing password"
            />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
            {signupError && <p className="text-danger">{signupError}</p>}
          </div>
          <div className="d-grid">
          <button className="btn btn-dark" type="submit">
              Login
            </button>
          </div>
          <p className="text-end mt-2">
            Forgot <a href="">Password?</a>
          </p>
          <p className="text-end mt-2">
            Don't have an account? <Link to="./Signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
