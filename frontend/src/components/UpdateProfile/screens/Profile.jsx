import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import Sidebar from '../../userflow/components/sidebar/sidebar';
import profile from './updateprofile.module.css'; 
import ProgressCircle from '../../ProgressCircle';
import ProfileProgress from './ProfileCompletations/ProgressProfile';
import editicon from '../../../assets/images/editicon.png';
import Edit from './Edit/Edit';
import Preview from './Preview/Preview';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState('edit');
const Navigate = useNavigate();
  const completion = 40;

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
        <div className={profile.profilemaincontainer}>
          
          <div className={profile.maincontainer}>
            <ProfileProgress completion={completion} />
            <Image style={{ marginTop: "90px", width: "24px", height: "24px" }} src={editicon} />
          </div>

          <div className="row d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <p style={{ fontSize: '18px', color: "#515151" }}>Mandeep</p>
              <p style={{ fontSize: '14px', color: "#6C6C6C" }}>{completion}% profile complete</p>
            </div>

            <div className={profile.editpreview}>
              <div
                className={`${profile.tab} ${activeTab === 'edit' ? profile.active : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </div>
              <div
                className={`${profile.tab} ${activeTab === 'preview' ? profile.active : ''}`}
                onClick={() => Navigate("/preview")}
              >
                Preview
              </div>
            </div>

            <div>
             <Edit/>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UpdateProfile;
