import React from 'react'
import { useNavigate } from "react-router-dom";

/**
 * LOGOUT component
 * This component is used to handle the logout process.
 */
function Logout() {
  console.log("Logout: 1-1");

  // useNavigate hook to programmatically navigate users
  const navigate = useNavigate();
  
  /**
   * Function to handle the logout process
   * @param {object} event - The form submission event
   */
  async function handleLogout(event) {
    console.log("Logout: 1-2"); // Check if this is logged
    event.preventDefault(); // Prevents the default form submission behavior

    // Remove the JWT token and user information from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');

    // Navigate to the home page after logout
    navigate('/');
  }
  return (
    <form onSubmit={handleLogout}>
        <div className="d-flex flex-row-reverse position-relative pb-0">
            <button className="position-relative ps-5 pe-5 mt-3 btn btn-dark" type="submit">
              Log Out
            </button>
        </div>
    </form>
  );
}

export default Logout