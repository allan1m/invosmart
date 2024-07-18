import React from "react";

/**
 * TotalDue
 * This component displays the total amount due and allows the user to set the due date.
 */
const TotalDue = ({ total, dueDate, setDueDate }) => (
  <div>
    {/* First Divider for Due Date */}
    <div className="divider py-1 mt-3">
      <div className="row d-flex flex-row-reverse">
        <fieldset className="col-2 text-center pe-3">
          {/* Input field for the due date */}
          <input
            required // Makes this input field mandatory
            className="form-control" // Adds Bootstrap form-control class for styling
            id="dueDate" // Sets the id attribute to "dueDate"
            type="text" // Specifies the input type as text
            name="dueDate" // Sets the name attribute to "dueDate"
            value={dueDate} // Sets the value of the input field to the dueDate prop
            onChange={(event) => setDueDate(event.target.value)} // Updates dueDate state on input change
          />
        </fieldset>
        <div className="col-1 text-left fw-bold">
          <p className="fw-bold">Due</p>
        </div>
      </div>
    </div>
    {/* Second Divider for Total Amount */}
    <div className="divider py-1 mb-5">
      <div className="row d-flex flex-row-reverse">
        <fieldset disabled className="col-2 text-center pe-3">
          {/* Input field for displaying the total amount */}
          <input
            type="text" // Specifies the input type as text
            id="subTotal" // Sets the id attribute to "subTotal"
            className="form-control border-0" // Adds Bootstrap form-control class and removes border
            value={total} // Sets the value of the input field to the total prop
          />
        </fieldset>
        <div className="col-1 text-left fw-bold">Total</div>
      </div>
    </div>
  </div>
);

export default TotalDue;
