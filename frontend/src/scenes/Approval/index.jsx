import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header1';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length >= 6) {
      const visibleDigits = 3;
      const maskedSection = phoneNumber.substring(visibleDigits, phoneNumber.length - visibleDigits).replace(/\d/g, '*');
      const visiblePart = phoneNumber.substring(0, visibleDigits) + maskedSection + phoneNumber.substring(phoneNumber.length - visibleDigits);
      return visiblePart;
    }
    return phoneNumber;
  };

  // Function to format email address
  const formatEmailAddress = (email) => {
    const parts = email.split('@');
    const visiblePart = `${parts[0].charAt(0)}***@${parts[1]}`;
    return visiblePart;
  };

  // State to toggle showing full phone number
  const [showFullPhoneNumber, setShowFullPhoneNumber] = useState(false);
  const togglePhoneNumber = () => setShowFullPhoneNumber(!showFullPhoneNumber);

  // State to toggle showing full email
  const [showFullEmail, setShowFullEmail] = useState(false);
  const toggleEmail = () => setShowFullEmail(!showFullEmail);

  const showmailandphone = () => {
    toggleEmail();
    togglePhoneNumber();
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'registrarId', headerName: 'Registrar ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {showFullPhoneNumber ? params.value : formatPhoneNumber(params.value)}
        </Typography>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {showFullEmail ? params.value : formatEmailAddress(params.value)}
        </Typography>
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Link',
      flex: 1,
      renderCell: (params) => (
        <Link to="/approvaluserdetails" style={{ color: colors.greenAccent[200], textDecoration: 'none' }}>
          Show
        </Link>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Pending Approval"
        subtitle="List of Pending Approval "
      />

{/* <Box
    display="flex"
    justifyContent="flex-end"
    sx={{
      mt: {
        lg: '-70px', // margin-top for large screens
      },
    }}
  >
    <Button variant="contained" color="secondary" onClick={showmailandphone}>
      {showFullPhoneNumber && showFullEmail ? 'Hide Phone Number And Email' : 'Show Phone Number And Email'}
    </Button>
  </Box> */}

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;