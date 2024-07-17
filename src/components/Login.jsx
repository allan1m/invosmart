import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import "./styles/Login-Signup.css";

import user_icon from "../Assets/user_icon.svg";
import password_icon from "../Assets/password_icon.svg";
import email_icon from "../Assets/email_icon.svg";
import business_icon from "../Assets/business_icon.svg";

/**
 * LOGIN component
 * It includes handling the user login functionality, state management for form fields, validation, and notifications.
 */
function Login() {
  // useState hooks to manage state for email, password, and their respective errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState(""); // State for signup errors
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // State to manage visibility of links based on screen size
  const [showLinks, setShowLinks] = useState(true);

  // useNavigate hook to programmatically navigate users
  const navigate = useNavigate(); // Hook for navigation

  /**
   * Function to validate email format using a regular expression
   * @param {string} email - The email to validate
   * @returns {boolean} - True if the email is valid, false otherwise
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Function to handle the login process
   * @param {object} event - The form submission event
   */
  async function handleLogin(event) {
    // Prevent the default form submission behavior
    event.preventDefault(); // Prevents the default form submission behavior

    console.log("handleLogin: 1-1");

    // Variable to track the validity of the form
    let isValid = true;

    // Validate the email field
    if (!validateEmail(email)) {
      console.log("Invalid Email");
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // If the form is not valid, exit the function
    if (!isValid) return;

    // Object to store user credentials
    const user = {
      clientEmail: email,
      clientPassword: password,
    };

    try {
      console.log("Try Statement: 1-1");
      // Send a POST request to the authentication endpoint
      const response = await fetch(
        // "https://invosmart-be.azurewebsites.net/api/auth/Authentication/LoginClient",
        "http://localhost:5073/api/auth/Authentication/LoginClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(user).toString(),
        }
      );
      console.log("1-2");

      // Parse the JSON response from the server
      const data = await response.json();
      console.log(data);

      // Check if the login attempt was unsuccessful
      if (data === "Fail") {
        console.log("UNSUCCESSFUL LOG IN ATTEMPT.");
        // Display success notification
        setNotificationMessage(
          "Incorrect email and/ or password. Please try again."
        );
        setNotificationSeverity("error");
        setNotificationOpen(true);
      } else if (data.Token) {
        console.log("Successfully logged in");
        // Successfully signed up, retrieve JWT token from response
        const token = data.Token;
        const userInfo = data;

        // Store the token securely (localStorage or sessionStorage)
        localStorage.setItem("jwtToken", token); // Store in localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store in sessionStorage
        console.log(token);
        console.log(userInfo);

        // Display success notification
        setNotificationMessage("Successfully logged in");
        setNotificationSeverity("success");
        setNotificationOpen(true);

        // Redirect or navigate to another page after a short delay
        setTimeout(() => {
          navigate("/Invoice");
        }, 1000);
      } else {
        console.log("Error: " + data);
        // Set notification message for error
        setNotificationMessage("Something went wrong. Please try again.");
        setNotificationSeverity("error");
        setNotificationOpen(true); // Open notification
      }
    } catch (error) {
      console.error("Error:", error);
      // Set notification message for error
      setNotificationMessage(
        "Unable to process request at this time. Please try again later."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true); // Open notification
    }
  }

  /**
   * Function to handle closing the notification Snackbar
   */
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  // Function to handle screen size change and update state
  const handleResize = () => {
    if (window.innerWidth < 550) {
      setShowLinks(false);
    } else {
      setShowLinks(true);
    }
  };

  // Effect to set initial state and listen for resize events
  useEffect(() => {
    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

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
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={notificationOpen}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notificationSeverity}
              sx={{ width: "100%" }}
            >
              {notificationMessage}
            </Alert>
          </Snackbar>
          {showLinks && (
            <>
              <p className="text-end mt-2">
                Forgot <a href="">Password?</a>
              </p>
              <p className="text-end mt-2">
                Don't have an account? <Link to="./Signup">Sign up</Link>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
