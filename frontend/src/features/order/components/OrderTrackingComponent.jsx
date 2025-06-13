import React from "react";
import { Stepper, Step, StepLabel, Typography, Box } from "@mui/material";

const OrderTrackingComponent = ({ currentStatus, orderDate }) => {
  const steps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

  // Determine the active step based on the current status
  const getActiveStep = () => {
    switch (currentStatus) {
      case "Pending":
        return 0;
      case "Dispatched":
        return 1;
      case "Out_for_Delivery":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    // Add 3 minutes
    date.setMinutes(date.getMinutes() + 3);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Get ordinal suffix
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h6" fontWeight={600} mb={5}>
        Track Your Order Status
      </Typography>
      <Stepper activeStep={getActiveStep()} alternativeLabel>
        {steps.map((label, index) => (
          <Step
            key={index}
            completed={
              currentStatus === "Delivered" ? true : getActiveStep() > index
            }
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {currentStatus === "Delivered" && (
        <Typography
          variant="body1"
          color="textSecondary"
          mt={7}
          textAlign="center"
        >
          Delivered on: <strong>{formatOrderDate(orderDate)}</strong>
        </Typography>
      )}
    </Box>
  );
};

export default OrderTrackingComponent;
