import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import "./styles/Login-Signup.css";

import user_icon from "../Assets/user_icon.svg";
import password_icon from "../Assets/password_icon.svg";
import email_icon from "../Assets/email_icon.svg";
import business_icon from "../Assets/business_icon.svg";
import phone_icon from "../Assets/phone-icon.svg";

/**
 * SIGN-UP
 * This component is responsible for creating a new user account.
 * It includes basic information about the user, such as email and password.
 * in addition to business information, such as company name, address, and phone number.
 */
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // state for email error
  const [passwordError, setPasswordError] = useState(""); // state for password error
  const [phoneError, setPhoneError] = useState(""); // State for phone errors
  const [signupError, setSignupError] = useState(""); // State for signup errors
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [step, setStep] = useState(1); // State for form steps
  const navigate = useNavigate(); // Hook for navigation

  /**
   * Method to validate email
   * Using test() to know whether a pattern is found in a email string. test() returns
   * a boolean (which returns the index of a match, or -1 if not found).
   */
  const validateEmail = (email) => {
    // he test() method of RegExp instances executes a search with this regular expression
    // for a match between a regular expression and a specified string. Returns true if
    // there is a match; false otherwise.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Method to validate password
   * Using test() to know whether a pattern is found in a password string. test() returns
   * a boolean (which returns the index of a match, or -1 if not found).
   */
  const validatePassword = (password) => {
    // he test() method of RegExp instances executes a search with this regular expression
    // for a match between a regular expression and a specified string. Returns true if
    // there is a match; false otherwise.
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/;
    return passwordRegex.test(password);
  };

  /**
   * Method to validate phone number
   * Using test() to know whether a pattern is found in a password string. test() returns
   * a boolean (which returns the index of a match, or -1 if not found).
   */
  const validatePhone = (phone) => {
    // he test() method of RegExp instances executes a search with this regular expression
    // for a match between a regular expression and a specified string. Returns true if
    // there is a match; false otherwise.
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  /**
   * Method to handle validation of the first form
   * This method is use to validate the first form, particularly
   * the email, password, and phone numbers fields.
   */
  const handleFirstForm = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!validatePhone(phone)) {
      setPhoneError(
        "Invalid phone number format. Expected format: (123) 456-7890"
      );
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (isValid) {
      setStep(2);
    }
  };

  /**
   * Method to handle SIGNUP request
   *
   * */
  async function handleSignUp(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    let isValid = true;

    let token = "";

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      isValid = false;
      console.log("Invalid Password: " + password);
    } else {
      setPasswordError("");
      console.log("VALID Password");
    }

    if (!isValid) return;

    const user = {
      newClientFName: firstName,
      newClientLName: lastName,
      newClientCompanyName: company,
      newClientCompanyAddress: companyAddress,
      newClientCompanyCity: companyCity,
      newClientCompanyState: companyState,
      newClientCompanyZipCode: companyZip,
      newClientPhoneNumber: phone,
      newClientEmail: email,
      newClientPassword: password,
    };
    console.log(user);

    try {
      console.log("Inside try statement");
      const response = await fetch(
        // "http://localhost:5073/api/Authentication/SignupClient"
        "https://invosmart-be.azurewebsites.net/api/auth/Authentication/SignupClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(user).toString(),
        }
      );
      console.log("before IF");

      const data = await response.json();
      console.log(data);

      if (data === "Fail") {
        console.log("User already exists.");
        setSignupError(
          "User already exists with the provided email or business name."
        );
      } else if (data.Token) {
        // Store the token and user info in state or local storage for later use
        //setToken(data.Token);
        // Successfully signed up, retrieve JWT token from response
        const token = data.Token;
        const userInfo = data;
        // Store the token securely (localStorage or sessionStorage)
        localStorage.setItem("jwtToken", token); // Store in localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store in sessionStorage
        console.log(token);
        console.log(userInfo);

        setNotificationMessage("Successfully created account");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        // Redirect or navigate to another page
        navigate("/Invoice");
      } else {
        console.log("Error: " + data);
        // Display success notification
        setNotificationMessage("Failed to create account. Please try again.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      // Display success notification
      setNotificationMessage(
        "Unable to create account. Please try again later."
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  }

  /**
   * Method to handle going back to the first step
   */
  const handleBack = () => {
    setStep(1);
  };

  /**
   * Function to handle closing the notification Snackbar
   */
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="form-container p-5 rounded bg-white">
        {step === 1 && (
          <form onSubmit={handleFirstForm}>
            <h3 className="text-center">Sign up</h3>
            <div className="mb-2">
              <img class="icon" src={user_icon} alt="icon representing user" />
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                className="form-control mb-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <img class="icon" src={user_icon} alt="icon representing user" />
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                className="form-control mb-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <img
                class="icon"
                src={phone_icon}
                alt="icon representing phone"
              />
              <input
                type="tel"
                id="phone"
                placeholder="Enter Company Phone Number"
                className="form-control mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {phoneError && <p className="text-danger">{phoneError}</p>}
              <img
                class="icon"
                src={email_icon}
                alt="icon representing email"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter Company Email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-danger">{emailError}</p>}
              <img
                class="icon"
                src={password_icon}
                alt="icon representing password"
              />
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="form-control mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
              {signupError && <p className="text-danger">{signupError}</p>}
            </div>
            <p className="text-end mt-2">
              Forgot <a href="">Password?</a>
            </p>
            <p className="text-end mt-2">
              Already have an account? <Link to="/">Login Here</Link>
            </p>
            <button className="btn btn-dark" type="submit">
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSignUp}>
            <h3 className="text-center">Complete Sign up</h3>
            <div className="mb-2">
              <img
                class="icon"
                src={business_icon}
                alt="icon representing user"
              />
              <input
                type="text"
                id="company"
                placeholder="Enter Company Name"
                className="form-control mb-2"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              <img
                class="icon"
                src={business_icon}
                alt="icon representing user"
              />
              <input
                type="text"
                id="company-address"
                placeholder="Enter Address"
                className="form-control mb-2"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
              />
              <img
                class="icon"
                src={business_icon}
                alt="icon representing business"
              />
              <input
                type="text"
                id="company-city"
                placeholder="Enter City"
                className="form-control mb-2"
                value={companyCity}
                onChange={(e) => setCompanyCity(e.target.value)}
                required
              />
              <img
                class="icon"
                src={business_icon}
                alt="icon representing email"
              />
              <input
                type="text"
                id="company-state"
                placeholder="Enter State"
                className="form-control mb-2"
                value={companyState}
                onChange={(e) => setCompanyState(e.target.value)}
                required
              />
              <img
                class="icon"
                src={business_icon}
                alt="icon representing user"
              />
              <input
                type="text"
                id="company-zip"
                placeholder="Enter Zip Code"
                className="form-control mb-2"
                value={companyZip}
                onChange={(e) => setCompanyZip(e.target.value)}
                required
              />
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
              <div className="d-grid">
                <button className="btn btn-dark" type="submit">
                  Sign Up
                </button>
              </div>
              <p className="text-end mt-2">
                Forgot <a href="">Password?</a>
              </p>
              <p className="text-end mt-2">
                Don't have an account? <Link to="./Signup">Sign up</Link>
              </p>
              <button
                className="btn btn-dark"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
