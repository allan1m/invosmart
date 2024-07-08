import React from "react";

const FormButton = ({ handleInvoiceReview }) => (
  <div className="row d-flex flex-row-reverse pb-5">
    <div className="col-2 text-center">
      <button
        id="reviewInvoice"
        type="submit"
        className="btn btn-outline-dark border-"
      >
        Review Invoice
      </button>
    </div>
  </div>
);

export default FormButton;
