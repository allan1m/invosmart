import React from "react";

const TotalDue = ({ total, dueDate, setDueDate }) => (
  <div>
    <div className="divider py-1 mt-3">
      <div className="row d-flex flex-row-reverse">
        <fieldset className="col-2 text-center pe-3">
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
        <div className="col-2 text-left">
          <p className="fw-bold">Total Due by Date</p>
        </div>
      </div>
    </div>
    <div className="divider py-1 mb-5">
      <div className="row d-flex flex-row-reverse">
        <fieldset disabled className="col-2 text-center pe-3">
          <input
            type="text"
            id="subTotal"
            className="form-control border-0"
            value={total}
          />
        </fieldset>
        <div className="col-1 text-left fw-bold">Total</div>
      </div>
    </div>
  </div>
);

export default TotalDue;
