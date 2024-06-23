
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/images/l-bg.png";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';


export const GetStarted = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = React.useState(false);
  const goToBasicDetails = () => {
    navigate("/basicdetails");
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    })
  }, [])

  return (
    <div className='job-container'>
      <div className='job-bg' style={{
        display: mobile ? "none" : "block"
      }}>
        <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
      </div>
      <div style={{
        position: "relative"
      }}>
        <div className='job-bg' style={{
          display: "block",
          height: mobile ? "100vh" : "auto",
        }}>
          <Image className='responsive-bg' src={bg} alt="Background"></Image>
        </div>
        <div style={{
          position: "absolute",
          top: "40%",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "700",
            lineHeight: "46.8px",
            letterSpacing: "1.4px",
            textAlign: "center"
          }}>Welcome to myTamilDate!</h1>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "16.8px",
              letterSpacing: "2px",
              textAlign: "center"
            }}
          >Amazing people join MTD everyday, and one could be your perfect match!</p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "16.8px",
              letterSpacing: "2px",
              textAlign: "center"
            }}
          >A detailed, authentic & complete profile increases your chances of finding meaningful connections.</p>
          <Button style={{
            width: "60%",
            marginTop: "1rem",
            background: "linear-gradient(180deg, #FC8C66 -4.17%, #F76A7B 110.42%)",
            border: "none",
            borderRadius: "9999px",
            padding: "0.75rem",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
            onClick={goToBasicDetails}
          >
            Let&apos;s get to know you {">>"}
          </Button>
        </div>
      </div>
    </div>
  )
}