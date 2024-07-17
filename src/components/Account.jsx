import React, { useState } from "react"; // Importing React and useState hook
import Layout from "./Layout"; // Importing the Layout component
import InvoiceButton from "./InvoiceButton"; // Importing the InvoiceButton component
import { Snackbar, Alert } from "@mui/material";
import "./styles/Account.css"; // Importing the CSS file for styling

/**
 * The ACCOUNT component manages and displays the user's account information.
 * It allows the user to update their information and save the changes.
 */
function Account() {
  // Retrieving stored user info from local storage and parsing it
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  // useState hooks to manage errors
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // Initializing the state with the user info
  const [userData, setUserData] = useState(userInfo);

  // If no user info is found, display a message
  if (!userInfo) {
    return (
      <Layout>
        <div className="account-page">
          <h1>No User Info Found</h1>
        </div>
      </Layout>
    );
  }

  /**
   * Handles the input change event for each input field.
   * Updates the state with the new value for the corresponding key.
   *
   * @param {string} key - The key of the user info being updated
   * @param {string} value - The new value of the input field
   */
  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  /**
   * Handles the form submission event.
   * Compares the updated data with the original user info and prepares the changes for submission.
   * Sends the updated data to the server via a POST request.
   *
   * @param {object} event - The form submission event
   */
  const handleAccountChanges = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior to stop the page from reloading

    // Define a mapping between frontend keys and SQL column names
    const keyMapping = {
      Email: "clientEmail",
      FirstName: "clientFirstName",
      LastName: "clientLastName",
      CompanyPhone: "clientPhoneNumber",
      Company: "clientCompanyName",
      CompanyAddress: "clientCompanyAddress",
      CompanyCity: "clientCompanyCity",
      CompanyState: "clientCompanyState",
      CompanyZipCode: "clientCompanyZipCode",
    };

    const updatedData = {}; // Initializes an empty object to store the updated user data

    // Loop through user data and collect ONLY the changed values
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== userInfo[key]) {
        // Checks if the value has changed compared to the original user info
        const sqlKey = keyMapping[key] || key; // Use the mapped key or default to the original key if no mapping is found
        updatedData[sqlKey] = userData[key]; // Adds the changed value to the updatedData object
      }
    });

    updatedData["ClientID"] = userInfo.ClientID;

    console.log(updatedData);

    // Save the updated user data to local storage or send to the server
    if (Object.keys(updatedData).length > 0) {
      // Checks if there are any changes
      console.log("Submitting updated data:", updatedData); // Logs the updated data for debugging
      // Optionally, you can also send this data to the server via an API call
      fetch(
        "https://invosmart-be.azurewebsites.net/api/auth/Authentication/UpdateUserInfo",
        {
          // Makes a POST request to the server to update user info
          method: "POST", // Specify the request method, in this case it is POST
          headers: {
            "Content-Type": "application/json", // Sets the request headers to indicate JSON data
          },
          body: JSON.stringify(updatedData), // Converts the updatedData object to a JSON string for the request body
        }
      )
        .then((response) => response.json()) // Parses the JSON response from the server
        .then((data) => {
          console.log("Success:", data); // Logs the success message and data returned from the server
          // Update local storage if the API call is successful with the new user data
          localStorage.setItem("userInfo", JSON.stringify(userData));

          // Set notification message for success
          setNotificationMessage("Change made successfully!");
          setNotificationSeverity("success");
          setNotificationOpen(true); // Open notification
        })
        .catch((error) => {
          console.error("Error:", error); // Logs any errors that occur during the fetch request

          // Set notification message for success
          setNotificationMessage(
            "Failed to make changes. Please try again later."
          );
          setNotificationSeverity("success");
          setNotificationOpen(true); // Open notification
        });

      // For demonstration purposes, we update local storage directly
      // Updates the local storage with the new user data regardless of server response
      localStorage.setItem("userInfo", JSON.stringify(userData));
    }
  };

  // Filtering user info keys to exclude "Token" and "ClientID"
  const userInfoKeys = Object.keys(userInfo).filter(
    (key) => key !== "Token" && key !== "ClientID"
  );

  // Splitting the keys into two halves for display
  const half = Math.ceil(userInfoKeys.length / 2);
  const firstHalfKeys = userInfoKeys.slice(0, half);
  const secondHalfKeys = userInfoKeys.slice(half);

  /**
   * Function to handle closing the notification Snackbar
   */
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <Layout>
      <div className="account-page row mt-4">
        <div className="header d-flex flex-row">
          <h1 className="col">Account and Settings</h1>
          <InvoiceButton className="col" />
        </div>
        <form onSubmit={handleAccountChanges} className="col-md-6 mt-5 mb-5">
          {firstHalfKeys.map((key, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={key} className="form-label fw-bold">
                {key}
              </label>
              <input
                type="text"
                id={key}
                placeholder={userInfo[key]}
                className="form-control border-dark"
                value={userData[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}
        </form>
        <form onSubmit={handleAccountChanges} className="col-md-6 mt-5 mb-3">
          {secondHalfKeys.map((key, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={key} className="form-label fw-bold">
                {key}
              </label>
              <input
                type="text"
                id={key}
                placeholder={userInfo[key]}
                className="form-control border-dark"
                value={userData[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={notificationOpen} // Set notification open state
            autoHideDuration={3000} // Set duration to auto hide notification
            onClose={handleCloseNotification} // Handle notification close event
          >
            <Alert
              onClose={handleCloseNotification}
              severity={notificationSeverity} // Set notification severity
              sx={{ width: "100%" }}
            >
              {notificationMessage}
            </Alert>
          </Snackbar>
          <div className="d-flex flex-row-reverse position-relative">
            <button type="submit" className="btn btn-dark w-100 mt-4 p-3">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Account;
