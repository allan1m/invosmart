import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import InvoiceForm from "./InvoiceForm";
import InvoiceDialog from "./InvoiceDialog";
import styles from "./styles/Invoice.css";

function Invoice() {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  // const firstName = userInfo ? userInfo.FirstName : "";
  // const lastName = userInfo ? userInfo.LastName : "";
  // const email = userInfo ? userInfo.Email : "";
  // const phone = userInfo ? userInfo.CompanyPhone : "";
  // const company = userInfo ? userInfo.Company : "";
  // const address = userInfo ? userInfo.CompanyAddress : "";
  // const city = userInfo ? userInfo.CompanyCity : "";
  // const state = userInfo ? userInfo.CompanyState : "";
  // const zip = userInfo ? userInfo.CompanyZipCode : "";

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

  // // Function to open create PDF 
  // const generatePDF = () => {
  //   const input = document.getElementById("DialogBox"); // ID of the div containing the invoice
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     const imgWidth = 210;
  //     const pageHeight = 295;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save("invoice.pdf");
  //   });
  // };

  // // Function to handle form submission
  // const handleInvoiceSubmit = (event) => {
  //   event.preventDefault();

  //   const invoiceData = {
  //     ClientID: userInfo.ClientID, // Assuming ClientID is part of userInfo
  //     InvoiceNumber: reviewData.invoiceNumber,
  //     InvoiceDate: reviewData.today,
  //     DueDate: reviewData.dueDate, // You can set the due date as needed
  //     BilledToEntityName: reviewData.entityName,
  //     BilledToEntityAddress: reviewData.entityAddress,
  //     PayableTo: reviewData.payableTo,
  //     ServicesRendered: reviewData.servicesRendered,
  //     SubmittedOn: reviewData.submittedOn,
  //     Total: parseFloat(reviewData.total),
  //     Items: reviewData.items.map((item) => ({
  //       Description: item.description,
  //       Address: item.address,
  //       Quantity: parseFloat(item.qty),
  //       UnitPrice: parseFloat(item.unitPrice),
  //     })),
  //   };


  //   fetch("http://localhost:5073/api/Invoice/CreateInvoice", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(invoiceData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       // Handle successS
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle error
  //     });
  // };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="container position-relative rounded bg-white ps-5 pt-2 pe-5 pb-2">
        <Logout />
        <InvoiceForm onReview={handleReview} />
        {/* Dialog for Invoice Preview */}
        <InvoiceDialog 
          openDialog={openDialog} 
          setOpenDialog={setOpenDialog} 
          reviewData={reviewData} 
          userInfo={userInfo} 
        />
      </div>
    </div>
  );
}

export default Invoice;
