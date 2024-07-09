import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import arrow from '../assets/images/arrow.png';
import c1 from '../assets/images/lp1.png';
import c2 from '../assets/images/lp2.png';
import c3 from '../assets/images/lp3.png';
import './pic-text.css';

export const Pictext = () => {
    const picTextMainRef = useRef(null);
    const entryRefs = useRef([]);

    const [mobile, setMobile] = useState(false);


    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobile(true);
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        });
    }, [])

    return (
        <div className='pic-text-main' style={{
            paddingInline: '2rem',
        }} ref={picTextMainRef}>
            <div className='pic1-text1 lineht ani' style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: "1.8rem",
                backgroundColor: "white"
            }} ref={el => entryRefs.current[0] = el}>
                <div className='pic1' style={{
                    width: "auto",
                    position: 'relative'
                }}>
                    {
                        mobile && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '6rem'
                            }}>
                                <h4><span className='discover-love' style={{
                                    fontFamily: "PT serif, sans-serif",
                                }}>Discover Love with</span></h4>
                                <h4 style={{
                                    background: 'linear-gradient(360deg, #F87077 0%, #FB8968 100%)',
                                    color: 'transparent',
                                    backgroundClip: 'text',
                                    fontFamily: "PT serif, sans-serif",
                                }}>myTamilDate</h4>
                                <img src={arrow} alt="Arrow" width={200} height={200} style={{ position: "absolute", top: "1.5rem" }} />
                            </div>
                        )
                    }
                    <Image src={c1} className='c1' alt="Image 1" style={{
                        width: '24rem',
                        height: '100%',
                        objectFit: 'cover',
                        paddingInline: '1rem'
                    }} />
                </div>
                <div className='text1' style={{
                    maxWidth: '30rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    {
                        !mobile && (
                            <>
                                <h4><span className='discover-love' style={{
                                    fontFamily: "PT serif, sans-serif",
                                }}>Discover Love with</span></h4>
                                <h4 style={{
                                    background: 'linear-gradient(360deg, #F87077 0%, #FB8968 100%)',
                                    color: 'transparent',
                                    backgroundClip: 'text',
                                    marginBottom: '4rem',
                                    fontFamily: "PT serif, sans-serif",
                                }}>myTamilDate</h4>
                                <img src={arrow} alt="Arrow" width={200} height={200} style={{ position: "absolute", top: "1.5rem" }} />
                            </>
                        )
                    }
                    <p style={{
                        lineHeight: '26px',
                        marginTop: '1rem'
                    }}>A surprise engagement at a myTamilDate couple's photoshoot! Find out how <span style={{ color: '#4E1173', fontWeight: "bold" }}>Abi & John</span> Bonded Over Faith & Their Tamil-German-British Connection.</p>
                    <a href='https://tamilculture.com/mytamildate-success-abi-john-bonded-over-faith-their-tamil-german-british-connection' className='view-success-btn' style={{ alignSelf: "center", marginTop: "1rem" }}>View Success Story</a>
                </div>
            </div>

            <div className='pic3-text3 ani' style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: "1rem"
            }} ref={el => entryRefs.current[1] = el}>
                <div className='text1' style={{
                    maxWidth: '30rem',
                }}>
                    <h4>Meet like-minded people from your community</h4>
                    <p style={{
                        lineHeight: '26px'
                    }}>Connect with individuals in your local Tamil community who share similar interests, values, and cultural backgrounds, fostering a sense of belonging.</p>
                </div>
                <div className='pic1' style={{
                    width: "auto"
                }}>
                    <Image src={c2} className='c1' alt="Image 2" style={{
                        width: '24rem',
                        height: '100%',
                        objectFit: 'cover',
                        paddingInline: '1rem'
                    }} />
                </div>
            </div>

            <div className='pic1-text1 ani' style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: "1rem",
                backgroundColor: "white"
            }} ref={el => entryRefs.current[2] = el}>
                <div className='pic1' style={{
                    width: "auto"
                }}>
                    <Image src={c3} className='c1' alt="Image 3" style={{
                        width: '24rem',
                        height: '100%',
                        objectFit: 'cover',
                        paddingInline: '1rem'
                    }} />
                </div>
                <div className='text1' style={{
                    maxWidth: '30rem',
                }}>
                    <h4>Discover meaningful connections</h4>
                    <p style={{
                        lineHeight: '26px'
                    }}>Build deep and meaningful relationships with others who understand and appreciate your Tamil heritage, creating bonds that go beyond superficial interactions.</p>
                </div>
            </div>
        </div>
    );
}

