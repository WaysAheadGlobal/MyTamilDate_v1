import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header1';
import { useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/UseContext';

const Contacts = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showFullPhoneNumberemail, togglePhoneNumber } = useAppContext();
  const Navigate = useNavigate();
  const togglePhoneNumberemail = () => {
    { showFullPhoneNumberemail ? togglePhoneNumber() : Navigate("/showPhoneandEmail") }
  }
  // Function to format phone number
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

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'registrarId', headerName: 'Registrar ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,

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
          {showFullPhoneNumberemail ? params.value : formatPhoneNumber(params.value)}
        </Typography>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {showFullPhoneNumberemail ? params.value : formatEmailAddress(params.value)}
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
        <Link to="/userdetails" style={{ color: colors.blueAccent[400], textDecoration: 'none' }}>
          Show
        </Link>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box></Box>
      <Header
        mb={2}
        title="Users List"
        subtitle="List of Contacts for Future Reference"
      />

      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ mt: { lg: '-70px' } }}
      >
        {/* <Button
           sx={{
            mb: 2,
            background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
            },
          }}
          onClick={togglePhoneNumberemail}
        >
          {showFullPhoneNumberemail ? 'Hide Phone Number And Email' : 'Show Phone Number And Email'}
        </Button> */}
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundImage: 'linear-gradient(90deg, #9663BF, #4B164C)', // Lavender gradient background
            color: '#fff', // Text color white
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "14px", // Adjust the font size
            fontWeight: "Medium", // Make the font bold
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#605f61",
            color: '#fff',
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            // backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#9663BF",
            color: '#fff',
          },

          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },

          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },".MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: '#605f61',
            color: '#fff',
          },
          ".MuiTablePagination-root": {
            overflow: "auto",
            color: "rgb(255 255 255 / 87%)",
            fontSize: "14px",
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
