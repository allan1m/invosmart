import React from "react";
import { useNavigate } from "react-router-dom";

function AccountButton() {
  console.log("AccountBtn: 1-1");
  const navigate = useNavigate();

  const handleAccountClick = (event) => {
    event.preventDefault();
    console.log("AccountBtn: 1-2");
    navigate('/Account');
  }
  return (
    <form onSubmit={handleAccountClick}>
      <div className="d-flex flex-row-reverse position-relative pb-0">
        <button
          className="position-relative ps-5 pe-5 mt-3 btn btn-dark"
          type="submit"
        >
          Account
        </button>
      </div>
    </form>
  );
}

export default AccountButton;
