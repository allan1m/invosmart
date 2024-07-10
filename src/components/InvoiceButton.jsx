import React from "react";
import { useNavigate } from "react-router-dom";

function InvoiceButton() {
  console.log("InvoiceBtn: 1-1");
  const navigate = useNavigate();

  const handleInvoiceClick = (event) => {
    event.preventDefault();
    console.log("InvoiceBtn: 1-2");
    navigate('/Invoice');
  }
  return (
    <form onSubmit={handleInvoiceClick}>
      <div className="d-flex flex-row-reverse position-relative pb-0">
        <button
          className="position-relative ps-5 pe-5 mt-3 btn btn-dark"
          type="submit"
        >
          Back to Invoice
        </button>
      </div>
    </form>
  );
}

export default InvoiceButton;