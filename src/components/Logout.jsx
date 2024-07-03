import React from 'react'
import { useNavigate } from "react-router-dom";

function Logout() {
  console.log("Logout Component");
  const navigate = useNavigate();
  
  async function handleLogout(event) {
    console.log("Handle Logout"); // Check if this is logged
    event.preventDefault(); // Prevents the default form submission behavior
    localStorage.removeItem('jwtToken');
    navigate('/');
        // if (token) {
        //   console.log("3-3");
        //   const response = await fetch("http://localhost:5073/api/Authentication/ProtectedEndpoint", {
        //     method: "GET",
        //     headers: {
        //       "Authorization": `Bearer ${token}`
        //     }
        //   });
        //   const data = await response.json();
        
        //   if(data){
        //     console.log(data);
        //   }
        // }
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