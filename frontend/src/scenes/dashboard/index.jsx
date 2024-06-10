/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Card, CardContent, Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
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
import PieChart from '../../components/PieChart';
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../../data/mockData";
const agedata = [
  { age: '18-24', value: 6 },
  { age: '25-30', value: 3 },
  { age: '31-40', value: 4 },
  { age: '41+', value: 2 },
];

const transformedagedata = agedata.map(item => ({
  id: item.age,
  label: item.age,
  value: item.value,
}));

const gendersdata = [
  { gender: 'Male', value: 16 },
  { gender: 'Female', value: 23 },
  { gender: 'Other', value: 12 },
];

const transformedGenderData = gendersdata.map(item => ({
  id: item.gender,
  label: item.gender,
  value: item.value,
}));

const cardStyle = {
  width: '320px',
  margin: '10px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
};

const cardHeaderStyle = {
  background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
  padding: '16px',
  textAlign: 'center',
};

const cardContentStyle = {
  padding: '20px',
};

const cardTextStyle = {
  margin: '4px 0',
  fontWeight: 'bold',
  fontSize: '24px',
  textAlign: 'center',
  color: '#333',
};

const StatCard = ({ title, value }) => (
  <Box display="flex" justifyContent="center">
    <Card style={cardStyle}>
      <CardContent style={{ padding: 0 }}>
        <Box style={cardHeaderStyle}>
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
        <Box style={cardContentStyle}>
          <Typography variant="body1" style={cardTextStyle}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const listCardStyle = {
  width: '100%',
  maxWidth: '500px',
  margin: '16px',
  animation: `${fadeIn} 1s ease-in-out`,
};

const listCardHeaderStyle = {
  background: 'linear-gradient(90deg, #FC8C66, #F76A7B)',
  padding: '16px',
};

const listCardContentStyle = {
  padding: '16px',
};

const itemStyle = index => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: ${slideIn} 0.5s ease-in-out ${index * 0.1}s forwards;
  opacity: 0;
`;

const ListCard = ({ title, data }) => (
  <Box display="flex" justifyContent="center">
    <Card style={listCardStyle}>
      <CardContent style={{ padding: 0 }}>
        <Box style={listCardHeaderStyle}>
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
        <Box style={listCardContentStyle}>
          {data.map((item, index) => (
            <Box
              key={index}
              css={itemStyle(index)}
            >
              <Typography variant="body1" style={{ fontWeight: 'bold', color: '#333' }}>
                {item.age || item.gender}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: '#FC8C66' }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Box>
);

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
        <Box gridColumn={isMobile ? "span 12" : "span 3"}  display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="12,361"
            subtitle="Messages"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 3"}  display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="431,225"
            subtitle="Likes"
            progress="0.50"
            increase="+21%"
            icon={<FavoriteBorderIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 3"}  display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="32,441"
            subtitle="Matches"
            progress="0.30"
            increase="+5%"
            icon={<JoinInnerIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 12" : "span 3"}  display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="1,325,134"
            subtitle="Requests"
            progress="0.80"
            increase="+43%"
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
      </Box>

      {/* CONTENT GRID */}
      <Box m="20px">
        <Box
          display="grid"
          gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
          gridAutoRows="140px"
          gap="20px"
        >
          {/* Recent Transactions */}
          <Box gridColumn={isMobile ? "span 12" : "span 4"} gridRow="span 2" overflow="auto">
            <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`2px solid ${colors.primary[500]}`}
                p="15px"
                sx={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    borderColor: colors.greenAccent[500],
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
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
          
          <Box mb="20px" gridColumn={isMobile ? "span 13" : "span 4"} gridRow="span 2">
          <Box style={cardHeaderStyle}>
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
          Distribution of genders
          </Typography>
        </Box>
            <PieChart data={transformedGenderData} />
          </Box>
          <Box mb="20px" gridColumn={isMobile ? "span 12" : "span 4"} gridRow="span 2">
          <Box style={cardHeaderStyle}>
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
          Age groups
          </Typography>
        </Box>
            <PieChart data={transformedagedata}  />
          </Box>

          {/* Total Revenue */}
          {/* <Box
            gridColumn={isMobile ? "span 12" : "span 4"}
            gridRow="span 2"
            backgroundColor="#fff"
            p="30px"
            sx={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              border: `2px solid ${colors.greenAccent[500]}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                borderColor: colors.primary[500],
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography variant="h5" fontWeight="600">
              Total Revenue
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
              <ProgressCircle size="100" />
              <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
                $48,352 revenue generated
              </Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
          </Box> */}

          {/* Age Groups */}
          {/* <Box gridColumn={isMobile ? "span 12" : "span 4"} gridRow="span 2" mt="-25px">
            <ListCard title="Age Groups" data={agedata} />
          </Box> */}

        </Box>

        {/* Additional Cards */}
        <Box display="grid" gridTemplateColumns={isMobile ? "repeat(auto-fill, minmax(250px, 1fr))" : "repeat(auto-fill, minmax(250px, 1fr))"} gap="10px" mt="20px">
        <StatCard title="total Revenue Generated" value="14443" />
          <StatCard title="Total Number of Old Users Signing In for the First Time" value="15" />
          <StatCard title="Total Number of New Members Signed Up" value="144" />
          <StatCard title="Total Number of New Paid Members" value="14" />
        </Box>
        <Box display="grid" gridTemplateColumns={isMobile ? "repeat(auto-fill, minmax(250px, 1fr))" : "repeat(auto-fill, minmax(250px, 1fr))"} gap="10px" mt="20px">
          
          <StatCard title="Total # of renewals" value="15" />
          <StatCard title="Avg # of Interaction Per Session" value="144" />
          <StatCard title="Avg Time Per Session" value="14" />
          <StatCard title="Avg Time Per Session" value="14" />
        </Box>

      </Box>
     
      
    </Box>
  );
};

export default Dashboard;
