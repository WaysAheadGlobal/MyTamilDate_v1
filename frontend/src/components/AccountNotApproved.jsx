import React from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from "../assets/images/MTDlogo.png";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';
import notApproved from "../assets/images/not-approved.png";

export default function AccountNotApproved() {
    return (
        <div className='job-container'>
            <div className='job-bg'>
                <Image className='responsive-bg' src={responsivebg} alt="Background"></Image>
            </div>
            <Container className='job-main'>
                <Container className='job-content'>
                    <Container className='logo-progressbar10'>
                        <Container className='logo-arrow10'>
                            <Image src={logo} alt="Logo" className='logo' style={{ backgroundColor: 'transparent' }} />
                        </Container>
                    </Container>
                    <div style={{
                        marginTop: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                    }}>
                        <img src={notApproved} alt="not-approved" />
                        <p style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            textAlign: "center",
                        }}>We can't approve your profile just yet!</p>
                        <p style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "20px",
                            textAlign: "center",
                            fontFamily: "Inter, sans-serif",
                            color: "#6c6c6c"
                        }}>
                            Sorry! Your profile approval request has been denied by the administrator. We are unable to approve your profile at this time as it lacks necessary information. Please update the required details for approval. An email has been sent to you regarding this.
                        </p>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "auto",
                        marginBottom: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                color: "#4e1173"
                            }}
                        >Almost there!</p>
                        <p style={{
                            marginTop: "1em"
                        }}>
                            Your profile is under review, but we need a bit more information.
                        </p>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
