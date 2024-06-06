import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppContext } from '../../Context/UseContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from '../../hooks/useCookies';

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

const AdminSignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCookie } = useCookies();
  const { loginAsAdmin } = useAppContext();
  const navigate = useNavigate();

  const validateForm = () => {
    return username === 'Admin' && password === '12345';
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (validateForm()) {
        loginAsAdmin();
        setCookie('userId', 'adminlogin', 365);
        navigate("/dashboard");
      } else {
        setSnackbarMessage('Username or password is incorrect');
        setShowSnackbar(true);
      }
    }, 1000);
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
            Admin Sign In
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2, backgroundColor: '#FFF' }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, backgroundColor: '#FFF' }}
          />
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
            Login
          </Button>
          {loading && <LinearProgress sx={{ width: '100%', mb: 2 }} />}
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
      </Box>
    </ThemeProvider>
  );
};

export default AdminSignIn;
