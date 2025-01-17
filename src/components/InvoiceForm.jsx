import React, { useState, useEffect } from "react";
import UserInfoHeader from "./UserInfoHeader";
import InvoiceHeader from "./InvoiceHeader";
import BillingServiceInfo from "./BillingServiceInfo";
import InvoiceItems from "./InvoiceItems";
import TotalDue from "./TotalDue";
import FormButton from "./FormButton";
import styles from "./styles/Invoice.css";

/**
 * INVOICE 
 * This component represents a form for creating an invoice, including client information, invoice details, and itemization.
 */
function InvoiceForm({onReview}) {
  // Retrieve user info from local storage or set to null if not available
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  console.log(userInfo);

  // Destructure user info or set defaults
  const firstName = userInfo ? userInfo.FirstName : "";
  const lastName = userInfo ? userInfo.LastName : "";
  const email = userInfo ? userInfo.Email : "";
  const phone = userInfo ? userInfo.CompanyPhone : "";
  const company = userInfo ? userInfo.Company : "";
  const address = userInfo ? userInfo.CompanyAddress : "";
  const city = userInfo ? userInfo.CompanyCity : "";
  const state = userInfo ? userInfo.CompanyState : "";
  const zip = userInfo ? userInfo.CompanyZipCode : "";

  // Set up current date for invoice creation
  const date = new Date();
  const today = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  // Initialize invoice details
  const invoiceDay = date.getDay(); // Day of the week (0-6)
  console.log(invoiceDay);
  const invoiceMonth = date.getMonth() + 1; // Month (1-12)
  console.log(invoiceMonth);
  const invoiceYear = date.getFullYear(); // Full year (YYYY)
  console.log(invoiceYear);
  const invoiceDate = `${invoiceMonth}${invoiceYear}`; // Concatenate month and year for invoice date
  console.log(invoiceDate);

  // State variables to manage invoice form data
  const [invoiceNumber, setInvoiceNumber] = useState(`${invoiceDate}1001`);
  const [dueDate, setDueDate] = useState(`${today}`);
  const [total, setTotal] = useState("$00.00");
  const [submittedOn, setSubmittedOn] = useState(`${today}`);
  const [entityName, setEntityName] = useState("");
  const [entityAddress, setEntityAddress] = useState("");
  const [payableTo, setPayableTo] = useState("");
  const [servicesRendered, setServicesRendered] = useState("");

  // State to manage rows of invoice items
  const [items, setItems] = useState([
    { description: "", address: "", qty: "", unitPrice: "" },
  ]);

   // Function to add a new item row to the invoice
   const addItem = () => {
    setItems([
      ...items,
      { description: "", address: "", qty: "", unitPrice: "" },
    ]);
  };

  // Function to handle deleting an item row
  const deleteItem = (index) => {
    // Calculate the amount of the item being removed
    const deletedItem = items[index];
    const deletedAmount =
      parseFloat(deletedItem.qty) * parseFloat(deletedItem.unitPrice);

    // Remove the item from the items array
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    // Update the total by subtracting the deleted amount
    const newTotal = parseFloat(total.replace("$", "")) - deletedAmount;
    setTotal(`$${newTotal.toFixed(2)}`);
  };

  // Function to handle input change for invoice items
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    updateTotal(newItems); // Update total when item changes
  };

  // Function to update total amount based on item changes
  const updateTotal = (items) => {
    let totalAmount = 0;
    items.forEach((item) => {
      const qty = parseFloat(item.qty);
      const unitPrice = parseFloat(item.unitPrice);
      if (!isNaN(qty) && !isNaN(unitPrice)) {
        totalAmount += qty * unitPrice;
      }
    });
    setTotal(`$${totalAmount.toFixed(2)}`);
  };

  // Function to save form data to local storage
  const saveFormData = () => {
    const invoiceData = getFormData();
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
  };

  // Function to retrieve form data
  const getFormData = () => ({   
    invoiceNumber,
    today,
    dueDate,
    entityName,
    entityAddress,
    payableTo,
    servicesRendered,
    submittedOn,
    total: parseFloat(total.replace("$", "")),
    items: items.map((item) => ({
      description: item.description,
      address: item.address,
      qty: parseFloat(item.qty),
      unitPrice: parseFloat(item.unitPrice),
    })),
  });

  // Function to handle review of the invoice before submission
  const handleInvoiceReview = (event) => {
    event.preventDefault();
    saveFormData(); // Save form data to local storage
    onReview(getFormData()); // Trigger review callback with form data
  };

  return (
    <form id="invoice" onSubmit={handleInvoiceReview}>
      <div className="row d-flex">
        <div className="col">{/* <p>Welcome, {firstName}</p> */}</div>
      </div>
      {/* Clients company information, e.g., address, city, state zip, etc. */}
      <UserInfoHeader
        address={address}
        city={city}
        state={state}
        zip={zip}
        phone={phone}
        email={email}
        company={company}
      />
      {/* HEADER FOR: Invoice # and current date */}
      <InvoiceHeader
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        today={today}
      />
      {/* HEADER FOR: BILL TO, PAYABLE TO, SERVICE, SUBMITTED ON */}
      <BillingServiceInfo
        entityName={entityName}
        setEntityName={setEntityName}
        entityAddress={entityAddress}
        setEntityAddress={setEntityAddress}
        payableTo={payableTo}
        setPayableTo={setPayableTo}
        servicesRendered={servicesRendered}
        setServicesRendered={setServicesRendered}
        submittedOn={submittedOn}
        setSubmittedOn={setSubmittedOn}
      />
      {/* HEADER FOR: DESCRIPTION, ADDRESS, QTY, UNIT PRICE, TOTAL */}
      <InvoiceItems
        items={items}
        handleItemChange={handleItemChange}
        deleteItem={deleteItem}
        addItem={addItem}
      />
      {/* TOTOAL DUE BY  */}
      <TotalDue total={total} dueDate={dueDate} setDueDate={setDueDate} />
      {/* REVIEW INVOICE */}
      <FormButton handleInvoiceReview={handleInvoiceReview} />
    </form>
  );
}

export default InvoiceForm;
