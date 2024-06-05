import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const AddPromotionalCode = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    promotionCode: "",
    amountOff: "",
    percentOff: "",
    availableFrom: "",
    availableTo: "",
    maxRedemptions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers you need
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Promotional code added successfully!");
      } else {
        // Handle error, maybe show an error message
        console.error("Failed to add promotional code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h2">Add Promotional Code</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="promotionCode"
          label="Promotion Code"
          value={formData.promotionCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="amountOff"
          label="Amount Off"
          value={formData.amountOff}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="percentOff"
          label="Percent Off"
          value={formData.percentOff}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="availableFrom"
          label="Available From"
          value={formData.availableFrom}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="availableTo"
          label="Available To"
          value={formData.availableTo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="maxRedemptions"
          label="Max Redemptions"
          value={formData.maxRedemptions}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Add Code</Button>
      </form>
    </Box>
  );
};

export default AddPromotionalCode;
