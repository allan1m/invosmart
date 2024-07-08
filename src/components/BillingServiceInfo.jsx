import React from "react";

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
  </div>
);

export default BillingServiceInfo;