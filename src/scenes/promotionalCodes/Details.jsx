import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

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
    }}
  >
    <Header title="Promotional Codes Details" subtitle="" />
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
        marginTop: { xs: 1, sm: 0 },
      }}
    >
      <Button variant="contained" color="secondary">List</Button>
      <Button variant="contained" color="error">Delete</Button>
    </Box>
  </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box mb={1}>
            <Typography variant="h3" >Promotions Code</Typography>
            <Box
              sx={{
                p: 1,
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: '8px',
                backgroundColor: colors.primary[50],
              }}
            >
              <Typography variant="body1">{details.amountOff}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={1}>
            <Typography variant="h3">Amount Off</Typography>
            <Box
              sx={{
                p: 1,
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: '8px',
                backgroundColor: colors.primary[50],
              }}
            >
              <Typography variant="body1">{details.promotionCode}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={1}>
            <Typography variant="h3">Percent Off</Typography>
            <Box
              sx={{
                p: 1,
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: '8px',
                backgroundColor: colors.primary[50],
              }}
            >
              <Typography variant="body1">{details.percentOff}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={1}>
            <Typography variant="h3">Available From</Typography>
            <Box
              sx={{
                p: 1,
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: '8px',
                backgroundColor: colors.primary[50],
              }}
            >
              <Typography variant="body1">{details.availableFrom}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={1}>
            <Typography variant="h3">Available To</Typography>
            <Box
              sx={{
                p: 1,
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: '8px',
                backgroundColor: colors.primary[50],
              }}
            >
              <Typography variant="body1">{details.availableTo}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={1}>
            <Typography variant="h3">Max Redemptions</Typography>
            <Box
              sx={{
                p: 1,
                border: `1px solid ${colors.grey[300]}`,
                borderRadius: '8px',
                backgroundColor: colors.primary[50],
              }}
            >
              <Typography variant="body1">{details.maxRedemptions}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
