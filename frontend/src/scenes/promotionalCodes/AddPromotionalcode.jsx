import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header1";

const Details = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Example details (replace with actual data)
  const details = {
    promotionCode: "SUMMER21",
    amountOff: "$10",
    percentOff: "20%",
    availableFrom: "2023-06-01",
    availableTo: "2023-08-31",
    maxRedemptions: "100",
    subscriptionPeriod: "1 Month",
    oncePerUser: "Yes",
  };

  return (
    <Box m="20px">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 3,
        }}
      >
        <Header title="Promotional Codes Details" subtitle="" />
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'space-between', sm: 'flex-start' },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <Button variant="contained" color="secondary">Back</Button>
          <Button variant="contained" color="error">Delete</Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {Object.entries(details).map(([key, value], index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box mb={2}>
              <Typography variant="h6" color={colors.primary[700]}>{formatLabel(key)}</Typography>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${colors.grey[300]}`,
                  borderRadius: '8px',
                  backgroundColor: colors.primary[50],
                }}
              >
                <Typography variant="body1">{value}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const formatLabel = (label) => {
  // Convert camelCase or snake_case to Normal Case
  return label.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

export default Details;
