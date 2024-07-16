import React from "react";

/**
 * INVOICE ITEMS
 * This component renders a list of invoice items with input fields for description, address, quantity, and unit price.
 */
const InvoiceItems = ({ items, handleItemChange, deleteItem, addItem }) => (
  <div>
  {/* Header for the items list */}
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
    {/* Mapping over items array to render each item's input fields */}
    {items.map((item, index) => (
      <div id="items" className="d-flex flex-row justify-content-between" key={index}>
      {/* Description input field */}
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
        {/* Address input field */}
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
        {/* Quantity input field */}
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
        {/* Unit Price input field */}
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
        {/* Delete button for removing the item */}
        <div className="col d-flex flex-row align-items-start ms-2">
          <button
            id="delete"
            className="fw-bold btn btn-danger border-0"
            onClick={() => deleteItem(index)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
    {/* Button to add a new item */}
    <div className="d-flex">
      <button
        id="addItem"
        className="fw-bold btn btn-primary ps-3 pe-3 border-0"
        onClick={addItem}
      >
        Add Item
      </button>
    </div>
  </div>
);

export default InvoiceItems;