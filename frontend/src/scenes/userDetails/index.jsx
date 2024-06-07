import React from 'react';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header1'; // Adjust path as per your project structure

const UserDetails = () => {
  const theme = useTheme();

  // Example user details (replace with actual data)
  const userDetails = {
    firstName: 'Thanu',
    lastName: 'T_kanth',
    status: 'Pending Approval',
    email: 'M*****@gmail.com',
    paymentStatus: 'Free',
    phoneNumber: '+33****7573',
    birthday: '1988-09-10',
    gender: 'Male',
    location: 'Paris, France',
    study: 'High School',
    job: 'Non-profit',
    growth: '5\'10" (177.80cm)',
    imageSrc: 'https://img.freepik.com/free-photo/celebration-deity-navratri_23-2151220028.jpg?size=626&ext=jpg', // Replace with actual path to image
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
          <Box display="flex" gap="5px" alignItems="center" justifyContent="center">
            <Box mb={2} textAlign="center">
              <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[600] }} onClick={handleRemoveFromList}>
                Remove
              </Button>
            </Box>
            <Box mb={2} textAlign="center">
              <Button 
                sx={{
                  background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
                  },
                }} 
                onClick={handleApproveRequest}
              >
                Approve
              </Button>
            </Box>
            <Box mb={2} textAlign="center">
              <Button variant="contained" color="error" onClick={handleRejectRequest}>Delete</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>First Name</Typography>
                <Typography variant="body1">{userDetails.firstName}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Status</Typography>
                <Typography variant="body1">{userDetails.status}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Email</Typography>
                <Typography variant="body1">{userDetails.email}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Birthday</Typography>
                <Typography variant="body1">{userDetails.birthday}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Location</Typography>
                <Typography variant="body1">{userDetails.location}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Job</Typography>
                <Typography variant="body1">{userDetails.job}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Last Name</Typography>
                <Typography variant="body1">{userDetails.lastName}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Payment Status</Typography>
                <Typography variant="body1">{userDetails.paymentStatus}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Phone Number</Typography>
                <Typography variant="body1">{userDetails.phoneNumber}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Gender</Typography>
                <Typography variant="body1">{userDetails.gender}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Study</Typography>
                <Typography variant="body1">{userDetails.study}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Growth</Typography>
                <Typography variant="body1">{userDetails.growth}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
