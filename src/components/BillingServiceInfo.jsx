import React from "react";

// This component represents a form for billing service information input
const BillingServiceInfo = ({
  entityName,
  setEntityName,
  entityAddress,
  setEntityAddress,
  payableTo,
  setPayableTo,
  servicesRendered,
  setServicesRendered,
  submittedOn,
  setSubmittedOn,
}) => (
  <div>
    <div className="bill-info-header row ps-3">
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
    <div className="billing-info row mb-5">
      <div className="col">
        <input
          type="text"
          id="entityName"
          placeholder="BILL TO NAME"
          className="form-control mb-1"
          value={entityName} // Bind input value to the entityName state variable
          onChange={(e) => setEntityName(e.target.value)} // Update entityName state on change
          required
        />
        <input
          type="text"
          id="entityAddress"
          placeholder="BILL TO ADDRESS"
          className="form-control"
          value={entityAddress} // Bind input value to the entityAddress state variable
          onChange={(e) => setEntityAddress(e.target.value)} // Update entityAddress state on change
          required
        />
      </div>
      <div className="col">
        <input
          type="text"
          id="company"
          placeholder="PAYABLE TO COMPANY"
          className="form-control"
          value={payableTo} // Bind input value to the payableTo state variable
          onChange={(e) => setPayableTo(e.target.value)} // Update payableTo state on change
          required
        />
      </div>
      <div className="col">
        <input
          type="text"
          id="service"
          placeholder="SERVICE"
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
  </div>
);

export default BillingServiceInfo;