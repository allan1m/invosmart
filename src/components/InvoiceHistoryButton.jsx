import React from 'react'
import { useNavigate } from "react-router-dom";

function InvoiceHistoryButton() {
  console.log("InvoiceHistoryBtn: 1-1");
  const navigate = useNavigate();

  const handleInvoiceHistoryClick = (event) => {
    event.preventDefault();
    console.log("InvoiceHistoryBtn: 1-2");
    navigate('/InvoiceHistory');
  }
  return (
    <form onSubmit={handleInvoiceHistoryClick}>
        <div className="d-flex flex-row-reverse position-relative pb-0">
            <button className="position-relative ps-5 pe-5 mt-3 btn btn-dark" type="submit">
              Invoice History
            </button>
        </div>
    </form>
  )
}

export default InvoiceHistoryButton