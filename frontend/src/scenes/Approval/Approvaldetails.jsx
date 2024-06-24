import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Avatar, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
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
  const theme = useTheme();
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const navigate = useNavigate();
  console.log(details);
  const [quesAns, setQuesAns] = useState([]);
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
console.log(id);
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

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`${API_URL}/admin/users/updatestatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, approval: newStatus }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Get error details for debugging
        throw new Error(`Failed to update status: ${errorDetails}`);
      }
  
      // Fetch updated details after updating the status
      await detailsfetchData();
      navigate("/approval")
      console.log("Status updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/users/deleteuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); 
        throw new Error(`Failed to delete user: ${errorDetails}`);
      }

      
      await detailsfetchData();
      navigate("/approval")
      console.log('User deleted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveRequest = () => {
    updateStatus(20);
  };

  const handleReject = () => {
    updateStatus(30);
  };

  const handleRejectRequest = () => {
    updateStatus(15);
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
            <Typography variant="h5" align="center">{`${formatValue(details.Name)} ${formatValue(details.Surname)}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{formatValue(details.status === 15 ? "Reject" : "pending")}</Typography>
            
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
      {Object.entries(details).map(([key, value]) => {
        if (key !== 'answers' && key !== 'personalities' && key !== 'photos') {
          return (
            <Grid item xs={12}  lg={6} key={key}>
              <Box mb={2}>
                <Typography variant="h6" color={colors.primary[700]}>{formatKey(key)}</Typography>
                <Box
                  sx={{
                    p: 2,
                    border: `1px solid ${colors.grey[300]}`,
                    borderRadius: '8px',
                    backgroundColor: colors.primary[50],
                  }}
                >
                  <Typography variant="body1">{formatValue(value)}</Typography>
                </Box>
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
    </Grid>
          <Box display="flex" gap="8px" flexDirection={isLgUp ? 'row' : 'column'} alignItems="center" justifyContent="center">
      <Box>
        <Grid
          container
          direction={isLgUp ? 'row' : 'column'}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} lg={6} textAlign="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.palette.grey[900] }}
              onClick={handleReject}
            >
              Reject
            </Button>
          </Grid>
          <Grid item xs={12} lg={6} textAlign="center">
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
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid
          container
          direction={isLgUp ? 'row' : 'column'}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} lg={6} textAlign="center">
            <Button variant="contained" color="error" onClick={handleDeleteRequest}>
              Delete
            </Button>
          </Grid>
          <Grid item xs={12} lg={6} textAlign="center">
            <Button  sx={{width: "140px"}} variant="contained" color="error" onClick={handleRejectRequest}>
              Delete Request
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
        </Grid>
       
      </Grid>
    </Box>
  );
};

export default UserDetails;
