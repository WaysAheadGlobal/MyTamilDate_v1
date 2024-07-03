import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import picture from './pictureedit.module.css';
import questionmark from '../../../../assets/images/questionmark.png';
import Sidebar from '../../../userflow/components/sidebar/sidebar';
import profilepic from '../../../../assets/images/profilepic.png';
import deleteicon from '../../../../assets/images/deleteicon.png'
import editlogo from '../../../../assets/images/editlogo.png'
const EditPicture = () => {
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfoVisibility = () => {
    setShowInfo(!showInfo);
  };

  return (
    <Sidebar>
      <div style={{
        flex: "1",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflowY: "auto",
        scrollbarWidth: "none"
      }}>
        <div className={picture.container}>
          <p className={picture.componentname}>Update Your Profile</p>
          <Image
            onClick={toggleInfoVisibility}
            style={{  cursor: 'pointer' }}
            width="24px"
            height="24px"
            src={questionmark}
          />
          <Container className={`${picture.whyInfo} ${showInfo ? picture.show : picture.hide}`}>
            <p>
              Any changes made to the "About Me" section will be sent for Admin review and approval. 
              Your account will be in a pending status until it gets approved. 
              You should receive an update within 24 hours. If not, please reach 
              out to hello@mytamildate.com. Thank you for your patience!
            </p>
          </Container>
        </div>
        <div className={picture.mainpic} style={{ borderradius: "16px"}}>
          <Image src={profilepic}  />
          <div className={picture.icons}>
            <span className={picture.iconLeft}><Image width="16px" height="16px" src={deleteicon}/></span>
            <span className={picture.iconRight}><Image src={editlogo}/></span>
          </div>
          <div>
            <p className={picture.pictype}>Main</p>
          </div>
        </div>
        <div className={picture.twopiccontainer}>
          <div className={picture.restpicture}>
            <Image src={profilepic} />
            <div className={picture.icons}>
              <span className={picture.iconLeft}><Image src={deleteicon}/></span>
              <span className={picture.iconRight}><Image src={editlogo}/></span>
            </div>
          </div>
          <div className={picture.restpicture}>
            <Image src={profilepic} />
            <div className={picture.icons}>
              <span className={picture.iconLeft}><Image src={deleteicon}/></span>
              <span className={picture.iconRight}><Image src={editlogo}/></span>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default EditPicture;
