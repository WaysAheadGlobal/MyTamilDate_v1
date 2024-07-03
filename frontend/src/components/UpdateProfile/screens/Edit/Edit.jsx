import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
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
import { useNavigate } from 'react-router-dom';

const personalityArray = [
    'Activist', 'Affectionate', 'Foodie',
    'Creative', 'Fashionable', 'Playful',
    'Animal Lover', 'Confident', 'Charming'
  ];



const Edit = () => {
  const Navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfoVisibility = () => {
    setShowInfo(!showInfo);
  };

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
      <Container className={edit.aboutdetails}>
        <p className={edit.aboutquestion}>
        A life goal of mine
        </p>
        <p className={edit.aboutanswer}>
        Fueled by a deep love for nature, I strive to leave the world a more beautiful place, where future generations can experience its wonders
        </p>
      </Container>
      <Container className={edit.aboutdetails}>
        <p className={edit.aboutquestion}>
        I get along best with people who
        </p>
        <p className={edit.aboutanswer}>
        Can have a good laugh together and understand each other's humor
        </p>
      </Container>
      </Container>

      <Container className={edit.aboutme}>
        <div className='d-flex align-items-center'>
          <p>Personality</p>
        </div>
        <div>
          <Image onClick={()=> Navigate("/updatepersonality")} src={editicontwo} />
        </div>
      </Container>

       <Container className={edit.personalityarray}>
      {personalityArray.map((personality, index) => (
        <div key={index} className={edit.tag}>
          {personality}
        </div>
      ))}
    </Container>

   <button className={edit.upgradebutton}>Update <span><Image src={update}/></span> </button>

   <Container>
  <Carddetails icon={age }title="Age" detail="24" />
  <Carddetails icon={gender }title="Gender" detail="Male" />
  <Carddetails icon={locationedit }title="Location" detail="Canada" />
  <Carddetails icon={relisionedit }title="Relision" detail="Hindu" />
  <Carddetails icon={educationedit }title="Education" detail="Master" />
   </Container>

   <Container>
   <button className={edit.upgradebutton}>Expand All <span><Image src={update}/></span> </button>
   </Container>
   <Container>
   <Carddetails icon={carear }title="Career" detail="Designer" />
  <Carddetails icon={height }title="Height" detail="6'0" />
  <Carddetails icon={language }title="Language" detail="English Tamil" />
  <Carddetails icon={intersts }title="Interrests" detail="View all" />
  <Carddetails icon={kids }title="What about kids" detail="No" />
  <Carddetails icon={familplantwo }title="Family plans" detail="Want children" />
  <Carddetails icon={smoking }title="Do you smoke?" detail="No" />
  <Carddetails icon={drinktwo }title="Do you drink" detail="Yes" />

   </Container>
   <Container>
    <Container style={{display : "flex", marginTop : "20px", justifyContent : "space-between",gap : "5px" }}>
    <div className={edit.button}>
        <img src={prefarance} alt="Preferences Icon" />
        Preferences
      </div>
      <div className={edit.button} width="150px">
        <img src={helpandsupport} alt="Help Icon" />
        Help&Support
      </div>

    </Container>
   <div className={edit.buttoncontainer}>
      <div className={edit.buttonlarge}>
        <img src={setting} alt="Settings Icon" />
        Account settings
      </div>
    </div>
   </Container>
    </div>
  );
};

export default Edit;
