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
import AddPromotioncode from "./scenes/promotionalCodes/AddPromotionalcode";
import { Entercode } from './components/entercode';
import { SignupPhone } from './components/signup-verifyphone';
import {BasicDetails } from './components/basic-details';
import { EmailVerify} from './components/email-verify';
import { Birthday} from './components/birthday';
import { Selfie} from './components/take-selfie1';
import {LP} from './components/LP';
import {FaqPage} from './components/faq-pg';
import {Tnc} from './components/tnc';
import {PrivacyPolicy} from './components/privacy-policy';
import { Stories } from "./components/stories";
import { Pictext } from "./components/pic-text";
import {SuccessPage} from "./components/success-stories-pg";
import {GetInTouch} from './components/get-in-touch';
import {SignIn} from  "./components/signin";
import {AboutUsPage}   from "./components/aboutus-pg"
import TotalCount from "./components/totalcount";

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
            {/* <Route path="" element={< Landingpage/>} /> */}
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
          <Route path="/count" element={<TotalCount/>}></Route>
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/adminlogin" element={<AdminSignIn/>}></Route>
              <Route path="/addpromotionalcode" element={<AddPromotioncode/>}></Route>

{/* landing page and its linked pages  stare*/}
                <Route path="/" element={<LP/>}></Route>
                <Route path="/SuccessPage" element={<SuccessPage/>}></Route>
                <Route path="/FaqPage" element={<FaqPage/>}></Route>
                <Route path="/GetInTouch" element={<GetInTouch/>}></Route>


                <Route path="/aboutus" element={<AboutUsPage/>}></Route>

                <Route path="/Tnc" element={<Tnc/>}></Route>
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}></Route>

                <Route path="/signup" element={<SignupPhone/>}></Route>
                
                <Route path="/signIn" element={<SignIn/>}></Route>





{/* landing page and its linked pages end */}
                <Route path="/signup" element={<SignupPhone/>}></Route>
                <Route path="/entercode" element={<Entercode/>}></Route>
                <Route path="/BasicDetails" element={<BasicDetails/>}></Route>
                <Route path="/EmailVerify" element={<EmailVerify/>}></Route>
                <Route path="/Birthday" element={<Birthday/>}></Route>
                <Route path="/Selfie" element={<Selfie/>}></Route>
            </Routes>

            {/* <SignupPhone /> */}
        {/* <Entercode/> */}
        {/* <BasicDetails/> */}
        {/* <EmailVerify/> */}
        {/* <Birthday/> */}
        {/* <Selfie/> */}


        {/*
          <NavBar/>
         <Header/>
        <Pictext/>
        <Stories/>
        <Video/>
        <Join/>
        <Footer/> */}

        {/* <LP/> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
