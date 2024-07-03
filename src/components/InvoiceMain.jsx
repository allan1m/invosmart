import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import styles from "./styles/InvoiceMain.css";

function Invoice() {
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

  // useEffect(() => {
  //   console.log("User Info:", userInfo);
  //   console.log("First Name:", firstName);
  //   console.log("Last Name:", lastName);
  //   console.log("Email:", email);
  //   console.log("Phone:", phone);
  //   console.log("Company:", company);
  //   console.log("Address:", address);
  //   console.log("City:", city);
  //   console.log("State:", state);
  //   console.log("Zip:", zip);
  // }, [userInfo, firstName, lastName, email, phone, company, address, city, state, zip]);

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
  const [subTotal, setSubTotal] = useState("$00.00");
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
    setItems([...items, { description: "", address: "", qty: "", unitPrice: "" }]);
  };

  // Function to handle deleting an item row
  const deleteItem = (index) => {
    // Calculate the amount of the item being removed
    const deletedItem = items[index];
    const deletedAmount = parseFloat(deletedItem.qty) * parseFloat(deletedItem.unitPrice);

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
        // Handle success
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="container position-relative rounded bg-white">
        <Logout />
        <form onSubmit={handleInvoiceSubmit}>
          <h1 className="text-center mb-5">InvoSmart</h1>
          <div className="row d-flex">
            <div className="col">{/* <p>Welcome, {firstName}</p> */}</div>
          </div>
          {/* Clients company information, e.g., address, city, state zip, etc. */}
          <div className="row d-flex justify-content-between mb-5 pb-5">
            <div className="col-4 position text-center">
              <p className="text-start ps-5">{address}</p>
              <p className="text-start ps-5">
                {city}, {state} {zip}
              </p>
              <p className="text-start ps-5">{phone}</p>
              <p className="text-start ps-5">{email}</p>
            </div>
            <div className="col-4">
              <p className="text-center ps-5">{company}</p>
            </div>
          </div>
          {/* HEADER FOR: Invoice # and current date */}
          <div className="divider py-1 mb-2 bg-dark">
            <div className="d-flex flex-row">
              <div className="flex-col">
                <h2 className="ps-5 text-white">Invoice No.</h2>
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
          <div className="row">
            <div className="col">
              <h3 className="text-center"> BILL TO </h3>
            </div>
            <div className="col">
              <h3 className="text-center"> PAYABLE TO </h3>
            </div>
            <div className="col">
              <h3 className="text-center"> SERVICE </h3>
            </div>
            <div className="col">
              <h3 className="text-center"> SUBMITTED ON </h3>
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
          <div className="divider py-1 mb-2 bg-dark">
            <div className="d-flex flex-row justify-content-between">
              <div className="col-2 me-5">
                <p className="text-white ps-3">Description</p>
              </div>
              <div className="col-2 me-5">
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
            <div className="d-flex flex-row justify-content-between">
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
              <div className="col-3 me-4">
                <input
                  type="text"
                  id={`qty-${index}`}
                  placeholder="QTY"
                  className="form-control p-3 w-50"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-1">
                <input
                  type="text"
                  id={`unitPrice-${index}`}
                  placeholder="Unit Price"
                  className="form-control p-3"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", e.target.value)
                  }
                  required
                />
              </div>
              {/* DELETE BUTTON */}
              <div className="col d-flex flex-row align-items-start ms-2">
                <button
                  className="btn btn-dark"
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {/* ADD ITEM */}
          <div className="d-flex">
            <button className="btn btn-dark ps-3 pe-3 mt-2" onClick={addItem}>
              Add Item
            </button>
          </div>
          {/* SUBTOTAL */}
          <div className="divider py-1 mb-2">
            <div class="row d-flex flex-row-reverse">
              <fieldset disabled class="col-1 text-center ps-2">
                <input
                  type="text"
                  id="subTotal"
                  className="form-control border-0"
                  value={total}
                />
              </fieldset>
              <div class="col-2 text-center ps-2">Total</div>
            </div>
          </div>
          {/* TOTOAL DUE BY  */}
          <div className="divider py-1 mb-5">
            <div class="row d-flex flex-row-reverse">
              <fieldset class="col-1 text-center ps-2">
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
              <div class="col-3 text-center">
                <p>Total Due by Date </p>
              </div>
            </div>
          </div>
          {/* LOGOUT */}
          <div className="row d-flex flex-row-reverse pb-5">
            {/* REVIEW INVOICE */}
            <div class="col-2 text-center">
              <button className="btn btn-dark" type="submit">
                Review Invoice
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Invoice;
