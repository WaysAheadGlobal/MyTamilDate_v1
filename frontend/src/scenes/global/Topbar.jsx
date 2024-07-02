import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useState, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { useAppContext } from '../../Context/UseContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from '../../hooks/useCookies';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { loginAsAdmin, logout } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/adminlogin");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>
      <Box display="flex">
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
