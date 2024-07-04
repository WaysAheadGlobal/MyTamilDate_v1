import 'bootstrap/dist/css/bootstrap.min.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { Image } from 'react-bootstrap';
import c1 from '../assets/images/c1.png';
import c2 from '../assets/images/c2.png';
import c3 from '../assets/images/c3.png';
import './pic-text.css';

gsap.registerPlugin(ScrollTrigger);

export const Pictext = () => {
    const picTextMainRef = useRef(null);
    const entryRefs = useRef([]);

    //    useEffect(() => {
    //     const entries = entryRefs.current;

    //     entries.forEach((entry, index) => {
    //         let entryMeta = entry.querySelector('.pic1');
    //         let entryMedia = entry.querySelector('.text1');

    //         console.log('Entry Meta:', entryMeta);
    //         console.log('Entry Media:', entryMedia);

    //         let tl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: entry,
    //                 start: 'top 20%',
    //                 end: 'bottom 90%',
    //                 scrub: true,
    //                 markers: true
    //             }
    //         });

    //         tl.fromTo(entryMeta, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 });
    //         tl.fromTo(entryMedia, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1 }, '<');
    //     });
    // }, []);

    return (
        <div className='pic-text-main' ref={picTextMainRef}>
            <div className='pic1-text1 lineht ani' style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '4rem',
                marginTop: "1.8rem",
                backgroundColor: "white"
            }} ref={el => entryRefs.current[0] = el}>
                <div className='pic1' style={{
                    width: "auto"
                }}>
                    <Image src={c1} className='c1' alt="Image 1" style={{
                        width: '24rem',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
                </div>
                <div className='text1' style={{
                    maxWidth: '30rem',
                }}>
                    <h4><span className='discover-love'>Discover Love </span> with myTamilDate</h4>
                    <p style={{
                        lineHeight: '36px'
                    }}>A surprise engagement at a myTamilDate couple's photoshoot! Find out how <span style={{ color: '#4E1173' }} className='abi-john'>Abi & John</span> Bonded Over Faith & Their Tamil-German-British Connection.</p>
                    <a href='https://tamilculture.com/mytamildate-success-abi-john-bonded-over-faith-their-tamil-german-british-connection' className='view-success-btn' style={{ alignSelf: "center" }}>View Success Story</a>
                </div>
            </div>

            <div className='pic3-text3 ani' style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '4rem',
                marginTop: "1rem"
            }} ref={el => entryRefs.current[1] = el}>
                <div className='text1' style={{
                    maxWidth: '30rem',
                }}>
                    <h4>Meet like-minded people from your community</h4>
                    <p style={{
                        lineHeight: '36px'
                    }}>Connect with individuals in your local Tamil community who share similar interests, values, and cultural backgrounds, fostering a sense of belonging.</p>
                </div>
                <div className='pic1' style={{
                    width: "auto"
                }}>
                    <Image src={c2} className='c1' alt="Image 2" style={{
                        width: '24rem',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
                </div>
            </div>

            <div className='pic1-text1 ani' style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '4rem',
                marginTop: "1rem",
                backgroundColor: "white"
            }} ref={el => entryRefs.current[2] = el}>
                <div className='pic1' style={{
                    width: "auto"
                }}>
                    <Image src={c3} className='c1' alt="Image 3" style={{
                        width: '24rem',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
                </div>
                <div className='text1' style={{
                    maxWidth: '30rem',
                }}>
                    <h4>Discover meaningful connections</h4>
                    <p style={{
                        lineHeight: '36px'
                    }}>Build deep and meaningful relationships with others who understand and appreciate your Tamil heritage, creating bonds that go beyond superficial interactions.</p>
                </div>
            </div>
        </div>
    );
}

