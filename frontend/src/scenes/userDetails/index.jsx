import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header1';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../api';

const UserDetails = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const theme = useTheme();

  const fetchData = async () => {
    try {
      const data = await fetch(`${API_URL}/admin/users/customers/${id}`);
      const response = await data.json();
      setDetails(response[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleRemoveFromList = () => {
    console.log('Removing user from list');
  };

  const handleApproveRequest = () => {
    console.log('Approving user request');
  };

  const handleRejectRequest = () => {
    console.log('Rejecting user request');
  };

  return (
    <Box m="20px">
      <Header title="User Details" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
            <Avatar
              alt="User Image"
              src={details.imageSrc || 'https://img.freepik.com/free-photo/celebration-deity-navratri_23-2151220028.jpg?size=626&ext=jpg'}
              sx={{ width: 250, height: 250, mb: 2 }}
            />
            <Typography variant="h5" align="center">{`${details.first_name || ''} ${details.last_name || ''}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{details.status || 'N/A'}</Typography>
          </Box>
          <Box display="flex" gap="2px" alignItems="center" justifyContent="center">
            <Box mb={2} textAlign="center">
              <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[900] }} onClick={handleRemoveFromList}>
                Reject
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
            <Box mb={2} textAlign="center">
              <Button variant="contained" color="error" onClick={handleRejectRequest}>Delete Request</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>First Name</Typography>
                <Typography variant="body1">{details.first_name || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Status</Typography>
                <Typography variant="body1">{details.status || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Email</Typography>
                <Typography variant="body1">{details.email || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Birthday</Typography>
                <Typography variant="body1">{details.birthday ? new Date(details.birthday).toLocaleDateString('en-US') : 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Location</Typography>
                <Typography variant="body1">{details.country || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Job</Typography>
                <Typography variant="body1">{details.job_name || 'N/A'}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Last Name</Typography>
                <Typography variant="body1">{details.last_name || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Payment Status</Typography>
                <Typography variant="body1">{details.paymentStatus || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Phone Number</Typography>
                <Typography variant="body1">{details.phone || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Gender</Typography>
                <Typography variant="body1">{details.gender == 1 ? 'Male' : 'Female'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Study</Typography>
                <Typography variant="body1">{details.study_name || 'N/A'}</Typography>
              </Box>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Growth</Typography>
                <Typography variant="body1">{details.growth_name || 'N/A'}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
