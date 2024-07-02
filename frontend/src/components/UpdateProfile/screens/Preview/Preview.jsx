import React, { useState } from 'react';
import prev from './Preview.module.css';
import { Carousel, Container } from 'react-bootstrap';
import profilepic from '../../../../assets/images/profilepic.png';
import Heightpre from '../../../../assets/images/Heightpre.png';

import educationpre from '../../../../assets/images/educationpre.png';
import Namaste from '../../../../assets/images/Namaste.png';
import languagepre from '../../../../assets/images/languagepre.png';
import Familypre from '../../../../assets/images/Familypre.png';


import { Image } from 'react-bootstrap';
import Sidebar from '../../../userflow/components/sidebar/sidebar';
import { useNavigate } from 'react-router-dom';
import Basics from '../../Components/mybasics/Basics';

const Preview = () => {
  const [activeTab, setActiveTab] = useState('preview');
  const Navigate = useNavigate();
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

        <div>
        <div className={prev.previewContainer}>

          <div className={prev.carouselContainer}>
            <Carousel  interval={3000} pause='hover' indicators={true} controls={false}>
              <Carousel.Item>
                <Image src={profilepic} rounded className={prev.carouselImage} />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={profilepic} rounded className={prev.carouselImage} />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={profilepic} rounded className={prev.carouselImage} />
              </Carousel.Item>
            </Carousel>
          </div>

          <div>
             <div className={prev.editpreview}>
              <div
                className={`${prev.tab} ${activeTab === 'edit' ? prev.active : ''}`}
                onClick={() => Navigate("/updateprofile")}
              >
                Edit
              </div>
              <div
                className={`${prev.tab} ${activeTab === 'preview' ? prev.active : ''}`}
                onClick={() => Navigate("/preview")}
              >
                Preview
              </div>
            </div>
          </div>

           <div className={prev.namelocation}>

            <p className={prev.name}>Kartik Akka</p>
            <p className={prev.location}>
              Tamil Nadu, India
            </p>
           </div>

           <div style={{marginTop : "20px"}}>
            <p className={prev.name}>I get along best with people who</p>
            <p className={prev.location}>
            Can have a good laugh together and understand each other's humor
            </p>
           </div>
          
            
             <div className={prev.basicsdetailscontainer}>

             <p className={prev.headingpre}>My Basics</p>
           <div className={prev.detailboxes} >
            <Basics icon={Heightpre} detail="6'1"/>
            <Basics icon={educationpre} detail="Master"/>
            <Basics icon={Namaste} detail="Hindu"/>
            <Basics icon={languagepre} detail="English,Hindu"/>
            <Basics icon={Familypre} detail="Want Children"/>
            </div>
            </div>


            <div className={prev.basicsdetailscontainer} >

              <p className={prev.headingpre}>About</p>
              <p className={prev.name} style={{marginTop : "15px"}}>A life goal of mine</p>
             <p className={prev.location}> Fueled by a deep love for nature,
               I strive to leave the world a more beautiful place, 
              where future generations can experience its wonders</p>
            </div>

            <div className={prev.Personality}>
            <p className={prev.headingpre}>Personality</p>
            <div>

<div style={{margin : "auto" }}>


               <div style={{display : "flex", flexWrap : "wrap", gap : "10px", marginTop : "20px"}}>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              </div>
              </div>

              
            </div>
            </div>

            <div className={prev.Personality}>
            <p className={prev.headingpre}>Interests</p>
            <div>

<div style={{margin : "auto" }}>


               <div style={{display : "flex", flexWrap : "wrap", gap : "10px", marginTop : "20px"}}>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              <div className={prev.Personalityactivist}>
                <p className={prev.Personalitytext}>Activist</p>
              </div>
              </div>
              </div>              
            </div>
            </div>

        </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Preview;
