import { Card, CardContent, Box, Button, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header1";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const data = [
  { country: 'Canada', value: 6 },
  { country: 'Australia', value: 2 },
  { country: 'United Kingdom', value: 2 },
  { country: 'United States', value: 2 },
  { country: 'India', value: 1 },
];

const agedata = [
  { age: '18-24', value: 6 },
  { age: '25-30', value: 3 },
  { age: '31-40', value: 4 },
  { age: '41+', value: 2 },
];

const gendersdata = [
  { gender: 'Male', value: 16 },
  { gender: 'Female', value: 23 },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box mt={isMobile ? "10px" : "0"}>
          <Button
            sx={{
              background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box gridColumn={isMobile ? "span 12" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="12,361"
            subtitle="Messages"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="431,225"
            subtitle="Likes"
            progress="0.50"
            increase="+21%"
            icon={<FavoriteBorderIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="32,441"
            subtitle="Matches"
            progress="0.30"
            increase="+5%"
            icon={<JoinInnerIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="1,325,134"
            subtitle="Requests"
            progress="0.80"
            increase="+43%"
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn={isMobile ? "span 12" : "span 4"} gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 4"} gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box key={`${transaction.txId}-${i}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box gridColumn={isMobile ? "span 12" : "span 4"} gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600">
            Total Revenue
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size="125" />
            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>

      {/* CARDS */}
      <Box display="grid" gridTemplateColumns={isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))"} gap="20px">
        {[
          { title: "Age Groups", data: agedata, key: 'age' },
          { title: "Distribution of Genders", data: gendersdata, key: 'gender' },
          { title: "Total Number of New Paid Members", value: 14 },
          { title: "Total Number of New Members Signed Up", value: 144 },
          { title: "Total Number of Old Users Signing In for the First Time", value: 15 },
          { title: "Avg Days to Paid Conversion", value: 6 },
          { title: "Avg Time Per Session", value: 19 },
          { title: "Avg Number of Interactions Per Session", value: 20 },
        ].map((item, index) => (
          <Box key={index}>
            <Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
              <CardContent style={{ padding: '16px' }}>
                <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
                  <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                    {item.title}
                  </Typography>
                </Box>
                <Box style={{ padding: '8px' }}>
                  {item.data
                    ? item.data.map((subItem, subIndex) => (
                        <Typography key={subIndex} variant="body1" style={{ margin: '4px 0' }}>
                          {subItem[item.key]} - {subItem.value}
                        </Typography>
                      ))
                    : (
                      <Typography variant="body1" style={{ margin: '4px 0' }}>
                        {item.value}
                      </Typography>
                    )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
