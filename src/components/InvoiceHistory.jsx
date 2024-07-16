import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import AccountButton from "./AccountButton";
import InvoiceButton from "./InvoiceButton";

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
        `http://localhost:5073/api/Invoice/GetInvoices?clientID=${userInfo.ClientID}`,
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
      <div className="d-flex flex-row justify-content-evenly m-3">
        <h3 className="col-7 text-left">InvoSmart</h3>
        <div className="col-2 ps-5 ms-3">
        <AccountButton />
        </div>
        <div className="">
        <InvoiceButton />
        </div>
        </div>
        <h3 className="text-left mb-3">Invoice History for {company}</h3>
        <div className="table-responsive">
          {invoices.length > 0 ? (
            <table className="table table-striped table-sm align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Billed To</th>
                  <th>Billing Address</th>
                  <th>Payable To</th>
                  <th>Services</th>
                  <th>Subtotal</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over fetched invoices to display each invoice */}
                {invoices.map((invoice) => (
                  <tr key={invoice.InvoiceID}>
                    <td>{invoice.InvoiceNumber}</td>
                    <td>{invoice.InvoiceDate}</td>
                    <td>{invoice.DueDate}</td>
                    <td>{invoice.BilledToEntityName}</td>
                    <td>{invoice.BilledToEntityAddress}</td>
                    <td>{invoice.PayableTo}</td>
                    <td>{invoice.ServicesRendered}</td>
                    <td>{invoice.SubTotal}</td>
                    <td>{invoice.Total}</td>
                    {/* Add more columns as necessary */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No invoices available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default InvoiceHistory;
