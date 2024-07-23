import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import AccountButton from "./AccountButton";
import InvoiceButton from "./InvoiceButton";
import styles from "./styles/History.css";

/**
 * INVOICE HISTORY
 * This component displays the invoice history page, fetching and rendering invoices for a specific user
 */
function InvoiceHistory() {
  // Retrieve user information from local storage or default to null
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  // State to store fetched invoices
  const [invoices, setInvoices] = useState([]);

  // Extract company name from user info or default to an empty string
  const company = userInfo ? userInfo.Company : "";

  // Log the ClientID of the user to console for debugging
  console.log("InvoiceHistory: " + (userInfo ? userInfo.ClientID : ""));

  // Fetch invoices when userInfo changes (typically on component mount)
  useEffect(() => {
    if (userInfo) {
      fetchInvoices(userInfo.ClientID);
    }
  }, [userInfo]);

  // Function to fetch invoices from the server
  const fetchInvoices = async (ClientID) => {
    try {
      const response = await fetch(
        `https://invosmart-be.azurewebsites.net/api/invoice/Invoice/GetInvoices?clientID=${userInfo.ClientID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Log the response for debugging
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        if (data !== "Fail") {
          setInvoices(data);
        } else {
          console.log("Failed to fetch invoices.");
        }
      } else {
        console.error("Failed to fetch invoices:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // If user information is not available, display a message indicating no invoices found
  if (!userInfo) {
    return (
      <Layout>
        <div className="invoice-history-page">
          <h1>No Invoices Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="invoice-history-page">
        <div className="history-header d-flex flex-row justify-content-evenly m-3">
          <h3 className="col-7 text-left">InvoSmart</h3>
          <div className="col-2 ps-5 ms-3">
            <AccountButton />
          </div>
          <div className="">
            <InvoiceButton />
          </div>
        </div>
        <h3 className="text-left mb-3">Invoice History for {company}</h3>
        <div className="flex-table">
          <div className="flex-table-header">
            <div className="flex-table-cell">Invoice Number</div>
            <div className="flex-table-cell">Invoice Date</div>
            <div className="flex-table-cell">Due Date</div>
            <div className="flex-table-cell">Billed To</div>
            <div className="flex-table-cell">Billing Address</div>
            <div className="flex-table-cell">Payable To</div>
            <div className="flex-table-cell">Services</div>
            <div className="flex-table-cell">Subtotal</div>
            <div className="flex-table-cell">Total</div>
          </div>
          <div className="flex-table-body">
            {/* Map over fetched invoices to display each invoice */}
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <div className="flex-table-row" key={invoice.InvoiceID}>
                  <div className="flex-table-cell">{invoice.InvoiceNumber}</div>
                  <div className="flex-table-cell">{invoice.InvoiceDate}</div>
                  <div className="flex-table-cell">{invoice.DueDate}</div>
                  <div className="flex-table-cell">
                    {invoice.BilledToEntityName}
                  </div>
                  <div className="flex-table-cell">
                    {invoice.BilledToEntityAddress}
                  </div>
                  <div className="flex-table-cell">{invoice.PayableTo}</div>
                  <div className="flex-table-cell">
                    {invoice.ServicesRendered}
                  </div>
                  <div className="flex-table-cell">{invoice.SubTotal}</div>
                  <div className="flex-table-cell">{invoice.Total}</div>
                </div>
              ))
            ) : (
              <p>No invoices available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default InvoiceHistory;
