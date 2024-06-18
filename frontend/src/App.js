

import { useContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { BasicDetails } from './components/basic-details';
import { EmailVerify } from './components/email-verify';
import { GetStarted } from './components/get-started';
import { AbtYourself } from './components/abt-yourself';
import { Selfie } from './components/take-selfie1';
import { Located } from './components/located';
import { Religion} from './components/religion';
import { Education} from './components/education';
import { JobTitle} from './components/job-title';

import { LP } from './components/LP';
import { FaqPage } from './components/faq-pg';
import { Tnc } from './components/tnc';
import { PrivacyPolicy } from './components/privacy-policy';
import { Stories } from "./components/theirstories";
import { Pictext } from "./components/pic-text";

import { SuccessPage } from "./components/success-stories-pg";
import { GetInTouch } from './components/get-in-touch';

import { SignIn } from "./components/sign-in/signin";
import { SignInEmail } from "./components/sign-in/signin-email";
import { SignInEmailOTP } from "./components/sign-in/signin-email-otp";
import { SignInPhoneOTP } from "./components/sign-in/signin-phone-otp";
import { SignInPhoneSuccessful } from "./components/sign-in/signin-phone-successful";
import { SignInEmailSuccessful } from "./components/sign-in/signin-email-successful";

import { AboutUsPage } from "./components/aboutus-pg"
import TotalCount from "./components/totalcount";
import { Video2 } from "./components/video2";
import ProtectedRoute from "./components/ProtectedRoute";
import EditDetails from "./scenes/promotionalCodes/Editpromotionalcode";
import ImageGallery from "./scenes/Approval/Imageget";


import { SignInOptions } from "./components/sign-in/sign-in-options";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isAdmin } = useAppContext();
  const location = useLocation();

  // List of protected routes
  const protectedRoutes = [
    "/dashboard",
    "/team",
    "/contacts",
    "/approval",
    "/promotionalcodedetails/:id",
    "/userdetails/:id",
    "/showPhoneandEmail",
    "/approvaluserdetails/:id",
    "/promotionalcodes",
    "/invoices",
    "/count",
    "/form",
    "/bar",
    "/pie",
    "/line",
    "/faq",
    "/calendar",
    "/geography",
    "/addpromotionalcode",
    "/editpromotionalcode/:id"
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route.split(":")[0]) // Handle dynamic routes
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAdmin && isProtectedRoute && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAdmin && isProtectedRoute && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
              <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
              <Route path="/approval" element={<ProtectedRoute><Approval /></ProtectedRoute>} />
              <Route path="/promotionalcodedetails/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
              <Route path="/editpromotionalcode/:id" element={<ProtectedRoute>< EditDetails/></ProtectedRoute>} />
              <Route path="/userdetails/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
              <Route path="/showPhoneandEmail" element={<ProtectedRoute><ShowphoneAndEmail /></ProtectedRoute>} />
              <Route path="/approvaluserdetails/:id" element={<ProtectedRoute><ApprovalUserDetails /></ProtectedRoute>} />
              <Route path="/promotionalcodes" element={<ProtectedRoute><PromotionalCodes /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/count" element={<ProtectedRoute><TotalCount /></ProtectedRoute>} />
              <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
              <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
              <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
              <Route path="/adminlogin" element={<AdminSignIn />} />
              <Route path="/addpromotionalcode" element={<ProtectedRoute><AddPromotioncode /></ProtectedRoute>} />
              <Route  path="/img" element={<ImageGallery />}></Route>



              <Route path="/" element={<LP />} />
              <Route path="/SuccessPage" element={<SuccessPage />} />
              <Route path="/FaqPage" element={<FaqPage />} />
              <Route path="/GetInTouch" element={<GetInTouch />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route path="/Tnc" element={<Tnc />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/video2" element={<Video2 />} />

              <Route path="/signup" element={<SignupPhone />} />
              <Route path="/signinoptions" element={<SignInOptions />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signinphoneotp" element={<SignInPhoneOTP />} />
              <Route path="/signinphonesuccessful" element={<SignInPhoneSuccessful />} />
              <Route path="/signinemailsuccessful" element={<SignInEmailSuccessful/>} />
            
              <Route path="/signinemail" element={<SignInEmail />} />
              <Route path="/signinemailotp" element={<SignInEmailOTP />} />

              
              <Route path="/entercode" element={<Entercode />} />
              <Route path="/emailverify" element={<EmailVerify />} />
              <Route path="/getstarted" element={<GetStarted />} />
              <Route path="/basicdetails" element={<BasicDetails />} />
              <Route path="/abtyourself" element={<AbtYourself />} />
              <Route path="/selfie" element={<Selfie />} />
              <Route path="/located" element={<Located />} />
              <Route path="/religion" element={<Religion />} />
              <Route path="/edu" element={<Education />} />
              <Route path="/jobtitle" element={<JobTitle />} />


            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
