import React from "react";

/**
 * INVOICE PREVIEW
 * This component renders an invoice preview form based on reviewData and userInfo props.
 */
const InvoicePreview = ({ reviewData, userInfo }) => {
  // Log reviewData to console for debugging purposes
  console.log(reviewData);

  // Render the invoice preview form
  return (
    <form id="invoice" className="p-5">
      <ClientInfo userInfo={userInfo} />
      <InvoiceHeader reviewData={reviewData} />
      <InvoiceItems reviewData={reviewData} />
      <InvoiceTotal reviewData={reviewData} />
    </form>
  );
};

// Component to display client information
const ClientInfo = ({ userInfo }) => (
    <div className="UserInfo-Container row d-flex justify-content-between mb-5">
      <div className="col-5 position mb-3">
        <h5 className="text-start fw-bold">{userInfo.CompanyAddress}</h5>
        <h5 className="text-start fw-bold">
          {userInfo.CompanyCity}, {userInfo.CompanyState} {userInfo.CompanyZipCode}
        </h5>
        <h5 className="text-start fw-bold">{userInfo.CompanyPhone}</h5>
        <h5 className="text-start fw-bold">{userInfo.Email}</h5>
      </div>
      <div className="col-6">
        <h5 className="text-end fw-bold">{userInfo.Company}</h5>
      </div>
    </div>
  );

  // Component to display invoice header information
const InvoiceHeader = ({ reviewData }) => (
  <div>
    <div className="InvoiceHeader-Container divider py-1 mb-2 bg-dark">
      <div className="d-flex flex-row">
        <div className="flex-col">
          <h3 className="ps-3 text-white">Invoice No.</h3>
        </div>
        <div className="col d-flex align-items-center ps-3">
          <h3 className="text-white">{reviewData.invoiceNumber}</h3>
        </div>
        <div className="col d-flex flex-row-reverse">
          <h3 className="text-center pe-5 text-white">
            {reviewData.today}
          </h3>
        </div>
      </div>
    </div>
    <div className="row ps-3">
      <div className="col">
        <h5 className="text-left fw-bold"> BILL TO </h5>
      </div>
      <div className="col">
        <h5 className="text-left fw-bold"> PAYABLE TO </h5>
      </div>
      <div className="col">
        <h5 className="text-left fw-bold"> SERVICE </h5>
      </div>
      <div className="col">
        <h5 className="text-left fw-bold"> SUBMITTED ON </h5>
      </div>
    </div>
    <hr className="mt-0" />
    <div className="row mb-5 ms-3">
      <div className="col">
        <p>{reviewData.entityName}</p>
        <p>{reviewData.entityAddress}</p>
      </div>
      <div className="col">
        <p>{reviewData.payableTo}</p>
      </div>
      <div className="col">
        <p>{reviewData.servicesRendered}</p>
      </div>
      <div className="col">
        <p>{reviewData.submittedOn}</p>
      </div>
    </div>
  </div>
);

// Component to display invoice items
const InvoiceItems = ({ reviewData }) => (
  <div>
    <div id="itemsHeader" className="divider py-1 mb-2 bg-dark">
      <div className="d-flex flex-row">
        <div className="col-3">
          <h4 className="text-white ps-3">Description</h4>
        </div>
        <div className="col-3 ms-3 me-5">
          <h4 className="text-white">Address</h4>
        </div>
        <div className="col-2 me-4">
          <h4 className="text-white">QTY</h4>
        </div>
        <div className="col-2">
          <h4 className="text-white">Unit Price</h4>
        </div>
      </div>
    </div>
    {/* Mapping over items array to render each item's details */}
    {reviewData.items.map((item, index) => (
      <ul key={index}>
        <div id="items" className="d-flex flex-row">
          <div className="col-3">
            <p>{item.description}</p>
          </div>
          <div className="col-3 me-5">
            <p>{item.address}</p>
          </div>
          <div className="col-2 me-4">
            <p>{item.qty}</p>
          </div>
          <div className="col-2">
            <p>${item.unitPrice.toFixed(2)}</p>
          </div>
        </div>
        <hr />
      </ul>
    ))}
  </div>
);

// Component to display invoice total
const InvoiceTotal = ({ reviewData }) => (
  <div>
    <div className="divider py-1 mt-5">
      <div class="row d-flex flex-row-reverse">
        <fieldset class="col-2 text-center pe-3">
          <p>{reviewData.dueDate}</p>
        </fieldset>
        <div class="col-1 ">
          <p className="fw-bold">Due </p>
        </div>
      </div>
    </div>
    <div className="divider py-1">
      <div class="row d-flex flex-row-reverse">
        <fieldset disabled class="col-2 text-center pe-3">
          <p>${reviewData.total.toFixed(2)}</p>
        </fieldset>
        <div class="col-1 text-left fw-bold">Total</div>
      </div>
    </div>
  </div>
);

export default InvoicePreview;

