import React from 'react';
import { Box, Grid, Typography, Button, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header1'; // Adjust path as per your project structure
import { tokens } from '../../theme'; // Adjust path as per your project structure

const UserDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Example user details (replace with actual data)
  const user = {
    firstName: 'Ayoub',
    lastName: 'Rabidi',
    status: 'Pending Approval',
    paymentStatus: 'Free',
    email: 'A****@gmail.com',
    phoneNumber: '+213****342',
    birthday: '1997-09-22',
    gender: 'Male',
    location: 'Copenhagen, Denmark',
    study: 'Masters',
    job: 'Industrial Engineer',
    growth: '6’2” (187.96cm)',
    religion: 'Prefer not to say',
    wantKids: 'Prefer not to say',
    haveKids: 'Don’t have children',
    smokes: 'Yes',
    drinks: 'No',
    languages: 'English, French, Other',
    personalities: ['Communicative', 'Entrepreneurial', 'Husband Material'],
    answers: [
      {
        question: 'Two truths and a lie',
        answer: 'I hate dogs, I\'m a playboy, I love spaghetti',
      },
      {
        question: 'I get along best with people who',
        answer: 'Have good sarcasm',
      },
    ],
    photos: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGluJTIwc2FyZWV8ZW58MHx8MHx8fDA%3D', 
      'https://i.pinimg.com/originals/9b/a1/42/9ba142690b2d0bddbc31f3918792c878.jpg', 
      'https://i.pinimg.com/736x/a5/87/64/a58764eb4e9b9a49845ba9d804e97339.jpg',
    ],
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
          <Box display="flex" flexDirection="column" alignItems="center" mb={2} mt={2}>
            <Box mb={2}>
              {user.photos.map((photo, index) => (
                <Avatar
                  key={index}
                  alt={`Photo ${index + 1}`}
                  src={photo}
                  variant="square"
                  sx={{ width: '100%', height: '250px', borderRadius: '16px', mb: 4 }}
                />
              ))}
            </Box>
            <Typography variant="h5" align="center">{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{user.status}</Typography>
            <Box display="flex" gap="5px" alignItems="center" justifyContent="center" mt={2}>
              <Box mb={2} textAlign="center">
                <Button variant="contained" sx={{ backgroundColor: colors.grey[600] }} onClick={handleRemoveFromList}>
                  Remove
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
           
            {Object.entries(user).map(([key, value]) => {
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
             <Grid item xs={6}>
              {Object.entries(user).map(([key, value]) => {
                if (key === 'answers') {
                  return (
                    <Box key={key} mb={4}>
                      <Typography variant="h4" gutterBottom sx={{ color: colors.primary[500] }}>Question & Answers</Typography>
                      {value.map((ans, index) => (
                        <Box key={index} mb={2}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{ans.question}</Typography>
                          <Typography variant="body1">{ans.answer}</Typography>
                        </Box>
                      ))}
                    </Box>
                  );
                }
                return null;
              })}
            </Grid>
            <Grid item xs={6}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom sx={{ color: colors.primary[500] }}>Personalities</Typography>
                <List>
                  {user.personalities.map((personality, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={personality} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

// Helper functions to format key and value
const formatKey = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
};

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  } else if (typeof value === 'object') {
    return Object.values(value).join(', ');
  } else {
    return value;
  }
};

export default UserDetails;
