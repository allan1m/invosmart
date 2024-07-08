import React from 'react'

const InvoiceHeader = ({ invoiceNumber, setInvoiceNumber, today }) => (
    <div className="divider py-1 mb-2 bg-dark">
      <div className="d-flex flex-row">
        <div className="flex-col">
          <h3 className="ps-3 text-white">Invoice No.</h3>
        </div>
        <div className="col d-flex align-items-center ps-3">
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
  );
  
  export default InvoiceHeader;