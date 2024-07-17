import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Invoice.css";

// This component represents a button that navigates to the Account page when clicked
function AccountButton() {
  console.log("AccountBtn: 1-1");

  // Retrieve the navigate function from the React Router DOM
  const navigate = useNavigate();

  // Function to handle clicks on the Account button
  const handleAccountClick = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("AccountBtn: 1-2");
    navigate('/Account'); // Navigate to the '/Account' route
  }
  return (
    <form className="account-form-button"onSubmit={handleAccountClick}>
      <div className="account-container d-flex flex-row-reverse position-relative pb-0">
        <button
          className="account-button position-relative ps-5 pe-5 mt-3 btn btn-dark"
          type="submit"
        >
          Account
        </button>
      </div>
    </form>
  );
}

export default AccountButton;
