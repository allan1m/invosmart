import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import AccountButton from "./AccountButton";
import InvoiceHistoryButton from "./InvoiceHistoryButton";
import Logout from "./Logout";
import InvoiceForm from "./InvoiceForm";
import InvoiceDialog from "./InvoiceDialog";
import styles from "./styles/Invoice.css";

function Invoice() {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

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
