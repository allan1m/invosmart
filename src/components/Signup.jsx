import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Login-Signup.css";

import user_icon from "../Assets/user_icon.svg";
import password_icon from "../Assets/password_icon.svg";
import email_icon from "../Assets/email_icon.svg";
import business_icon from "../Assets/business_icon.svg";
import phone_icon from "../Assets/phone-icon.svg";

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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState(""); // State for signup errors
  const [step, setStep] = useState(1); // State for form steps
  const navigate = useNavigate(); // Hook for navigation

  /**
   * Method to validate email
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Method to validate password
   */
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/;
    return passwordRegex.test(password);
  };

  /**
   * Method to handle validation of the first form
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
      newClientPassword: password
    };
    console.log(user);

    try {
      console.log("Inside try statement");
      const response = await fetch(
        "http://localhost:5073/api/Authentication/SignupClient",
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

        // Redirect or navigate to another page
        navigate("/InvoiceMain");
      } else {
        console.log("Error: " + data);
        setSignupError(
          "Unable to create a new account. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupError("Something went wrong. Please try again later.");
    }
  }

  /**
   * Method to handle going back to the first step
   */
  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="form-container p-5 rounded bg-white">
        {step === 1 && (
          <form onSubmit={handleFirstForm}>
            <h3 className="text-center">Sign up</h3>
            <div className="mb-2">
              <img
                class="icon"
                src={user_icon}
                alt="icon representing user"
              />
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
              {signupError && <p className="text-danger">{signupError}</p>}
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
