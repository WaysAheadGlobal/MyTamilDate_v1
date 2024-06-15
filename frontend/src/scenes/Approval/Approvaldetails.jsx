import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header1'; // Adjust path as per your project structure
import { tokens } from '../../theme'; // Adjust path as per your project structure
import { API_URL } from '../../api';

const photos = [
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGluJTIwc2FyZWV8ZW58MHx8MHx8fDA%3D',
  'https://i.pinimg.com/originals/9b/a1/42/9ba142690b2d0bddbc31f3918792c878.jpg',
  'https://i.pinimg.com/736x/a5/87/64/a58764eb4e9b9a49845ba9d804e97339.jpg',
];

const UserDetails = () => {
  const [details, setDetails] = useState(null);
  const [quesAns, setQuesAns] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const detailsfetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/users/approval/${id}`);
      const data = await response.json();
      setDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const quesAnsfetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/users/user/questions/${id}`);
      const data = await response.json();
      setQuesAns(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    quesAnsfetchData();
    detailsfetchData();
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

  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return 'N/A';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  };

  if (!details) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      <Header title="User Details" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2} mt={2}>
            <Box mb={2}>
              {photos.map((photo, index) => (
                <Avatar
                  key={index}
                  alt={`Photo ${index + 1}`}
                  src={photo}
                  variant="square"
                  sx={{ width: '100%', height: '250px', borderRadius: '16px', mb: 4 }}
                />
              ))}
            </Box>
            <Typography variant="h5" align="center">{`${formatValue(details.first_name)} ${formatValue(details.last_name)}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{formatValue(details.status)}</Typography>
            <Box display="flex" gap="2px" alignItems="center" justifyContent="center" mt={2}>
              <Box mb={2} textAlign="center">
                <Button variant="contained" sx={{ backgroundColor: colors.grey[100] }} onClick={handleRemoveFromList}>
                  Reject
                </Button>
              </Box>
              <Box mb={2} textAlign="center">
                <Button sx={{
                  background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
                  },
                }} onClick={handleApproveRequest}>Approve</Button>
              </Box>
              <Box mb={2} textAlign="center">
                <Button variant="contained" color="error" onClick={handleRejectRequest}>Delete</Button>
              </Box>
              <Box mb={2} textAlign="center">
                <Button variant="contained" color="error" onClick={handleRejectRequest}>Delete Request</Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {Object.entries(details).map(([key, value]) => {
              if (key !== 'answers' && key !== 'personalities' && key !== 'photos') {
                return (
                  <Grid item xs={6} key={key}>
                    <Box mb={4}>
                      <Typography variant="h4" gutterBottom sx={{ color: colors.primary[500] }}>{formatKey(key)}</Typography>
                      <Typography variant="body1">{formatValue(value)}</Typography>
                    </Box>
                  </Grid>
                );
              }
              return null;
            })}
            <Grid item xs={12}>
              {quesAns.length > 0 && (
                <Box mb={4}>
                  <Typography variant="h4" gutterBottom sx={{ color: colors.primary[500] }}>Question & Answers</Typography>
                  {quesAns.map((item, index) => (
                    <Box key={index} mb={2}>
                      <Typography fontWeight="bold" variant="h6">{item.question}</Typography>
                      <Typography variant="body1">{item.answer}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>Personalities</Typography>
                <List>
                  {details.personalities ? details.personalities.split(',').map((personality, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={personality} />
                    </ListItem>
                  )) : (
                    <ListItem>
                      <ListItemText primary="" />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
