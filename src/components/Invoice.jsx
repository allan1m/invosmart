import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import InvoiceForm from "./InvoiceForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material"; // Importing necessary components from Material-UI
import styles from "./styles/Invoice.css";

function Invoice() {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const firstName = userInfo ? userInfo.FirstName : "";
  const lastName = userInfo ? userInfo.LastName : "";
  const email = userInfo ? userInfo.Email : "";
  const phone = userInfo ? userInfo.CompanyPhone : "";
  const company = userInfo ? userInfo.Company : "";
  const address = userInfo ? userInfo.CompanyAddress : "";
  const city = userInfo ? userInfo.CompanyCity : "";
  const state = userInfo ? userInfo.CompanyState : "";
  const zip = userInfo ? userInfo.CompanyZipCode : "";

  useEffect(() => {
    const storedInvoiceData = localStorage.getItem("invoiceData");
    if (storedInvoiceData) {
      setReviewData(JSON.parse(storedInvoiceData));
    }
  }, [openDialog]);

  const handleReview = (data) => {
    setReviewData(data);
    setOpenDialog(true);
  };

  // Function to open create PDF 
  const generatePDF = () => {
    const input = document.getElementById("DialogBox"); // ID of the div containing the invoice
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
    });
  };

  // Function to handle form submission
  const handleInvoiceSubmit = (event) => {
    event.preventDefault();

    const invoiceData = {
      ClientID: userInfo.ClientID, // Assuming ClientID is part of userInfo
      InvoiceNumber: reviewData.invoiceNumber,
      InvoiceDate: reviewData.today,
      DueDate: reviewData.dueDate, // You can set the due date as needed
      BilledToEntityName: reviewData.entityName,
      BilledToEntityAddress: reviewData.entityAddress,
      PayableTo: reviewData.payableTo,
      ServicesRendered: reviewData.servicesRendered,
      SubmittedOn: reviewData.submittedOn,
      Total: parseFloat(reviewData.total),
      Items: reviewData.items.map((item) => ({
        Description: item.description,
        Address: item.address,
        Quantity: parseFloat(item.qty),
        UnitPrice: parseFloat(item.unitPrice),
      })),
    };


    fetch("http://localhost:5073/api/Invoice/CreateInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle successS
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="container position-relative rounded bg-white p-5">
        <Logout />
        <InvoiceForm onReview={handleReview} />
        {/* Dialog for Invoice Preview */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent id="DialogBox">
            {reviewData && (
              <form id="invoice" className="p-5">
                {/* Clients company information, e.g., address, city, state zip, etc. */}
                <div className="row d-flex justify-content-between mb-5">
                  <div className="col-5 position mb-3">
                    <h5 className="text-start fw-bold">{address}</h5>
                    <h5 className="text-start fw-bold">
                      {city}, {state} {zip}
                    </h5>
                    <h5 className="text-start fw-bold">{phone}</h5>
                    <h5 className="text-start fw-bold">{email}</h5>
                  </div>
                  <div className="col-6">
                    <h5 className="text-end fw-bold">{company}</h5>
                  </div>
                </div>
                {/* HEADER FOR: Invoice # and current date */}
                <div className="divider py-1 mb-2 bg-dark">
                  <div className="d-flex flex-row">
                    <div className="flex-col">
                      <h3 className="ps-3 text-white">Invoice No.</h3>
                    </div>
                    <div className="col d-flex align-items-center ps-3">
                      {/* INVOICE # */}
                      <h3 className="text-white">{reviewData.invoiceNumber}</h3>
                    </div>
                    <div className="col d-flex flex-row-reverse">
                      <h3 className="text-center pe-5 text-white">
                        {reviewData.today}
                      </h3>
                    </div>
                  </div>
                </div>
                {/* HEADER FOR: BILL TO, PAYABLE TO, SERVICE, SUBMITTED ON */}
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
                {/* INPUTS FOR: BILL TO, PAYABLE TO, SERVICE, SUBMITTED ON */}
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
                {/* HEADER FOR: DESCRIPTION, ADDRESS, QTY, UNIT PRICE, TOTAL */}
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
                {/* INPUTS FOR: DESCRIPTION, ADDRESS, QTY, UNIT PRICE, TOTAL */}
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
                {/* TOTOAL DUE BY  */}
                <div className="divider py-1 mt-5">
                  <div class="row d-flex flex-row-reverse">
                    <fieldset class="col-2 text-center pe-3">
                      <p>{reviewData.dueDate}</p>
                    </fieldset>
                    <div class="col-2 text-left">
                      <p className="fw-bold">Total Due by Date </p>
                    </div>
                  </div>
                </div>
                {/* TOTAL */}
                <div className="divider py-1">
                  <div class="row d-flex flex-row-reverse">
                    <fieldset disabled class="col-2 text-center pe-3">
                      <p>${reviewData.total.toFixed(2)}</p>
                    </fieldset>
                    <div class="col-1 text-left fw-bold">Total</div>
                  </div>
                </div>
              </form>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInvoiceSubmit} color="primary">
              Submit Invoice
            </Button>
            <Button onClick={generatePDF} color="primary">
              Generate PDF
            </Button>
            <Button
              className="me-5 pe-4"
              onClick={() => setOpenDialog(false)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
          <p className="ps-5">Powered by InvoSmart</p>
        </Dialog>
      </div>
    </div>
  );
}

export default Invoice;
