import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Container, Image } from 'react-bootstrap';

import '../../../.././job-title.css';

import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../../api';
import { useCookies } from '../../../../../hooks/useCookies';
import Sidebar from '../../../../userflow/components/sidebar/sidebar';

const kidsOptions = [
    "Don't have kids",
    "Have children",
    "Prefer not to say"
]

const familyOptions = [
    "Don't have family",
    "Want children",
    "Open to children",
    "Prefer not to say"
]

export default function KidsUpdate() {
    const [selectedHaveKids, setSelectedHaveKids] = useState(null);
    const [selectedWantKids, setSelectedWantKids] = useState(null);
    const { getCookie } = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/customer/users/kids-family`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                },
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setSelectedHaveKids(kidsOptions[data.have_kid_id - 1]);
                setSelectedWantKids(familyOptions[data.want_kid_id - 1]);
            }
        })()
    }, [])

    async function saveHaveKids() {
        const response = await fetch(`${API_URL}/customer/users/update-have-kids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({ have_kid_id: kidsOptions.indexOf(selectedHaveKids) + 1 }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error('Error saving have kids');
        }
    }

    async function saveWantKids() {
        const response = await fetch(`${API_URL}/customer/users/update-want-kids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({ want_kid_id: familyOptions.indexOf(selectedWantKids) + 1 }),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error('Error saving want kids');
        }
    }

    async function saveAll() {
        try {
            await Promise.all([saveHaveKids()]);
            navigate('/updateprofile');
        } catch (error) {

            console.error('Error saving kids and family:', error);
        }
    }

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
   
        <div className='job-container'>
          
            <Container className='job-main'>
                <Container className='job-content'>
                    <Container className='job-details'>
                        <div className='your-job'>
                            <Container className='job-text'>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" fill="#4E1173" />
                                    <g clip-path="url(#clip0_969_9145)">
                                        <path d="M18.3984 15.809C18.3359 15.7777 18.2734 15.7777 18.2109 15.7777C17.9922 15.7777 17.7734 15.9027 17.6797 16.1527C17.6172 16.2777 17.6172 16.434 17.6797 16.5902C17.7422 16.7152 17.8672 16.8402 17.9922 16.8715C18.1172 16.934 18.2734 16.934 18.4297 16.8715C18.5547 16.809 18.6797 16.684 18.7422 16.559C18.8359 16.2152 18.6797 15.9027 18.3984 15.809ZM21.8359 16.0277C21.7734 15.9965 21.7109 15.9965 21.6484 15.9965C21.5547 15.9965 21.4922 16.0277 21.4297 16.059C21.3047 16.1215 21.1797 16.2465 21.1484 16.3715C21.0547 16.6527 21.1797 16.9652 21.4922 17.0902C21.7734 17.184 22.0859 17.059 22.2109 16.7465C22.2734 16.5902 22.2734 16.4652 22.2109 16.309C22.0859 16.184 21.9609 16.0902 21.8359 16.0277ZM20.3047 17.8402C20.2109 17.8402 20.1484 17.8715 20.0859 17.934C19.8984 18.1527 19.6797 18.2465 19.3359 17.9652C19.2109 17.8715 19.0234 17.9027 18.8984 18.0277C18.8047 18.1527 18.8359 18.3402 18.9609 18.4652C19.5234 18.9027 20.0859 18.8402 20.5234 18.3402C20.6484 18.2152 20.6172 18.0277 20.4922 17.9027C20.4297 17.8715 20.3672 17.8402 20.3047 17.8402Z" fill="white" />
                                        <path d="M14.3047 11.9019L14.5234 13.4957L14.5234 13.5582L15.1797 15.5582C15.0859 15.7769 15.1172 16.0269 15.2109 16.2457C15.3047 16.4644 15.4922 16.6207 15.7109 16.7144C15.7734 18.0269 16.5234 19.2144 17.6797 19.9332C17.6484 21.3394 17.3984 22.4019 17.0234 22.9332L17.0234 22.9644C17.0234 22.9644 17.0234 22.9957 16.9922 22.9957L15.4609 26.2457C15.3984 26.4019 15.4609 26.5582 15.5859 26.6207L14.5859 28.4957C14.5234 28.6519 14.4922 28.8082 14.4922 28.9332C14.4922 29.3394 14.7422 29.7144 15.1172 29.9019C15.3672 30.0269 15.6484 30.0269 15.9297 29.9332C16.2109 29.8394 16.3984 29.6519 16.5234 29.4019L17.5234 27.5269C17.6172 27.5582 17.7422 27.4957 17.8047 27.4332C18.0859 27.0894 18.4922 26.7457 19.0547 26.3707C19.7422 25.9332 20.6172 25.9644 21.2422 26.4644C21.8359 26.9332 22.4297 27.4644 22.4297 27.4644C22.4922 27.5269 22.6172 27.5582 22.7109 27.5269L23.7109 29.3707C23.8359 29.6207 24.0547 29.8394 24.3047 29.9332C24.5859 30.0269 24.8672 30.0269 25.1172 29.9019C25.4922 29.7144 25.7422 29.3394 25.7422 28.9332C25.7422 28.7769 25.7109 28.6207 25.6484 28.4644L24.6484 26.6207C24.6797 26.5894 24.7422 26.5269 24.7422 26.4957C24.7734 26.4332 24.7734 26.3394 24.7422 26.2769L23.1172 22.9957C23.1172 22.9957 22.5234 21.5894 22.4609 19.8394C23.0234 19.4332 23.4609 18.8394 23.7109 18.1832C23.7734 18.0269 23.8672 17.7457 23.9297 17.4957C24.2109 17.4332 24.4609 17.2144 24.5859 16.9332C24.6484 16.8082 24.6484 16.6832 24.6484 16.5582C24.6797 16.5582 24.6797 16.5269 24.7109 16.5269C24.7734 16.4644 24.8359 16.3707 24.8359 16.2769C24.8359 16.2457 24.8359 15.9644 24.7734 15.6207L24.7734 15.5894L25.4297 13.5894L25.4297 13.5269L25.6797 11.9332C25.8359 11.4332 25.5859 10.8707 25.0547 10.6832C24.9297 10.6519 24.8359 10.6207 24.7109 10.6207C24.4609 10.6207 24.1797 10.7144 23.9922 10.9019C23.8984 10.9957 23.8047 11.1207 23.7422 11.2769L23.7422 11.3394L23.4922 12.8707C22.3047 11.3082 20.0859 10.1207 19.9922 10.0582C19.9922 9.99567 19.9297 9.99567 19.8672 9.99567C19.7734 9.99567 19.7109 10.0269 19.6484 10.0894C19.5547 10.1832 17.5234 12.2457 16.5859 13.3707L16.4609 12.9644L16.2109 11.3394L16.2109 11.2769C16.1484 11.1207 16.0859 10.9957 15.9609 10.9019C15.7734 10.7144 15.5234 10.6207 15.2422 10.6207C15.1172 10.6207 15.0234 10.6519 14.8984 10.6832C14.6484 10.7769 14.4297 10.9644 14.3359 11.2144C14.2422 11.4019 14.2109 11.6832 14.3047 11.9019ZM15.9609 29.1207C15.8984 29.2457 15.8047 29.3082 15.7109 29.3707C15.5859 29.4019 15.4609 29.4019 15.3672 29.3707C15.2109 29.3082 15.0859 29.1207 15.0859 28.9644C15.0859 28.9019 15.0859 28.8394 15.1172 28.7769L16.1172 26.9019L16.4922 27.0894L16.9297 27.3082L15.9609 29.1207ZM25.1172 28.9332C25.1172 29.1207 25.0234 29.2769 24.8359 29.3394C24.8047 29.3707 24.7422 29.4019 24.6797 29.4019C24.6172 29.4019 24.5859 29.4019 24.5234 29.3707C24.3984 29.3394 24.3047 29.2457 24.2422 29.1207L23.2422 27.2769L24.0859 26.8707L25.0859 28.7457C25.1172 28.8082 25.1172 28.8707 25.1172 28.9332ZM23.8984 26.3082L22.7109 26.8707L22.6797 26.8707C22.4609 26.6832 22.0547 26.3082 21.6172 25.9644C20.7734 25.2769 19.6172 25.2457 18.7109 25.8394C18.2109 26.1832 17.7734 26.5269 17.4922 26.8394L16.1484 26.2144L17.4609 23.4332L22.6484 23.4019L24.0547 26.2457L23.8984 26.3082ZM22.4297 22.8082L17.8047 22.8082C18.1172 22.0894 18.2422 21.1207 18.3047 20.2457L18.4922 20.3394L18.5234 20.3394C18.9297 20.4957 19.3359 20.5582 19.7422 20.5894C20.5234 20.6519 21.2422 20.4644 21.8672 20.1519C21.9609 21.3394 22.2422 22.2769 22.4297 22.8082ZM24.0234 16.6519C23.9609 16.7769 23.8359 16.8707 23.6797 16.8707C23.5234 16.8707 23.3984 16.9644 23.3672 17.1207C23.3359 17.3082 23.2422 17.6832 23.1484 17.9332C22.6484 19.2769 21.2734 20.0894 19.7734 19.9957C19.3984 19.9644 19.0547 19.9019 18.7109 19.7769C18.6797 19.7769 18.6797 19.7769 18.6484 19.7457C17.2422 19.2144 16.2734 17.9019 16.2734 16.4957C16.2734 16.3394 16.1484 16.2144 15.9922 16.1832C15.9922 16.1832 15.9609 16.1832 15.9297 16.1519C15.7734 16.0894 15.6797 15.9019 15.7422 15.7457L15.7422 15.6832C15.7734 15.6519 15.7734 15.6207 15.8047 15.6207C15.8359 15.5894 15.8984 15.5582 15.9609 15.5269L16.0234 15.5269C16.1172 15.5269 16.2422 15.5269 16.4297 15.4957L16.4609 15.4957C16.5547 15.4644 16.6797 15.4332 16.8047 15.4019C16.8672 15.3707 16.9297 15.3707 17.0234 15.3394L17.0547 15.3394C17.1484 15.3082 17.2109 15.2769 17.3047 15.2457C17.6797 15.0894 18.0859 14.8394 18.6172 14.4957L18.6484 14.4644C18.8047 14.5582 19.0547 14.7144 19.3359 14.8707C19.4297 14.9332 19.5547 14.9644 19.6484 15.0269L19.6797 15.0269C19.7734 15.0582 19.8984 15.1207 20.0234 15.1519L20.0547 15.1519L20.4297 15.2457L20.4922 15.2457C20.6172 15.2769 20.7734 15.3082 20.8984 15.3082C21.0547 15.3394 21.1797 15.3394 21.3359 15.3394L21.7422 15.3394C21.8047 15.3394 21.8359 15.3394 21.8984 15.3082C21.9609 15.3082 21.9922 15.3082 22.0547 15.2769C22.1172 15.2769 22.1797 15.2457 22.2109 15.2457C22.2734 15.2457 22.3047 15.2144 22.3672 15.2144C22.4297 15.2144 22.4922 15.1832 22.5234 15.1832C22.6172 15.3082 22.7422 15.4957 22.9297 15.6519C23.1172 15.8394 23.3672 16.0269 23.6484 16.1832C23.6484 16.1832 23.6797 16.1832 23.6797 16.2144L23.7109 16.2144C24.0234 16.3707 24.0859 16.5269 24.0234 16.6519ZM24.0859 13.1207L24.0859 13.0582L24.3672 11.4332C24.3984 11.3707 24.3984 11.3394 24.4609 11.3082C24.5547 11.2144 24.7422 11.1519 24.8672 11.2144C25.0859 11.2769 25.1797 11.5269 25.1172 11.7144L25.1172 11.7769L24.8672 13.3707L24.4922 14.4644C24.4609 14.3707 24.4297 14.2769 24.3672 14.1832C24.3672 14.1519 24.3359 14.1207 24.3359 14.1207L24.3359 14.0894C24.3359 14.0582 24.3047 14.0582 24.3047 14.0269L24.3047 13.9957C24.2422 13.8707 24.1484 13.7457 24.0859 13.6519C24.0547 13.5894 24.0234 13.5582 23.9922 13.4957L24.0859 13.1207ZM19.9297 10.6832C20.5547 11.0582 22.5859 12.3082 23.3672 13.7144C23.3984 13.8082 23.4922 13.9019 23.5547 13.9957C23.6172 14.0894 23.7109 14.2144 23.7422 14.3082C23.7422 14.3394 23.7734 14.3394 23.7734 14.3707C23.8984 14.5894 23.9609 14.8082 24.0234 15.0269C24.0234 15.0582 24.0234 15.0894 24.0547 15.1207C24.0859 15.1832 24.0859 15.2457 24.1172 15.3082C24.1172 15.3707 24.1484 15.4332 24.1484 15.4644L24.1484 15.7144L24.1172 15.7144C24.1172 15.7144 24.0859 15.7144 24.0859 15.6832C23.8047 15.5269 23.5859 15.3707 23.4297 15.2144C23.1797 14.9332 23.0547 14.7144 23.0547 14.7144C23.0234 14.6519 22.9609 14.5894 22.8984 14.5582C22.8359 14.5269 22.7422 14.5269 22.6797 14.5582C20.6172 15.2769 18.8984 13.8707 18.8984 13.8707C18.8672 13.8394 18.8047 13.8082 18.7422 13.8082L18.6172 13.8082C18.5859 13.8082 18.5547 13.8394 18.5547 13.8394C18.5234 13.8707 18.4922 13.8707 18.4609 13.9019C17.3984 14.6207 16.7109 14.8394 16.3672 14.9019C16.3984 14.8082 16.4297 14.6832 16.4609 14.5894C16.5234 14.4332 16.6172 14.2769 16.7109 14.1207C17.1797 13.4957 19.3359 11.3082 19.9297 10.6832ZM14.8984 11.4332C14.9297 11.3394 15.0234 11.2769 15.1172 11.2144C15.2734 11.1519 15.4297 11.1832 15.5547 11.3082C15.5859 11.3394 15.6172 11.3707 15.6484 11.4332L15.8984 13.0582L15.8984 13.1207L16.1797 13.9644C16.1484 13.9957 16.1484 14.0269 16.1172 14.0894C16.1172 14.1207 16.0859 14.1519 16.0859 14.1832C16.0547 14.2769 15.9922 14.3707 15.9609 14.4332L15.8672 14.7144C15.8672 14.7457 15.8672 14.7769 15.8359 14.7769C15.8047 14.8394 15.8047 14.9332 15.8047 14.9957L15.8047 15.0269L15.7734 15.0269C15.7422 15.0269 15.7109 15.0582 15.7109 15.0582L15.1484 13.4019L14.8984 11.8082L14.8984 11.7457C14.8359 11.6519 14.8359 11.5269 14.8984 11.4332Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_969_9145">
                                            <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <p>What about kids?</p>
                            </Container>
                            <div style={{
                                maxHeight: "50vh",
                                overflow: "auto",
                            }}>
                                <div className="job-columns">
                                    {kidsOptions.map((kid, index) => (
                                        <div
                                            key={index}
                                            className='job-item'
                                            onClick={() => setSelectedHaveKids(kid)}
                                            style={{
                                                backgroundColor: selectedHaveKids === kid ? '#F7ECFF' : 'transparent',
                                            }}
                                        >
                                            {kid}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                    {/* <Container className='job-details'>
                        <div className='your-job'>
                            <Container className='job-text'>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" fill="#4E1173" />
                                    <path d="M14.2416 22.8521H15.3504C15.7747 22.8521 16.1817 22.6765 16.4817 22.3639C16.7818 22.0514 16.9504 21.6274 16.9504 21.1854V19.4729C16.9504 19.0309 16.7818 18.607 16.4817 18.2944C16.1817 17.9818 15.7747 17.8063 15.3504 17.8063H14.2416C13.8172 17.8063 13.4102 17.9818 13.1102 18.2944C12.8101 18.607 12.6416 19.0309 12.6416 19.4729V21.1854C12.6416 21.6274 12.8101 22.0514 13.1102 22.3639C13.4102 22.6765 13.8172 22.8521 14.2416 22.8521ZM13.4416 19.4729C13.4416 19.2519 13.5258 19.0399 13.6759 18.8837C13.8259 18.7274 14.0294 18.6396 14.2416 18.6396H15.3504C15.5625 18.6396 15.766 18.7274 15.916 18.8837C16.0661 19.0399 16.1504 19.2519 16.1504 19.4729V21.1854C16.1504 21.4064 16.0661 21.6184 15.916 21.7747C15.766 21.931 15.5625 22.0187 15.3504 22.0187H14.2416C14.0294 22.0187 13.8259 21.931 13.6759 21.7747C13.5258 21.6184 13.4416 21.4064 13.4416 21.1854V19.4729ZM17.4496 24.9096C17.3647 24.9759 17.258 25.0044 17.153 24.9887C17.048 24.9731 16.9532 24.9147 16.8896 24.8263C16.7503 24.6317 16.5692 24.4739 16.3608 24.3655C16.1524 24.2571 15.9225 24.2011 15.6896 24.2021H13.9024C13.5044 24.2027 13.1229 24.3678 12.8416 24.661C12.5602 24.9542 12.402 25.3517 12.4016 25.7663V26.5363C13.1695 26.8152 13.9823 26.9349 14.7944 26.8888C15.3028 26.9007 15.8113 26.8678 16.3144 26.7904C16.419 26.7719 16.5264 26.7973 16.6129 26.8613C16.6995 26.9252 16.7581 27.0223 16.776 27.1313C16.7938 27.2402 16.7693 27.3521 16.708 27.4423C16.6466 27.5324 16.5534 27.5935 16.4488 27.6121C15.9018 27.6977 15.3489 27.7345 14.796 27.7221C13.7796 27.7877 12.7626 27.6024 11.828 27.1813C11.7602 27.1472 11.703 27.094 11.663 27.0277C11.6229 26.9614 11.6016 26.8846 11.6016 26.8063V25.7663C11.6022 25.1308 11.8448 24.5216 12.2762 24.0723C12.7075 23.623 13.2923 23.3702 13.9024 23.3696H15.6864C16.0436 23.3678 16.3961 23.4535 16.7157 23.6196C17.0353 23.7858 17.313 24.0278 17.5264 24.3263C17.5901 24.4146 17.6176 24.5256 17.6027 24.635C17.5879 24.7444 17.5319 24.8432 17.4472 24.9096H17.4496ZM28.4016 25.7663V26.8063C28.4016 26.8844 28.3806 26.9611 28.3408 27.0274C28.3011 27.0937 28.2442 27.147 28.1768 27.1813C27.2421 27.6024 26.2252 27.7877 25.2088 27.7221C24.6558 27.7345 24.1029 27.6977 23.556 27.6121C23.5042 27.6029 23.4546 27.5832 23.4101 27.554C23.3657 27.5249 23.3271 27.4869 23.2967 27.4423C23.2663 27.3976 23.2447 27.3472 23.233 27.2938C23.2214 27.2404 23.2199 27.1852 23.2288 27.1313C23.2479 27.023 23.3069 26.9268 23.3931 26.8631C23.4793 26.7995 23.586 26.7734 23.6904 26.7904C24.1935 26.8678 24.7019 26.9007 25.2104 26.8888C26.0219 26.9347 26.8342 26.815 27.6016 26.5363V25.7663C27.6009 25.3518 27.4426 24.9546 27.1613 24.6615C26.88 24.3685 26.4986 24.2036 26.1008 24.2029H24.3168C24.0838 24.202 23.8539 24.2579 23.6455 24.3663C23.4371 24.4748 23.256 24.6326 23.1168 24.8271C23.0852 24.8709 23.0458 24.9077 23.0006 24.9356C22.9554 24.9635 22.9053 24.9818 22.8533 24.9896C22.8013 24.9973 22.7484 24.9943 22.6975 24.9807C22.6466 24.9671 22.5988 24.9432 22.5568 24.9104C22.5147 24.8776 22.4793 24.8365 22.4526 24.7894C22.4258 24.7423 22.4082 24.6902 22.4008 24.636C22.3934 24.5818 22.3962 24.5267 22.4093 24.4737C22.4223 24.4207 22.4452 24.3709 22.4768 24.3271C22.6901 24.0287 22.9678 23.7866 23.2874 23.6205C23.607 23.4543 23.9596 23.3687 24.3168 23.3704H26.1008C26.7106 23.3711 27.2954 23.6237 27.7267 24.0728C28.158 24.522 28.4007 25.131 28.4016 25.7663ZM19.6112 20.2787C19.2505 20.2787 18.9045 20.428 18.6495 20.6937C18.3944 20.9594 18.2512 21.3197 18.2512 21.6954V22.9363C18.2512 23.312 18.3944 23.6723 18.6495 23.938C18.9045 24.2037 19.2505 24.3529 19.6112 24.3529H20.392C20.7527 24.3529 21.0986 24.2037 21.3536 23.938C21.6087 23.6723 21.752 23.312 21.752 22.9363V21.6954C21.752 21.3197 21.6087 20.9594 21.3536 20.6937C21.0986 20.428 20.7527 20.2787 20.392 20.2787H19.6112ZM20.952 21.6954V22.9363C20.952 23.091 20.893 23.2393 20.7879 23.3487C20.6829 23.4581 20.5405 23.5196 20.392 23.5196H19.6112C19.4626 23.5196 19.3202 23.4581 19.2152 23.3487C19.1102 23.2393 19.0512 23.091 19.0512 22.9363V21.6954C19.0512 21.5407 19.1102 21.3923 19.2152 21.2829C19.3202 21.1735 19.4626 21.1121 19.6112 21.1121H20.392C20.5405 21.1121 20.6829 21.1735 20.7879 21.2829C20.893 21.3923 20.952 21.5407 20.952 21.6954ZM20.6872 24.8304H19.316C18.822 24.8306 18.3483 25.0351 17.999 25.3988C17.6496 25.7626 17.4532 26.2559 17.4528 26.7704V27.5704C17.4528 27.6487 17.4739 27.7254 17.5138 27.7917C17.5537 27.858 17.6107 27.9113 17.6784 27.9454C18.4088 28.2754 19.2037 28.4211 19.9984 28.3704C20.793 28.4211 21.588 28.2754 22.3184 27.9454C22.386 27.9113 22.443 27.858 22.4829 27.7917C22.5228 27.7254 22.544 27.6487 22.544 27.5704V26.7704C22.5435 26.257 22.348 25.7647 22 25.4012C21.652 25.0376 21.18 24.8324 20.6872 24.8304ZM21.7504 27.2971C21.1868 27.4897 20.5938 27.5711 20.0016 27.5371C19.4094 27.5711 18.8163 27.4897 18.2528 27.2971V26.7704C18.2532 26.4769 18.3654 26.1955 18.5647 25.9881C18.764 25.7806 19.0342 25.664 19.316 25.6638H20.6872C20.9689 25.664 21.2391 25.7806 21.4384 25.9881C21.6378 26.1955 21.7499 26.4769 21.7504 26.7704V27.2971ZM23.0528 21.1854C23.0528 21.6274 23.2213 22.0514 23.5214 22.3639C23.8214 22.6765 24.2284 22.8521 24.6528 22.8521H25.7616C26.1859 22.8521 26.5929 22.6765 26.8929 22.3639C27.193 22.0514 27.3616 21.6274 27.3616 21.1854V19.4729C27.3616 19.0309 27.193 18.607 26.8929 18.2944C26.5929 17.9818 26.1859 17.8063 25.7616 17.8063H24.6528C24.2284 17.8063 23.8214 17.9818 23.5214 18.2944C23.2213 18.607 23.0528 19.0309 23.0528 19.4729V21.1854ZM23.8528 19.4729C23.8528 19.2519 23.937 19.0399 24.0871 18.8837C24.2371 18.7274 24.4406 18.6396 24.6528 18.6396H25.7616C25.9737 18.6396 26.1772 18.7274 26.3272 18.8837C26.4773 19.0399 26.5616 19.2519 26.5616 19.4729V21.1854C26.5616 21.4064 26.4773 21.6184 26.3272 21.7747C26.1772 21.931 25.9737 22.0187 25.7616 22.0187H24.6528C24.4406 22.0187 24.2371 21.931 24.0871 21.7747C23.937 21.6184 23.8528 21.4064 23.8528 21.1854V19.4729ZM19.1776 17.9829C19.4264 18.1387 19.7113 18.2209 20.0016 18.2209C20.2919 18.2209 20.5767 18.1387 20.8256 17.9829C22.8888 16.6963 23.1968 15.3037 23.1968 14.5887C23.2142 14.3262 23.1814 14.0626 23.1002 13.8134C23.019 13.5642 22.891 13.3342 22.7238 13.137C22.5565 12.9397 22.3533 12.7791 22.1259 12.6643C21.8985 12.5496 21.6514 12.4831 21.3992 12.4688C20.8895 12.469 20.3957 12.653 20.0016 12.9896C19.6074 12.653 19.1136 12.469 18.604 12.4688C18.3519 12.4832 18.1051 12.5496 17.8779 12.6641C17.6506 12.7787 17.4475 12.9391 17.2803 13.1361C17.113 13.3331 16.985 13.5627 16.9037 13.8117C16.8223 14.0606 16.7892 14.3239 16.8064 14.5863C16.8064 15.3038 17.1144 16.6963 19.1776 17.9829ZM18.604 13.3021C18.8091 13.3027 19.0118 13.3496 19.1979 13.4395C19.384 13.5294 19.5493 13.6602 19.6824 13.8229C19.7212 13.8721 19.7701 13.9118 19.8254 13.939C19.8807 13.9662 19.9412 13.9803 20.0024 13.9803C20.0635 13.9803 20.124 13.9662 20.1793 13.939C20.2346 13.9118 20.2835 13.8721 20.3224 13.8229C20.4562 13.6618 20.6215 13.5323 20.8071 13.4429C20.9928 13.3535 21.1946 13.3064 21.3992 13.3046C21.5455 13.3205 21.6873 13.3663 21.8166 13.4393C21.9459 13.5123 22.0602 13.6112 22.1528 13.7302C22.2454 13.8492 22.3147 13.9861 22.3565 14.1329C22.3984 14.2798 22.4121 14.4339 22.3968 14.5863C22.3968 15.5029 21.6768 16.4796 20.4152 17.2662C20.2897 17.3428 20.1469 17.3831 20.0016 17.3831C19.8562 17.3831 19.7134 17.3428 19.588 17.2662C18.3288 16.4821 17.6064 15.5029 17.6064 14.5863C17.5907 14.4337 17.6042 14.2794 17.6459 14.1322C17.6876 13.985 17.7567 13.8479 17.8494 13.7286C17.9421 13.6093 18.0564 13.5102 18.1859 13.437C18.3154 13.3638 18.4574 13.318 18.604 13.3021Z" fill="white" />
                                </svg>

                                <p>What about family plans?</p>
                            </Container>
                            <div style={{
                                maxHeight: "50vh",
                                overflow: "auto",
                            }}>
                                <div className="job-columns">
                                    {familyOptions.map((family, index) => (
                                        <div
                                            key={index}
                                            className='job-item'
                                            onClick={() => setSelectedWantKids(family)}
                                            style={{
                                                backgroundColor: selectedWantKids === family ? '#F7ECFF' : 'transparent',
                                            }}
                                        >
                                            {family}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container> */}
                    {/* <div style={{
                        display: "flex",
                        width: "100%",
                        gap: "5rem",
                        marginTop: "auto",
                        marginBottom: "2rem",
                    }}>
                        <Button variant="primary" style={{
                            width: "100%",
                            marginTop: "1rem",
                            background: "white",
                            border: "2px solid #6c6c6c",
                            borderRadius: "9999px",
                            padding: "0.75rem",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: "#6c6c6c",
                        }}>
                            Ask me later
                        </Button>
                        <Button variant="primary" style={{
                            width: "100%",
                            marginTop: "1rem",
                            background: "linear-gradient(180deg, #FC8C66 -4.17%, #F76A7B 110.42%)",
                            border: "none",
                            borderRadius: "9999px",
                            padding: "0.75rem",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                        }} onClick={saveAll}>
                            Next
                        </Button>
                    </div> */}
                    <div className="d-flex justify-content-center" style={{ position: "fixed", bottom: "30px", width: "100%" }}>
    <Button variant="outline-danger" className="btn-no" onClick={()=> navigate('/updateprofile')}>
        Cancel
    </Button>
    <Button  type="submit" variant="primary" className="btn-yes" onClick={saveAll}>
        Save
    </Button>
</div>
                </Container>
            </Container>
        </div>
        </div>
        </Sidebar>
    );
};


