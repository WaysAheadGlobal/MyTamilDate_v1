import React from 'react';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header1'; // Adjust path as per your project structure
import { tokens } from '../../theme'; // Adjust path as per your project structure

const UserDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Example user details (replace with actual data)
  const userDetails = {
    firstName: 'John',
    lastName: 'Doe',
    status: 'Old User',
    email: 'johndoe@example.com',
    paymentStatus: 'Paid',
    phoneNumber: 'N/A',
    birthday: '1990-10-21',
    gender: 'Male',
    location: 'N/A',
    study: 'N/A',
    job: 'N/A',
    growth: 'N/A',
    religion: 'N/A',
    wantKids: 'N/A',
    haveKids: 'N/A',
    smokes: 'N/A',
    drinks: 'N/A',
    languages: 'English, Spanish',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/330px-Outdoors-man-portrait_%28cropped%29.jpg', // Replace with actual path to image
  };

  const handleRemoveFromList = () => {
    // Implement logic for removing user from list
    console.log('Removing user from list');
  };

  const handleApproveRequest = () => {
    // Implement logic for approving user request
    console.log('Approving user request');
  };

  const handleRejectRequest = () => {
    // Implement logic for rejecting user request
    console.log('Rejecting user request');
  };

  return (
    <Box m="20px">
      <Header title="User Details" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
            <Avatar alt="User Image" src={userDetails.imageSrc} sx={{ width: 250, height: 250, mb: 2 }} />
            <Typography variant="h5" align="center">{`${userDetails.firstName} ${userDetails.lastName}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{userDetails.status}</Typography>
          </Box>
          <Box>
            <Box>

            <Box display="flex" gap="5px"  alignItems="center" justifyContent="center">

            
          <Box mb={2} textAlign="center">
            <Button variant="contained" color="primary" Width="40px" onClick={handleRemoveFromList}>Remove</Button>
          </Box>
          <Box mb={2} textAlign="center">
            <Button variant="contained" color="secondary" Width="40px" onClick={handleApproveRequest}>Approve</Button>
          </Box>
          <Box mb={2} textAlign="center">
            <Button variant="contained" color="error"Width="40px" onClick={handleRejectRequest}>Delete</Button>
          </Box>
          
          </Box>
          {/* <Box textAlign="center">
            <Button variant="contained" color="error"Width="40px" onClick={handleRejectRequest}>User Delete Request</Button>
          </Box> */}
          </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>Details</Typography>
              <Typography variant="body1"><strong>Email:</strong> {userDetails.email}</Typography>
              <Typography variant="body1"><strong>Payment Status:</strong> {userDetails.paymentStatus}</Typography>
              <Typography variant="body1"><strong>Phone Number:</strong> {userDetails.phoneNumber}</Typography>
              <Typography variant="body1"><strong>Birthday:</strong> {userDetails.birthday}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {userDetails.gender}</Typography>
              <Typography variant="body1"><strong>Location:</strong> {userDetails.location}</Typography>
              <Typography variant="body1"><strong>Languages:</strong> {userDetails.languages}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>Additional Information</Typography>
              <Typography variant="body1"><strong>Study:</strong> {userDetails.study}</Typography>
              <Typography variant="body1"><strong>Job:</strong> {userDetails.job}</Typography>
              <Typography variant="body1"><strong>Growth:</strong> {userDetails.growth}</Typography>
              <Typography variant="body1"><strong>Religion:</strong> {userDetails.religion}</Typography>
              <Typography variant="body1"><strong>Want Kids:</strong> {userDetails.wantKids}</Typography>
              <Typography variant="body1"><strong>Have Kids:</strong> {userDetails.haveKids}</Typography>
              <Typography variant="body1"><strong>Smokes:</strong> {userDetails.smokes}</Typography>
              <Typography variant="body1"><strong>Drinks:</strong> {userDetails.drinks}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
