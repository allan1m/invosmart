import React from 'react'
import { useNavigate } from "react-router-dom";

/**
 * INVOICE HISTORY BUTTON
 * This component renders a button that navigates to the Invoice History page when clicked.
 */
function InvoiceHistoryButton() {
  // Log message for debugging
  console.log("InvoiceHistoryBtn: 1-1");
  
  // Access the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle click event on the button
  const handleInvoiceHistoryClick = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("InvoiceHistoryBtn: 1-2"); // Log message for debugging
    navigate('/InvoiceHistory'); // Navigate to '/InvoiceHistory' route
  }
  return (
    <form onSubmit={handleInvoiceHistoryClick}>
        <div className="d-flex flex-row-reverse position-relative pb-0">
            <button className="position-relative ps-5 pe-5 mt-3 btn btn-dark" type="submit">
              History
            </button>
        </div>
    </form>
  )
}

export default InvoiceHistoryButton