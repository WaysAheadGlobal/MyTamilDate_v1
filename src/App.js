import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Approval from "./scenes/Approval";
import PromotionalCodes from "./scenes/promotionalCodes/CodesList";
import Details from "./scenes/promotionalCodes/Details";
import UserDetails from "./scenes/userDetails";
import ApprovalUserDetails from "./scenes/Approval/Approvaldetails";
import AdminSignIn from "./scenes/adminLogin/adminlogin";
import { useAppContext } from "./Context/UseContext";
import ShowphoneAndEmail from "./scenes/showPhoneandEmail/showPhoneandEmail";
import Landingpage from "./components/Landingpage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
const { isAdmin } = useAppContext();
console.log(isAdmin)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAdmin? <Sidebar isSidebar={isSidebar} /> : "" }
          <main className="content">
            {isAdmin? <Topbar setIsSidebar={setIsSidebar} /> : "" }
            
            <Routes>
            <Route path="/" element={< Landingpage/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/approval" element={<Approval/>}></Route>
              <Route path="/promotionalcodedetails" element={<Details/>}></Route>
              <Route path="/userdetails" element={<UserDetails/>}></Route>
              <Route path="/showPhoneandEmail" element={<ShowphoneAndEmail/>}></Route>
              <Route path="/approvaluserdetails" element={<ApprovalUserDetails/>}></Route>
              <Route path="/promotionalcodes" element={<PromotionalCodes/>}></Route>
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/adminlogin" element={<AdminSignIn/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
