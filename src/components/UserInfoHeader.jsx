import React from "react";

/**
 * UserInfoHeader component
 * This component displays user information such as address, city, state, zip, phone, email, and company.
 * It organizes the information into a formatted header.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.address - The user's address.
 * @param {string} props.city - The user's city.
 * @param {string} props.state - The user's state.
 * @param {string} props.zip - The user's zip code.
 * @param {string} props.phone - The user's phone number.
 * @param {string} props.email - The user's email address.
 * @param {string} props.company - The user's company name.
 */
const UserInfoHeader = ({
  address,
  city,
  state,
  zip,
  phone,
  email,
  company,
}) => (
  // Container div with Bootstrap classes for row, flexbox, and spacing
  <div className="row d-flex justify-content-between mb-5 pb-5">
    {/* Column for address, city, state, zip, phone, and email */}
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
