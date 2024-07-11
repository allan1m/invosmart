import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import AccountButton from "./AccountButton";
import InvoiceButton from "./InvoiceButton";

function InvoiceHistory() {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const [invoices, setInvoices] = useState([]);
  const company = userInfo ? userInfo.Company : "";
  console.log("InvoiceHistory: " + userInfo.ClientID);


  useEffect(() => {
    if (userInfo) {
      fetchInvoices(userInfo.ClientID);
    }
  }, [userInfo]);

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
        <h3 className="text-center">Invoice History for {company}</h3>
        <AccountButton />
        <InvoiceButton />
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
