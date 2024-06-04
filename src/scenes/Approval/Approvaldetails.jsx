import React from 'react';
import { Box, Button, Typography, Avatar, Grid, Container, Paper } from '@mui/material';

const ApprovalUserDetails = () => {
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
    answers: {
      question1: {
        question: 'Two truths and a lie',
        answer: 'I hate dogs, I\'m a playboy, I love spaghetti',
      },
      question2: {
        question: 'I get along best with people who',
        answer: 'Have good sarcasm',
      },
    },
    photos: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGluJTIwc2FyZWV8ZW58MHx8MHx8fDA%3D', 
      "https://i.pinimg.com/originals/9b/a1/42/9ba142690b2d0bddbc31f3918792c878.jpg", 
      'https://i.pinimg.com/736x/a5/87/64/a58764eb4e9b9a49845ba9d804e97339.jpg'
    ],
  };

  const handleApprove = () => {
    // Handle approve logic
  };

  const handleDelete = () => {
    // Handle delete logic
  };

  const handleUserDeleteRequest = () => {
    // Handle user delete request logic
  };

  const handleReject = () => {
    // Handle reject logic
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          User Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {user.photos.map((photo, index) => (
              <Avatar
                key={index}
                src={photo}
                alt={`User photo ${index + 1}`}
                sx={{ 
                  width: { xs: 100, sm: 150 }, 
                  height: { xs: 100, sm: 150 }, 
                  marginBottom: 2 
                }}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={8}>
            {[
              { label: 'First Name', value: user.firstName },
              { label: 'Last Name', value: user.lastName },
              { label: 'Status', value: user.status },
              { label: 'Payment Status', value: user.paymentStatus },
              { label: 'Email', value: user.email },
              { label: 'Phone Number', value: user.phoneNumber },
              { label: 'Birthday', value: user.birthday },
              { label: 'Gender', value: user.gender },
              { label: 'Location', value: user.location },
              { label: 'Study', value: user.study },
              { label: 'Job', value: user.job },
              { label: 'Growth', value: user.growth },
              { label: 'Religion', value: user.religion },
              { label: 'Want Kids', value: user.wantKids },
              { label: 'Have Kids', value: user.haveKids },
              { label: 'Smokes', value: user.smokes },
              { label: 'Drinks', value: user.drinks },
              { label: 'Languages', value: user.languages },
              { label: 'Personalities', value: user.personalities.join(', ') }
            ].map((item, index) => (
              <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
                <strong>{item.label}:</strong> {item.value}
              </Typography>
            ))}
            {[
              { question: user.answers.question1.question, answer: user.answers.question1.answer },
              { question: user.answers.question2.question, answer: user.answers.question2.answer }
            ].map((item, index) => (
              <Box key={index} sx={{ marginTop: 2 }}>
                <Typography variant="body1"><strong>Question:</strong> {item.question}</Typography>
                <Typography variant="body2"> <strong>Answer:</strong>{item.answer}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Box mt={4} mb={2} textAlign="center">
          <Button mb={2} variant="contained" color="primary" onClick={handleApprove} sx={{ marginBottom: 2, marginRight: 2 }}>
            Approve
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ marginBottom: 2, marginRight: 2 }}>
  Delete
</Button>

          <Button mb={2} variant="contained" color="error" onClick={handleUserDeleteRequest} sx={{ marginBottom: 2, marginRight: 2 }}>
            User Delete Request
          </Button>
          <Button  mb={2} variant="contained" color="secondary" sx={{ marginBottom: 2 }} onClick={handleReject}>
            Reject
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApprovalUserDetails;
