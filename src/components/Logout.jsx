import React from 'react'
import { useNavigate } from "react-router-dom";

function Logout() {
  console.log("Logout: 1-1");
  const navigate = useNavigate();
  
  async function handleLogout(event) {
    console.log("Logout: 1-2"); // Check if this is logged
    event.preventDefault(); // Prevents the default form submission behavior
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
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