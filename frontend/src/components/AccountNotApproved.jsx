import React from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from "../assets/images/MTDlogo.png";
import responsivebg from "../assets/images/responsive-bg.png";
import './job-title.css';

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
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_778_7159)">
                                <path d="M32 0C14.328 0 0 14.328 0 32C0 49.672 14.328 64 32 64C49.672 64 64 49.672 64 32C64 14.328 49.672 0 32 0ZM32 8C37.18 8 41.946 9.688 45.868 12.484L12.476 45.86C9.68 41.938 8 37.172 8 32C8 18.766 18.766 8 32 8ZM32 56C26.82 56 22.054 54.312 18.132 51.516L51.524 18.14C54.32 22.062 56 26.828 56 32C56 45.234 45.234 56 32 56Z" fill="#515151" />
                            </g>
                            <defs>
                                <clipPath id="clip0_778_7159">
                                    <rect width="64" height="64" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <p style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            lineHeight: "36px",
                            textAlign: "center",
                        }}>Oops!</p>
                        <p style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "20px",
                            textAlign: "center",
                        }}>Sorry! Your profile approval request has been denied by the administrator. We are unable to approve your profile at this time as it lacks necessary information. Please update the required details for approval. An email has been sent to you regarding this.</p>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "auto",
                        marginBottom: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <p>Chat and help support</p>
                        <p style={{
                            background: "linear-gradient(180deg, #FC8C66 -4.17%, #F76A7B 110.42%)",
                            backgroundClip: "text",
                            color: "transparent",
                            fontWeight: "bold",
                        }}>hello@mytamildate.com</p>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
