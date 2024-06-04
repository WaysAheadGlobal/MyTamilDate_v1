import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppContext } from '../../Context/UseContext';
import { useNavigate } from 'react-router-dom';

const themeSettings = {
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 40,
    },
    h2: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 16,
    },
    h6: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 14,
    },
  },
};

const theme = createTheme(themeSettings);

const ShowphoneAndEmail = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [otpSentSnackbar, setOtpSentSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const {isAdmin,
    loginAsAdmin,togglePhoneNumber,
    logout} = useAppContext();
    const Navigate = useNavigate();
  const generateOTP = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp.split(''));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSentSnackbar(true);
      setShowLoginButton(true);
    }, 1000);
  };

  const handleSendOTP = () => {
    if (phoneNumber === '1234567890') { // Replace with the correct phone number check
      generateOTP();
    } else {
      setSnackbarMessage('Phone number is incorrect');
      setShowSnackbar(true);
    }
  };

  const handleLogin = () => {
    // Handle login logic here
    alert('Your Able to See Phone And Email');
    loginAsAdmin();
    Navigate("/dashboard");
    togglePhoneNumber();
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: '#EDE7F6' }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={3}
          sx={{
            width: { xs: '90%', sm: '70%', md: '50%', lg: '40%', xl: '30%' },
            background: 'linear-gradient(135deg, #FC8C66 30%, #F76A7B 90%)',
            borderRadius: 2,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          }}
        >
          <Typography variant="h4" sx={{ color: '#3A3A3A', mb: 2 }}>
          Verify First To See the Phone Number And Email
          </Typography>
          <TextField
            fullWidth
            
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ mb: 2, backgroundColor: '#FFF' }}
          />
          <Button
            width="50px"
            variant="contained"
            color="secondary"
            onClick={handleSendOTP}
            sx={{
              mb: 2,
              background: 'linear-gradient(90deg, #9663BF, #4B164C)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(90deg, #7a4fa0, #3a123e)',
              },
            }}
          >
            Send OTP
          </Button>
          {loading && <LinearProgress sx={{ width: '100%', mb: 2 }} />}
          {otp.some(o => o !== '') && (
            <Box display="flex" justifyContent="center" mb={2}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  variant="outlined"
                  inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                  sx={{ mx: 1, width: '3rem', backgroundColor: '#FFF' }}
                />
              ))}
            </Box>
          )}
          {showLoginButton && (
            <Button
              width="50px"
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              sx={{
                mb: 2,
                background: 'linear-gradient(90deg, #9663BF, #4B164C)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(90deg, #7a4fa0, #3a123e)',
                },
              }}
            >
              Submit
            </Button>
          )}
        </Box>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={otpSentSnackbar}
          autoHideDuration={6000}
          onClose={() => setOtpSentSnackbar(false)}
        >
          <Alert onClose={() => setOtpSentSnackbar(false)} severity="success">
            OTP sent successfully!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default ShowphoneAndEmail;
