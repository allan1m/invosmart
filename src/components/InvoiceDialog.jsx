import React, {useState} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import InvoicePreview from "./InvoicePreview";

// This component renders a dialog for reviewing and submitting an invoice, and also handles PDF generation.
const InvoiceDialog = ({ openDialog, setOpenDialog, reviewData, userInfo }) => {
  // State variables for notification handling
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // Console log to indicate the user info received
  console.log("InvoiceDialog: " + userInfo);

  // Function to generate PDF from the dialog content
  const generatePDF = () => {
    const input = document.getElementById("DialogBox"); // Get the element to be converted to PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to base64 image data
      const pdf = new jsPDF(); // Initialize jsPDF instance
      const imgWidth = 210; // Width of the PDF document
      const pageHeight = 295; // Height of the PDF document
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height ratio

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page to the PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF with a specific name based on invoice number
      pdf.save("invoice"+reviewData.invoiceNumber+".pdf");
    });
  };

  // Function to handle invoice submission
  const handleInvoiceSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Prepare data to send for invoice creation
    const invoiceData = {
      ClientID: userInfo.ClientID, // Client ID from user info
      InvoiceNumber: reviewData.invoiceNumber,
      InvoiceDate: reviewData.today,
      DueDate: reviewData.dueDate,
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

    // Send POST request to API endpoint for invoice creation
    fetch("http://localhost:5073/api/Invoice/CreateInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData), // Convert data to JSON string
    })
      .then((response) => response.json()) // Parse response JSON
      .then((data) => {
        console.log("Success:", data);// Log success message
        // Set notification message for success
        setNotificationMessage("Invoice submitted successfully!");
        setNotificationSeverity("success");
        setNotificationOpen(true); // Open notification
      })
      .catch((error) => {
        console.error("Error:", error);// Log error message
        // Set notification message for error
        setNotificationMessage("Failed to submit invoice. Please try again.");
        setNotificationSeverity("error");
        setNotificationOpen(true); // Open notification
      });
  };

   // Function to close notification
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogContent id="DialogBox">
        {reviewData && (
          <InvoicePreview reviewData={reviewData} userInfo={userInfo} />
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notificationOpen} // Set notification open state
        autoHideDuration={6000} // Set duration to auto hide notification
        onClose={handleCloseNotification} // Handle notification close event
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationSeverity} // Set notification severity
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default InvoiceDialog;
