import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import InvoiceForm from "./InvoiceForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"; // Importing necessary components from Material-UI
import styles from "./styles/Invoice.css";

function Invoice() {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewData, setReviewData] = useState(null);

  const handleReview = (data) => {
    setReviewData(data);
    setOpenDialog(true);
  };

  const handleInvoiceReview = (event) => {
    event.preventDefault();
    setOpenDialog(true); // Open the dialog on form submission
  };

  const generatePDF = () => {
    const input = document.getElementById("invoice-pdf"); // ID of the div containing the invoice
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

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg-dark">
      <div className="container position-relative rounded bg-white">
        <Logout />
        <InvoiceForm onReview={handleInvoiceReview} />
        {/* Dialog for Invoice Preview */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
              <div className="container position-relative rounded bg-white">
                <InvoiceForm onReview={() => {}} />
              </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Invoice;
