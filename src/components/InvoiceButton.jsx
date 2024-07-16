import React from "react";
import { useNavigate } from "react-router-dom";

// This component represents a button to navigate back to the Invoice page.
function InvoiceButton() {
  console.log("InvoiceBtn: 1-1"); // Log to console indicating the start of component execution
  const navigate = useNavigate(); // Retrieve navigation function from React Router DOM

  // Function to handle click event on the invoice button
  const handleInvoiceClick = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("InvoiceBtn: 1-2"); // Log to console indicating the button click event
    navigate('/Invoice'); // Navigate to the '/Invoice' route
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