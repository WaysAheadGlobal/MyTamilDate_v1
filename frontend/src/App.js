

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Approval from "./scenes/Approval";
import ApprovalUserDetails from "./scenes/Approval/Approvaldetails";
import AdminSignIn from "./scenes/adminLogin/adminlogin";
import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar/calendar";
import Contacts from "./scenes/contacts";
import Dashboard from "./scenes/dashboard";
import FAQ from "./scenes/faq";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import Sidebaradmin from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Invoices from "./scenes/invoices";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import AddPromotioncode from "./scenes/promotionalCodes/AddPromotionalcode";
import PromotionalCodes from "./scenes/promotionalCodes/CodesList";
import Details from "./scenes/promotionalCodes/Details";
import ShowphoneAndEmail from "./scenes/showPhoneandEmail/showPhoneandEmail";
import Team from "./scenes/team";
import UserDetails from "./scenes/userDetails";
import { ColorModeContext, useMode } from "./theme";

import { AbtYourself } from './components/abt-yourself';
import { BasicDetails } from './components/basic-details';
import { Education } from './components/education';
import { EmailVerify } from './components/email-verify';
import { Entercode } from './components/entercode';
import { GetStarted } from './components/get-started';
import { JobTitle } from './components/job-title';
import { Located } from './components/located';
import { Religion } from './components/religion';
import { SignupPhone } from './components/signup-verifyphone';
import { Selfie } from './components/take-selfie1';

import { LP } from './components/LP';
import { FaqPage } from './components/faq-pg';
import { PrivacyPolicy } from './components/privacy-policy';
import { Tnc } from './components/tnc';

import { GetInTouch } from './components/get-in-touch';
import { SuccessPage } from "./components/success-stories-pg";

import { SignIn } from "./components/sign-in/signin";
import { SignInEmail } from "./components/sign-in/signin-email";
import { SignInEmailOTP } from "./components/sign-in/signin-email-otp";
import { SignInEmailSuccessful } from "./components/sign-in/signin-email-successful";
import { SignInPhoneOTP } from "./components/sign-in/signin-phone-otp";
import { SignInPhoneSuccessful } from "./components/sign-in/signin-phone-successful";

import ProtectedRoute from "./components/ProtectedRoute";
import { AboutUsPage } from "./components/aboutus-pg";
import TotalCount from "./components/totalcount";
import { Video2 } from "./components/video2";
import ImageGallery from "./scenes/Approval/Imageget";
import EditDetails from "./scenes/promotionalCodes/Editpromotionalcode";


import { AccountSetting } from "./components/Account-Settings/accountSetting";
import { PrivacyPolicySetting } from "./components/Account-Settings/privacyPolicy";
import { TermsConditions } from "./components/Account-Settings/termandconditons";
import UnsubscribeComponent from "./components/Account-Settings/unsubscribeEmail";
import AccountApproved from "./components/AccountApproved";
import AccountNotApproved from "./components/AccountNotApproved";
import AccountPending from "./components/AccountPending";
import AlmostThere from "./components/AlmostThere";
import ApproveEmail from "./components/ApproveEmail";
import Height from "./components/Height";
import KidsAndFamily from "./components/KidsAndFamily";
import Personality from "./components/Personality";
import ProfileAnswers from "./components/ProfileAnswers";
import SmokeAndFamily from "./components/SmokeAndDrink";
import { SignInOptions } from "./components/sign-in/sign-in-options";

import PaymentMethod from '../src/components/Account-Settings/payment/paymentMethod';
import Fillpaymentdetails from "./components/Account-Settings/payment/SelectPlan/FIllDetailForPayment/fillpaymentdetails";
import Selectplan from './components/Account-Settings/payment/SelectPlan/selectplan';
import AddPaymentMethod from "./components/Account-Settings/payment/addpaymentmethod";
import BillingHistory from './components/Account-Settings/payment/billinghistory';
import Analytics from "./components/Analytics";
import UpdateAnswers from "./components/UpdateProfile/screens/EditAnswerAndQuestion/editanswer";
import EditPicture from "./components/UpdateProfile/screens/PictureEdit/pictureedit";
import Preview from "./components/UpdateProfile/screens/Preview/Preview";
import UpdateProfile from "./components/UpdateProfile/screens/Profile";
import Drinkupdate from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Drink/drink";
import { GenderUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Gender/Gender";
import HeightUpdate from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Height/height";
import { JobTitleUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Job/job";
import PersonalityProfile from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Personality/personality";
import { ReligionUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Religion/religion";
import KidsAndFamilyUpdate from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/Whatsaboutfamily/familyplan";
import { BasicDetailsUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/age/age";
import { EducationUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/educations/educations";
import KidsUpdate from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/havekids/havekids";
import { LanguageUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/languages/languages";
import { LocatedUpdate } from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/locations/locations";
import Smokeupdate from "./components/UpdateProfile/screens/UserDetailsUpdateScreen/smoke/smoke";
import HelpSupport from "./components/UpdateProfile/screens/help&support/helpandsupport";
import Home from "./components/userflow/screens/Home";
import Chat from "./components/userflow/screens/chat/Chat";
import ChatWith from "./components/userflow/screens/chat/ChatWith";
import PauseMyAccount from "./components/userflow/screens/pause/pause";
import Preferences from "./components/userflow/screens/preferences/Preferences";
import ProfileDetails from "./components/userflow/screens/profile-details/ProfileDetails";
import Recommendations from "./components/userflow/screens/recommendations/Recommendations";
import { useCookies } from "./hooks/useCookies";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // const { isAdmin } = useAppContext();
  const { getCookie, setCookie } = useCookies();
  const location = useLocation();
  const admintoken = getCookie('Admintoken')

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


  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route.split(":")[0])
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{
          maxWidth: "1636px",
          margin: "0 auto",
        }}>
          {admintoken && isProtectedRoute && <Sidebaradmin isSidebar={isSidebar} />}
          <main className="content">
            {admintoken && isProtectedRoute && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
              <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
              <Route path="/approval" element={<ProtectedRoute><Approval /></ProtectedRoute>} />
              <Route path="/promotionalcodedetails/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
              <Route path="/editpromotionalcode/:id" element={<ProtectedRoute>< EditDetails /></ProtectedRoute>} />
              <Route path="/userdetails/:id" element={<ProtectedRoute><ApprovalUserDetails /></ProtectedRoute>} />
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
              <Route path="/img" element={<ImageGallery />}></Route>

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
              <Route path="/signinemailsuccessful" element={<SignInEmailSuccessful />} />

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
              <Route path="/height" element={<Height />}/>
              <Route path="/personality" element={<Personality />} />
              <Route path="/profile-answers" element={<ProfileAnswers />} />
              <Route path="/kids-family" element={<KidsAndFamily />} />
              <Route path="/smoke-drink" element={<SmokeAndFamily />} />
              <Route path="/approve" element={<ApproveEmail />} />
              <Route path="/almost-there" element={<AlmostThere />} />
              <Route path="/pending" element={<AccountPending />} />
              <Route path="/not-approved" element={<AccountNotApproved />} />
              <Route path="/approved" element={<AccountApproved />} />


              <Route path="/accoutsetting" element={<AccountSetting />}></Route>
              <Route path="/unsubscribe" element={<UnsubscribeComponent />}></Route>
              <Route path="/PrivacyPolicyDetails" element={<PrivacyPolicySetting />}></Route>
              <Route path="/termandconditions" element={<TermsConditions />}></Route>
              <Route path="/paymentmethod" element={<PaymentMethod />}></Route>
              <Route path="/billinghistory" element={<BillingHistory />}></Route>
              <Route path="/selectplan" element={<Selectplan />}></Route>
              <Route path="/addpaymentmethod" element={<AddPaymentMethod />}></Route>
              <Route path="/paymentdetails" element={<Fillpaymentdetails />}></Route>

              <Route path="/updateprofile" element={<UpdateProfile />}></Route>
              <Route path="/preview" element={<Preview />}></Route>
              <Route path="/editpicture" element={<EditPicture />}></Route>
              <Route path="/updateanswer" element={<UpdateAnswers />}></Route>
             
              <Route path="/personalityupdate" element = {<PersonalityProfile/>}></Route>
              <Route path = "/updategender"element = {<GenderUpdate />}></Route>
              <Route path="/updatelocations" element={<LocatedUpdate/>}></Route>
              <Route path="/updatereligion" element={<ReligionUpdate/>}></Route>
              <Route path="/updateheight" element = {<HeightUpdate/>}></Route>
              <Route path = "/updatejob" element={<JobTitleUpdate/>}></Route>
              <Route path="/updatesmoke" element = {<Smokeupdate/>}></Route>
              <Route path = "/updatedrink" element = {<Drinkupdate/>}></Route>
              <Route path="/updatefamilyplan" element = {<KidsAndFamilyUpdate/>}></Route>
              <Route path="/updatekids" element = {<KidsUpdate/>}></Route>
              <Route path = "/updatelanguage" element = {<LanguageUpdate/>}></Route>
              <Route path = "/updateeducations" element = {<EducationUpdate/>}></Route>
              <Route path="/updateage" element = {<BasicDetailsUpdate/>}></Route>
              <Route path="/helpsupport" element={<HelpSupport/>}></Route>          
             
 
              <Route path="/user/home" element={<Home />} />
              <Route path="/user/recommendations" element={<Recommendations />} />
              <Route path="/user/preferences" element={<Preferences />} />
              <Route path="/user/:name/:id" element={<ProfileDetails />} />
              <Route path="/user/chat/with/:name" element={<ChatWith />} />
              <Route path="/user/chat/*" element={<Chat />} />
              <Route path="/user/pause" element = {<PauseMyAccount/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
