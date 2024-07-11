import React, {useState} from "react";
import Layout from "./Layout";
import InvoiceButton from "./InvoiceButton";
import "./styles/Account.css";

function Account() {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const [userData, setUserData] = useState(userInfo);

  if (!userInfo) {
    return (
      <Layout>
        <div className="account-page">
          <h1>No User Info Found</h1>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleAccountChanges = (event) => {
    event.preventDefault();
    const updatedData = {};
    
    Object.keys(userData).forEach(key => {
      if (userData[key] !== userInfo[key]) {
        updatedData[key] = userData[key];
      }
    });

    // Save the updated user data to local storage or send to the server
    if (Object.keys(updatedData).length > 0) {
      console.log('Submitting updated data:', updatedData);
      // Optionally, you can also send this data to the server via an API call
      // fetch('/api/updateUserInfo', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(updatedData)
      // }).then(response => response.json())
      // .then(data => {
      //   console.log('Success:', data);
      //   // Update local storage if the API call is successful
      //   localStorage.setItem("userInfo", JSON.stringify(userData));
      // }).catch(error => {
      //   console.error('Error:', error);
      // });

      // For demonstration purposes, we update local storage directly
      localStorage.setItem("userInfo", JSON.stringify(userData));
    }
  };


  const userInfoKeys = Object.keys(userInfo).filter(key => key !== "Token" && key !== "ClientID");
  const half = Math.ceil(userInfoKeys.length / 2);
  const firstHalfKeys = userInfoKeys.slice(0, half);
  const secondHalfKeys = userInfoKeys.slice(half);

  return (
    <Layout>
      <div className="account-page row mt-4">
      <div className="header d-flex flex-row">
        <h1 className="col">Account and Settings</h1>
        <InvoiceButton className="col"/>
        </div>
        <form onSubmit={handleAccountChanges} className="col-md-6 mt-5 mb-5">
          {firstHalfKeys.map((key, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={key} className="form-label">{key}</label>
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
              <label htmlFor={key} className="form-label">{key}</label>
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
          <div className="d-flex flex-row-reverse position-relative">
        <button type="submit" className="btn btn-dark w-100 mt-4 p-3">Save Changes</button>
        </div>          
        </form>
      </div>
    </Layout>
  );
}

export default Account;
