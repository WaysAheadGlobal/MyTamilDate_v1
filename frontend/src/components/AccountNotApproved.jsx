import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from "../assets/images/MTDlogo.png";
import logo2 from "../assets/images/logo2.png";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';
import notApproved from "../assets/images/not-approved.png";
import { API_URL } from '../api';
import { useCookies } from '../hooks/useCookies';
import { useNavigate } from 'react-router-dom';

export default function AccountNotApproved() {
    const { getCookie } = useCookies();
    const [data, setData] = useState(null);
const Navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/customer/users/latestrejection`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
            });

            const data = await response.json();
            setData(data);
            console.log(data);
        })()
    }, [])

    return (
        <div className='job-container'>
            {/* <div className='job-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div> */}
            <Container className='job-main'>
                <Container className='job-content' style={{
                    gap : "0px",
                    height : "95dvh"
                }}>
                    <Container className='logo-progressbar10'>
                        <Container className='logo-arrow10'>
                            <Image src={logo2} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                    </Container>
                    <div style={{
                        
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        marginTop: "-34px"
                    }}>
                        <img src={notApproved} alt="not-approved" />
                        <div>
                            
                        </div>
                        <p style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            textAlign: "center",
                            marginTop : "-20px"
                        }}>Sorry, we can’t approve your profile just yet.</p>
                        
                        <p style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "20px",
                            textAlign: "center",
                            fontFamily: "Inter, sans-serif",
                            color: "#6c6c6c"
                        }}>
                            We're excited to help you find your perfect match! But we need a few more details to approve your profile. Please update the following information.
                        </p>
                    </div>

                   
                       {data && (
                            <p style={{
                               
                                marginBottom: "1rem",
                                fontSize :"16px",
                                fontWeight : "500",
                                textAlign :"center",
                               
                                padding : "12px",
                                borderRadius : "16px"
                            }}>
                               Hi there! Having a complete profile helps you connect better with others. Please complete your bio and add real images which clearly show your face.

                            </p>
                        )}

                        {/* <button className='global-next-btn' onClick={()=> Navigate("/updateprofile")}>
                            Update
                        </button> */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "auto",
                        marginBottom: "3rem",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                color: "#4e1173",
                                fontSize :"16px"
                            }}
                        >Almost there!</p>
                        
                        <p style={{
                            marginTop: "1em",
                            fontSize : "16px"
                        }}>
                            Have questions? Contact us at hello@myTamilDate.com
                        </p>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
