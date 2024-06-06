import { Card, CardContent, Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header1";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StatBox from "../../components/StatBox";
import JoinInnerIcon from '@mui/icons-material/JoinInner';
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
  { age: '25-30', value: 3 },{ age: '31-40', value: 4 },{ age: '41+', value: 2 },
];
const  gendersdata = [
  { gender: 'Male', value: 16 },
  { gender: 'Female', value: 23 },
];


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              mb: 2,
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

      
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 4fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Massages"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Likes"
            progress="0.50"
            increase="+21%"
            icon={
              <FavoriteBorderIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Matches"
            progress="0.30"
            increase="+5%"
            icon={
              <JoinInnerIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Requests"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
         <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
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
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
           Total Revenue
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}


      </Box>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="20px">
    
<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Age Groups
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
          {agedata.map((item, index) => (
            <Typography key={index} variant="body1" style={{ margin: '4px 0' }}>
              {item.age} - {item.value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
</Box>
<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Distribution of genders
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
          {gendersdata.map((item, index) => (
            <Typography key={index} variant="body1" style={{ margin: '4px 0' }}>
              {item.gender} - {item.value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
</Box>

<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Total Number of new Paid members
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
         
            <Typography  variant="body1" style={{ margin: '4px 0' }}>
              14
            </Typography>
     
        </Box>
      </CardContent>
    </Card>
</Box>
<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Total Number of new members signed up
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
         
            <Typography  variant="body1" style={{ margin: '4px 0' }}>
              144
            </Typography>
     
        </Box>
      </CardContent>
    </Card>
</Box>

<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Total Number of old users signing in for the first time
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
         
            <Typography  variant="body1" style={{ margin: '4px 0' }}>
              15
            </Typography>
     
        </Box>
      </CardContent>
    </Card>
</Box>

<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Avg days to paid conversion
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
         
            <Typography  variant="body1" style={{ margin: '4px 0' }}>
              6
            </Typography>
     
        </Box>
      </CardContent>
    </Card>
</Box>

<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Avg Time Per Session
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
         
            <Typography  variant="body1" style={{ margin: '4px 0' }}>
              19
            </Typography>
     
        </Box>
      </CardContent>
    </Card>
</Box>
<Box>
<Card style={{ width: '300px', margin: '20px auto', borderRadius: '8px' }}>
      <CardContent style={{ padding: '16px' }}>
        <Box style={{ backgroundColor: '#FC8C66', padding: '8px', borderRadius: '4px 4px 0 0' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Avg Number of Interaction Per Session
          </Typography>
        </Box>
        <Box style={{ padding: '8px' }}>
         
            <Typography  variant="body1" style={{ margin: '4px 0' }}>
              20
            </Typography>
        </Box>
      </CardContent>
    </Card>
</Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
