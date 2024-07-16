import React, { useEffect, useState } from 'react';
import { Container, Image, Nav } from 'react-bootstrap';
import edit from './edit.module.css';
import questionmark from '../../../../assets/images/questionmark.png';
import editicontwo from '../../../../assets/images/editicontwo.png';
import update from '../../../../assets/images/update.png';
import age from '../../../../assets/images/age.png';
import gender from '../../../../assets/images/gender.png';
import locationedit from '../../../../assets/images/locationedit.png';
import relisionedit from '../../../../assets/images/relisionedit.png';
import educationedit from '../../../../assets/images/educationedit.png';
import carear from '../../../../assets/images/carear.png';
import height from '../../../../assets/images/height.png';
import language from '../../../../assets/images/language.png';
import intersts from '../../../../assets/images/intersts.png';
import kids from '../../../../assets/images/kids.png';
import familplantwo from '../../../../assets/images/familplantwo.png';
import smoking from '../../../../assets/images/smoking.png';
import drinktwo from '../../../../assets/images/drinktwo.png';
import prefarance from '../../../../assets/images/prefarance.png';
import helpandsupport from '../../../../assets/images/helpandsupport.png';
import setting from '../../../../assets/images/setting.png';

import editcard from '../../Components/card/editcard';
import Carddetails from '../../Components/card/editcard';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';

const personalityArray = [
    'Activist', 'Affectionate', 'Foodie',
    'Creative', 'Fashionable', 'Playful',
    'Animal Lover', 'Confident', 'Charming'
  ];



const Edit = () => {
  const Navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(true);
  const[Profile, setProfileData] = useState({});
  const[language, setLanguage] = useState([]);
  const[quesAns, setQuestionAns] = useState([]);
  const[expandsall,setexpandall] = useState(false);
  const{getCookie} = useCookies();
  const toggleInfoVisibility = () => {
    setShowInfo(!showInfo);
  };



  const ProfileDetails = async()=>{
    try{
     const response = await fetch(`${API_URL}/customer/update/profileDetails`,
       {
         method : 'GET',
         headers: {
           'Authorization': `Bearer ${getCookie('token')}`
       }
     }
   );
   const data = await response.json();

   if(response.ok){
    setProfileData(data)
    console.log(data)
   }
    }
    catch(err){
     console.log(err);
    }
 }

 const LanguageDetails = async()=>{
  try{
   const response = await fetch(`${API_URL}/customer/update/userlanguage`,
     {
       method : 'GET',
       headers: {
         'Authorization': `Bearer ${getCookie('token')}`
     }
   }
 );
 const data = await response.json();

 if(response.ok){
  setLanguage(data.selectedLanguages)
  console.log(data.selectedLanguages)
 }
  }
  catch(err){
   console.log(err);
  }
}
const QuestionsAnswer = async()=>{
  try{
   const response = await fetch(`${API_URL}/customer/update/questions`,
     {
       method : 'GET',
       headers: {
         'Authorization': `Bearer ${getCookie('token')}`
     }
   }
 );

 const data = await response.json();

 if(response.ok){
  setQuestionAns(data);
  console.log(data);
 }
  }
  catch(err){
   console.log(err);
  }
}

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If the current month is before the birth month, or it's the birth month but the current day is before the birth day, subtract one year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const expandall = ()=>{
  setexpandall(!expandsall)
  // if(expandall){
  //   setexpandall(false)
  // }
  // setexpandall(true)
}
console.log(Profile.Personalities);
const PersonalitiesArray = Profile.Personalities ? Profile.Personalities.split(',') : [];


  useEffect(() => {
   
    ProfileDetails();
    LanguageDetails();
    QuestionsAnswer();
  }, []);

  return (
    <div>
      <Container className={edit.aboutme}>
        <div className='d-flex align-items-center'>
          <p>About me</p>
          <Image
            onClick={toggleInfoVisibility}
            style={{ marginLeft: '15px', cursor: 'pointer' }}
            width="24px"
            height="24px"
            src={questionmark}
          />
          <Container className={`${edit.whyInfo} ${showInfo ? edit.show : edit.hide}`}>
            <p>
              Any changes made to the "About Me" section will be sent for Admin review and approval. 
              Your account will be in a pending status until it gets approved. 
              You should receive an update within 24 hours. If not, please reach 
              out to hello@mytamildate.com. Thank you for your patience!
            </p>
          </Container>
        </div>
        <div>
          <Image onClick={ ()=> Navigate("/updateanswer")} src={editicontwo} />
        </div>
      </Container>

        <Container>
        {
    quesAns.length !== 0 
    ? quesAns.map((item, index) => (
        <Container key={index} className={edit.aboutdetails}>
            <p className={edit.aboutquestion}>
                {item.question}
            </p>
            <p className={edit.aboutanswer}>
                {item.answer}
            </p>
        </Container>
    )) 
    : "Please Add Profile Answer"
}

      </Container>

      <Container className={edit.aboutme}>
        <div className='d-flex align-items-center'>
          <p>Personality</p>
        </div>
        <div>
          <Image onClick={()=> Navigate("/personalityupdate")} src={editicontwo} />
        </div>
      </Container>
      <Container className={edit.personalityarray}>
      {PersonalitiesArray.length > 0 ? 
        PersonalitiesArray.map((personality, index) => (
          <div key={index} className={edit.tag}>
            {personality}
          </div>
        )) 
        : "No Personalities Added"
      }
    </Container>

   {/* <button className={edit.upgradebutton}>Update <span><Image src={update}/></span> </button> */}

   <Container>
    <Link to = "/updateage">
   <Carddetails 
  icon={age} 
  title="Age" 
  detail={Profile.Birthday ? calculateAge(Profile.Birthday) : "N/A"} 
/>
</Link>
<Link to="/updategender">
  <Carddetails icon={gender }title="Gender" detail={Profile.Gender ? Profile.Gender : "N/A"} />
</Link>
  <Link to="/updatelocations">
  <Carddetails icon={locationedit }title="Location" detail={Profile.Country ? Profile.Country : "N/A" }  />
  </Link>
  <Link to = "/updatereligion">
  <Carddetails icon={relisionedit } title="Relision" detail={Profile.Religion ? Profile.Religion : "N/A"} />
  </Link>
  <Link to = "/updateeducations">
  <Carddetails icon={educationedit }title="Education" detail={Profile.StudyField ? Profile.StudyField : "N/A"} />
  </Link>
   </Container>

   <Container>
   <button className={edit.upgradebutton} onClick={expandall}>Expand All <span><Image src={update}/></span> </button>
   </Container>
{
 expandsall ? 


   <Container>
    <Link to="/updatejob">
   <Carddetails icon={carear }title="Career" detail={Profile.JobTitle
 ? Profile.JobTitle
 : "N/A"} />
    </Link>
   <Link to = "/updateheight">
  <Carddetails icon={height }title="Height" detail={Profile.Height ? Profile.Height : "N/A"} />
   </Link>

   <Link to="/updatelanguage">

  <Carddetails 
  icon={intersts} 
  title="Language" 
  detail={language && language.length > 0 ? language.map((e, i) => (
    <span key={i}>{e.name}</span>
  )) : "N/A"} 
/>
</Link>
  <Carddetails icon={intersts }title="Interrests" detail={Profile.PreferredGender ? Profile.PreferredGender : "N/A"} />
   
  <Link to = "/updatekids">
  <Carddetails icon={kids }title="What about kids" detail={Profile.HaveChildren ? Profile.HaveChildren : "N/A"} />
  </Link>
  <Link to = "/updatefamilyplan">
  <Carddetails icon={familplantwo }title="Family plans" detail={Profile.WantChildren ? Profile.WantChildren : "N/A"} />
  </Link>
  <Link to = "/updatesmoke">
  <Carddetails icon={smoking }title="Do you smoke?" detail={Profile.Smoker ? Profile.Smoker : "N/A"}/>
  </Link>
  <Link to = "/updatedrink">
  <Carddetails icon={drinktwo }title="Do you drink" detail={Profile.Drinker ? Profile.Drinker : "N/A"} />
  </Link>

   </Container>
:  ""
}

   <Container>
    <Container style={{display : "flex", marginTop : "20px", justifyContent : "space-between",gap : "5px" }}>
    <div className={edit.button} onClick={()=> Navigate("/user/preferences")}>
        <img src={prefarance} alt="Preferences Icon" />
        Preferences
      </div>
      <div className={edit.button} width="150px">
        <img src={helpandsupport} alt="Help Icon" />
        Help&Support
      </div>
    </Container>
   <div className={edit.buttoncontainer}>
      <div className={edit.buttonlarge} onClick={()=> Navigate("/accoutsetting")}>
        <img src={setting} alt="Settings Icon" />
        Account settings
      </div>
    </div>
   </Container>
    </div>
  );
};

export default Edit;
