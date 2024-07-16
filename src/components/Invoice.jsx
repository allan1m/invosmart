import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import AccountButton from "./AccountButton";
import InvoiceHistoryButton from "./InvoiceHistoryButton";
import Logout from "./Logout";
import InvoiceForm from "./InvoiceForm";
import InvoiceDialog from "./InvoiceDialog";
import styles from "./styles/Invoice.css";

// This component represents the main Invoice page of the application.
function Invoice() {
  // State variables using useState hook
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [reviewData, setReviewData] = useState(null); // State for storing data to review

  // Retrieve user info from localStorage if available
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  // useEffect hook to load stored invoice data when openDialog changes
  useEffect(() => {
    const storedInvoiceData = localStorage.getItem("invoiceData");
    if (storedInvoiceData) {
      setReviewData(JSON.parse(storedInvoiceData));
    }
  }, [openDialog]);

  // Function to handle review button click
  const handleReview = (data) => {
    setReviewData(data); // Update reviewData state with received data
    setOpenDialog(true); // Open the dialog for reviewing the invoice
  };

  return (
    <Layout>
    <div className="table-responsive">
    <table className="table align-bottom">
    <thead>
    <tr className="align-middle d-flex flex-row">
      <th className="col-4"><h1 className="text-center mb-5 pt-5">InvoSmart</h1></th>
      <th className="col-3"><AccountButton /></th>
      <th><InvoiceHistoryButton/></th>
      <th><Logout /></th>
      </tr>
      </thead>
      </table>
      </div>
      <InvoiceForm onReview={handleReview} />
      {/* Dialog for Invoice Preview */}
      <InvoiceDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        reviewData={reviewData}
        userInfo={userInfo}
      />
    </Layout>
  );
}

export default Invoice;
