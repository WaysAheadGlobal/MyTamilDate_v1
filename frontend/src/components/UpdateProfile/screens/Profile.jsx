import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import Sidebar from '../../userflow/components/sidebar/sidebar';
import profile from './updateprofile.module.css'; 
import ProgressCircle from '../../ProgressCircle';
import ProfileProgress from './ProfileCompletations/ProgressProfile';
import editicon from '../../../assets/images/editicon.png';
import Edit from './Edit/Edit';
import Preview from './Preview/Preview';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../api';
import { useCookies } from '../../../hooks/useCookies';
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const[profileCompletion, setProfileCompletion] = useState(10)
  const[Profile, setProfileData] = useState({});
  const{getCookie} = useCookies();
const Navigate = useNavigate();
  const completion = 40;
  const id = getCookie('userId')
  const OldImageURL = 'https://data.mytamildate.com/storage/public/uploads/user';
  const [images, setImages] = useState({
    main: null,
    first: null,
    second: null,
  });

  const [images2, setImages2] = useState({
    main: null,
    first: null,
    second: null,
  });

  const ImageURL = async () => {
    try {
      const response = await fetch(`${API_URL}/customer/update/media`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getCookie('token')}`
      }
      });
      const data = await response.json();
      console.log("datadaa", data);
      if (response.ok) {
        if (data[0].type === 31 || data[1].type === 31 || data[2].type === 31) {
          const others = data.filter(image => image.type === 32);
          const main = data.filter(image => image.type === 31)[0];
       
          setImages2({
            main: API_URL + "media/avatar/" + main.hash + "." + main.extension,
            first: API_URL + "media/avatar/" + others[0].hash + "." + others[0].extension,
            second: API_URL + "media/avatar/" + others[1].hash + "." + others[1].extension,
          })


          console.log('imges', {
            main: API_URL + "media/avatar/" + main.hash + "." + main.extension,
            first: API_URL + "media/avatar/" + others[0].hash + "." + others[0].extension,
            second: API_URL + "media/avatar/" + others[1].hash + "." + others[1].extension,
          })
        }
        else{
          const others = data.filter(image => image.type === 2);
          const main = data.filter(image => image.type === 1)[0];
          console.log(others, main)
          setImages2({
            main: OldImageURL +"/" + id + "/avatar/"+ main.hash + "-large" + "." + main.extension,
            first: OldImageURL +"/" + id + "/photo/"+ others[0].hash + "-large" + "." + main.extension,
            second: OldImageURL +"/" + id + "/photo/"+ others[1].hash  + "-large"+ "." + main.extension,
          })

          console.log({
            main: OldImageURL +"/" + id + "/avatar/"+ main.hash + "-large" + "." + main.extension,
            first: OldImageURL +"/" + id + "/photo/"+ others[0].hash + "-large" + "." + main.extension,
            second: OldImageURL +"/" + id + "/photo/"+ others[1].hash  + "-large"+ "." + main.extension,
          })
    
        }

      }
    } catch (error) {
      console.error('Error saving images:', error);
    }
  }

  const GetprofileCompletion = async()=>{
     try{
      const response = await fetch(`${API_URL}/customer/update/profileCompletion`,
        {
          method : 'GET',
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`
        }
      }
    );
    const data = await response.json();

    if(response.ok){
      setProfileCompletion(data.completionPercentage);
      console.log(profileCompletion);
    }
     }
     catch(err){
      console.log(err);
     }
  }

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

  useEffect(() => {
    ImageURL();
    GetprofileCompletion();
    ProfileDetails();
  }, []);
  
  return (
    <Sidebar>
      <div style={{
        flex: "1",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflowY: "auto",
        scrollbarWidth: "none",
        padding : "2rem"
      }}>
        <div className={profile.profilemaincontainer}>
          
          <div className={profile.maincontainer}>
            {/* <ProfileProgress completion={completion} profilepic={images2.main} /> */}
            <div className={profile.imgContainer} style={{
                        "--profile-completed": `${profileCompletion}%`
                    }}>
                        <div className={profile.innerCircle}>
                            <img className={profile.profilepicimg} src={images2.main} alt="" />
                        </div>
                    </div>
            <Image style={{ marginTop: "90px", width: "24px", height: "24px" }} onClick={()=> Navigate("/editpicture")} src={editicon} />
          </div>
          <div className=" row d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <p style={{ fontSize: '18px', color: "#515151" }}>{Profile.Name} {Profile.Surname}</p>
              <p style={{ fontSize: '14px', color: "#6C6C6C" }}>  {profileCompletion}% complete</p>
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
