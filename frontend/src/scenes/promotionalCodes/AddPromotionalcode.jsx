import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { tokens } from "../../theme";

const AddPromotionalCode = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    promotionCode: "",
    amountOff: "",
    percentOff: "",
    availableFrom: null,
    availableTo: null,
    maxRedemptions: "",
    subscriptionPeriod: "",
    oncePerUser: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
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
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TextField
              name="promotionCode"
              label="Promotion Code"
              value={formData.promotionCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="amountOff"
              label="Amount Off"
              value={formData.amountOff}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="percentOff"
              label="Percent Off"
              value={formData.percentOff}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="maxRedemptions"
              label="Max Redemptions"
              value={formData.maxRedemptions}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Available From"
                value={formData.availableFrom}
                onChange={(date) => handleDateChange('availableFrom', date)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Available To"
                value={formData.availableTo}
                onChange={(date) => handleDateChange('availableTo', date)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Only For Subscription</InputLabel>
              <Select
                name="subscriptionPeriod"
                value={formData.subscriptionPeriod}
                onChange={handleChange}
                label="Only For Subscription"
              >
                <MenuItem value="1 month">1 Month</MenuItem>
                <MenuItem value="2 months">2 Months</MenuItem>
                <MenuItem value="3 months">3 Months</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Once Per User</InputLabel>
              <Select
                name="oncePerUser"
                value={formData.oncePerUser}
                onChange={handleChange}
                label="Once Per User"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{
              mt: 3,
                background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
                },
              }} >
          Add Code
        </Button>
      </form>
    </Box>
  );
};

export default AddPromotionalCode;