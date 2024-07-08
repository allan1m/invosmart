import React from "react";

const UserInfoHeader = ({ address, city, state, zip, phone, email, company }) => (
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
);

export default UserInfoHeader;