import React, { useState, useEffect } from "react";
import styles from "./styles/Invoice.css";

function InvoiceForm({onReview}) {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const firstName = userInfo ? userInfo.FirstName : "";
  const lastName = userInfo ? userInfo.LastName : "";
  const email = userInfo ? userInfo.Email : "";
  const phone = userInfo ? userInfo.CompanyPhone : "";
  const company = userInfo ? userInfo.Company : "";
  const address = userInfo ? userInfo.CompanyAddress : "";
  const city = userInfo ? userInfo.CompanyCity : "";
  const state = userInfo ? userInfo.CompanyState : "";
  const zip = userInfo ? userInfo.CompanyZipCode : "";

  const date = new Date();
  const today = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const invoiceDay = date.getDay();
  console.log(invoiceDay);
  const invoiceMonth = date.getMonth() + 1;
  console.log(invoiceMonth);
  const invoiceYear = date.getFullYear();
  console.log(invoiceYear);
  const invoiceDate = `${invoiceMonth}${invoiceYear}`;
  console.log(invoiceDate);
  // const dueDate = `${invoiceMonth}${invoiceDay}${invoiceYear}`;

  const [invoiceNumber, setInvoiceNumber] = useState(`${invoiceDate}1001`);
//   const [subTotal, setSubTotal] = useState("$00.00");
  const [dueDate, setDueDate] = useState(`${today}`);
  const [total, setTotal] = useState("$00.00");
  const [submittedOn, setSubmittedOn] = useState(`${today}`);
  const [entityName, setEntityName] = useState("");
  const [entityAddress, setEntityAddress] = useState("");
  const [payableTo, setPayableTo] = useState("");
  const [servicesRendered, setServicesRendered] = useState("");

  // State to manage rows of items
  const [items, setItems] = useState([
    { description: "", address: "", qty: "", unitPrice: "" },
  ]);

   // Function to handle adding a new item row
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

  // Function to handle input change
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    updateTotal(newItems); // Update total when item changes
  };

  // Function to update total based on item changes
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

  
  // Function to handle form submission
  const handleInvoiceSubmit = (event) => {
    event.preventDefault();

    const invoiceData = {
      ClientID: userInfo.ClientID, // Assuming ClientID is part of userInfo
      InvoiceNumber: invoiceNumber,
      InvoiceDate: today,
      DueDate: dueDate, // You can set the due date as needed
      BilledToEntityName: entityName,
      BilledToEntityAddress: entityAddress,
      PayableTo: payableTo,
      ServicesRendered: servicesRendered,
      SubmittedOn: submittedOn,
      Total: parseFloat(total.replace("$", "")),
      Items: items.map((item) => ({
        Description: item.description,
        Address: item.address,
        Quantity: parseFloat(item.qty),
        UnitPrice: parseFloat(item.unitPrice),
      })),
    };


    fetch("http://localhost:5073/api/Invoice/CreateInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle successS
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  const saveFormData = () => {
    const invoiceData = getFormData();
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
  };

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

  const handleInvoiceReview = (event) => {
    event.preventDefault();
    saveFormData();
    onReview(getFormData());
  };

  return (
    <form id="invoice" onSubmit={handleInvoiceReview}>
      <h1 className="text-center mb-5 pt-5">InvoSmart</h1>
      <div className="row d-flex">
        <div className="col">{/* <p>Welcome, {firstName}</p> */}</div>
      </div>
      {/* Clients company information, e.g., address, city, state zip, etc. */}
      <div className="row d-flex justify-content-between mb-5 pb-5">
        <div className="col-4 position text-center">
          <h5 className="text-start fw-bold ps-5">{address}</h5>
          <h5 className="text-start fw-bold ps-5">
            {city}, {state} {zip}
          </h5>
          <h5 className="text-start fw-bold ps-5">{phone}</h5>
          <h5 className="text-start fw-bold ps-5">{email}</h5>
        </div>
        <div className="col-4">
          <h5 className="text-center fw-bold ps-5">{company}</h5>
        </div>
      </div>
      {/* HEADER FOR: Invoice # and current date */}
      <div className="divider py-1 mb-2 bg-dark">
        <div className="d-flex flex-row">
          <div className="flex-col">
            <h3 className="ps-3 text-white">Invoice No.</h3>
          </div>
          <div className="col d-flex align-items-center ps-3">
            {/* INVOICE # */}
            <input
              required
              className="form-control"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
          <div className="col d-flex flex-row-reverse">
            <h2 className="text-center pe-5 text-white">{today}</h2>
          </div>
        </div>
      </div>
      {/* HEADER FOR: BILL TO, PAYABLE TO, SERVICE, SUBMITTED ON */}
      <div className="row ps-3">
        <div className="col">
          <h3 className="text-left fw-bold"> BILL TO </h3>
        </div>
        <div className="col">
          <h3 className="text-left fw-bold"> PAYABLE TO </h3>
        </div>
        <div className="col">
          <h3 className="text-left fw-bold"> SERVICE </h3>
        </div>
        <div className="col">
          <h3 className="text-left fw-bold"> SUBMITTED ON </h3>
        </div>
      </div>
      <hr className="mt-0" />
      {/* INPUTS FOR: BILL TO, PAYABLE TO, SERVICE, SUBMITTED ON */}
      <div className="row mb-5">
        <div className="col">
          <input
            type="text"
            id="entityName"
            placeholder="ENTITY NAME"
            className="form-control mb-1"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            required
          />
          <input
            type="text"
            id="entityAddress"
            placeholder="ENTITY ADDRESS"
            className="form-control"
            value={entityAddress}
            onChange={(e) => setEntityAddress(e.target.value)}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            id="company"
            placeholder="COMPANY"
            className="form-control"
            value={payableTo}
            onChange={(e) => setPayableTo(e.target.value)}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            id="service"
            placeholder="Service Rendered"
            className="form-control"
            value={servicesRendered}
            onChange={(e) => setServicesRendered(e.target.value)}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            id="submissionDate"
            placeholder="Submitted On"
            className="form-control"
            value={submittedOn}
            onChange={(e) => setSubmittedOn(e.target.value)}
            required
          />
        </div>
      </div>
      {/* HEADER FOR: DESCRIPTION, ADDRESS, QTY, UNIT PRICE, TOTAL */}
      <div id="itemsHeader" className="divider py-1 mb-2 bg-dark">
        <div className="d-flex flex-row">
          <div className="col-3 me-2">
            <p className="text-white ps-3">Description</p>
          </div>
          <div className="col-3 ms-3 me-5">
            <p className="text-white">Address</p>
          </div>
          <div className="col-2 me-4">
            <p className="text-white">QTY</p>
          </div>
          <div className="col-2">
            <p className="text-white">Unit Price</p>
          </div>
        </div>
      </div>
      {/* INPUTS FOR: DESCRIPTION, ADDRESS, QTY, UNIT PRICE, TOTAL */}
      {items.map((item, index) => (
        <div id="items" className="d-flex flex-row justify-content-between">
          <div className="col-3 me-4">
            <input
              type="text"
              id={`description-${index}`}
              placeholder="Description"
              className="form-control p-3"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              required
            />
          </div>
          <div className="col-3 me-5">
            <input
              type="text"
              id={`address-${index}`}
              placeholder="Address"
              className="form-control p-3"
              value={item.address}
              onChange={(e) =>
                handleItemChange(index, "address", e.target.value)
              }
              required
            />
          </div>
          <div className="col-2 me-4">
            <input
              type="text"
              id={`qty-${index}`}
              placeholder="QTY"
              className="form-control p-3 w-75"
              value={item.qty}
              onChange={(e) => handleItemChange(index, "qty", e.target.value)}
              required
            />
          </div>
          <div className="col-">
            <input
              type="text"
              id={`unitPrice-${index}`}
              placeholder="Unit Price"
              className="form-control p-3 w-75"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(index, "unitPrice", e.target.value)
              }
              required
            />
          </div>
          {/* DELETE BUTTON */}
          <div className="col d-flex flex-row align-items-start ms-2">
            <button id="delete" className="fw-bold btn btn-danger border-0" onClick={() => deleteItem(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      {/* ADD ITEM */}
      <div className="d-flex">
        <button id="addItem" className=" fw-bold btn btn-primary ps-3 pe-3 border-0" onClick={addItem}>
          Add Item
        </button>
      </div>
      {/* TOTOAL DUE BY  */}
      <div className="divider py-1 mt-3">
        <div class="row d-flex flex-row-reverse">
          <fieldset class="col-2 text-center pe-3">
            <input
              required
              className="form-control"
              id="dueDate"
              type="text"
              name="dueDate"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </fieldset>
          <div class="col-2 text-left">
            <p className="fw-bold">Total Due by Date </p>
          </div>
        </div>
      </div>
      {/* TOTAL */}
      <div className="divider py-1 mb-5">
        <div class="row d-flex flex-row-reverse">
          <fieldset disabled class="col-2 text-center pe-3">
            <input
              type="text"
              id="subTotal"
              className="form-control border-0"
              value={total}
            />
          </fieldset>
          <div class="col-1 text-left fw-bold">Total</div>
        </div>
      </div>
      {/* REVIEW INVOICE */}
      <div className="row d-flex flex-row-reverse pb-5">
        <div class="col-2 text-center">
          <button id="reviewInvoice" type="submit" className="btn btn-outline-dark border-">
            Review Invoice
          </button>
        </div>
      </div>
    </form>
  );
}

export default InvoiceForm;
