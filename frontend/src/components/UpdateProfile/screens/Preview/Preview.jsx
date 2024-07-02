import React, { useState } from 'react';
import prev from './Preview.module.css';
import { Carousel, Container } from 'react-bootstrap';
import profilepic from '../../../../assets/images/profilepic.png';
import { Image } from 'react-bootstrap';
import Sidebar from '../../../userflow/components/sidebar/sidebar';
import { useNavigate } from 'react-router-dom';

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
        <div className={prev.previewContainer}>

          <Container className={prev.carouselContainer}>
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
          </Container>

          <Container>
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
          </Container>
           <Container className={prev.namelocation}>

            <p className={prev.name}>Kartik Akka</p>
            <p className={prev.location}>
              Tamil Nadu, India
            </p>
           </Container>
           <Container style={{marginTop : "20px"}}>
            <p className={prev.name}>I get along best with people who</p>
            <p className={prev.location}>
            Can have a good laugh together and understand each other's humor
            </p>
           </Container>

        </div>
      </div>
    </Sidebar>
  );
};

export default Preview;
