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

const InvoiceDialog = ({ openDialog, setOpenDialog, reviewData, userInfo }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  console.log("InvoiceDialog: " + userInfo);
  const generatePDF = () => {
    const input = document.getElementById("DialogBox");
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

      pdf.save("invoice"+reviewData.invoiceNumber+".pdf");
    });
  };

  const handleInvoiceSubmit = (event) => {
    event.preventDefault();

    const invoiceData = {
      ClientID: userInfo.ClientID,
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
        setNotificationMessage("Invoice submitted successfully!");
        setNotificationSeverity("success");
        setNotificationOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setNotificationMessage("Failed to submit invoice. Please try again.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      });
  };

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
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationSeverity}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default InvoiceDialog;