import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../api';
import './card.css';
import IconButton from './IconButton';
import { useCookies } from '../../../../hooks/useCookies';
import ladyIcon from '../../../../assets/images/ladyIcon.png';
import { FaLocationDot } from "react-icons/fa6";
import { useUserProfile } from '../context/UserProfileContext';
import ProfileDetails from './ProfileDetails';
import { Dropdown, Modal } from 'react-bootstrap';
import Button from "../button/Button";

/**
 * @typedef {Object} Profile
 * @property {number} id - The unique identifier for the user.
 * @property {number} user_id - The user ID associated with the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} birthday - The birthday of the user in ISO format.
 * @property {string} hash - A hash string associated with the user.
 * @property {string} extension - The file extension of the user's profile picture.
 * @property {number} type - The type of user.
 * @property {number} location_id - The location ID associated with the user.
 * @property {string} created_at - The creation timestamp of the user record in ISO format.
 * @property {number} job_id - The job ID associated with the user.
 * @property {string} country - The country of the user.
 * @property {string} continent - The continent of the user.
 * @property {string} location_string - The location string of the user.
 * @property {string} job - The job of the user.
 * @property {boolean} like - The like status of the user.
 * 
 * @property {Profile[]} profiles - The profiles of the user.
 * @property {React.Dispatch<React.SetStateAction<Profile[]>>} setProfiles - The setProfiles function to update the profiles.
 */

/**
 * Card component to display user information.
 * 
 * @param {Profile} props - The properties passed to the component.
 * @returns {JSX.Element} The Card component.
 */
export default function Card({ ...props }) {
    const navigate = useNavigate();
    const image = props.type === 1 ? `https://data.mytamildate.com/storage/public/uploads/user/${props.user_id}/avatar/${props.hash}-large.${props.extension}` : `${API_URL}media/avatar/${props.hash}.${props.extension}`;
    const cookies = useCookies();
    const cardRef = useRef(null);
    const [liked, setLiked] = useState(props.like);
    const { profiles, setProfiles } = useUserProfile();
    const detailsRef = useRef(null);
    const { setPage } = props;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);

    async function handleIconButtonClick(type) {
        console.log(type);
        if (type === "chat") {
            navigate(`/user/chat/with/${props.first_name}`, {
                state: {
                    user_id: props.user_id,
                    type: "request"
                }
            });
            return;
        }
        const response = await fetch(`${API_URL}customer/matches/${type}`, {
            method: "POST",
            body: JSON.stringify({
                personId: props.user_id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.getCookie('token')}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            console.log(data);

            if (type === "undo") {
                const undoUser = data.user;
                const currentProfileIdx = profiles.findIndex(profile => profile.user_id === props.user_id);
                console.log([
                    profiles.slice(0, currentProfileIdx),
                    undoUser,
                    profiles.slice(currentProfileIdx)
                ])
                setProfiles([
                    ...profiles.slice(0, currentProfileIdx),
                    undoUser,
                    ...profiles.slice(currentProfileIdx)
                ]);
                return;
            }

            if (type === "skip" || type === "like") {

                if (profiles.length === 1) {
                    setPage(prev => prev + 1);
                }

                cardRef.current.style.transform = "translateX(-100%)";
                cardRef.current.style.transition = "transform 0.25s ease-in-out";
                setProfiles(profiles.filter(profile => profile.user_id !== props.user_id));
                return;
            }
        }
    }

    return (
        <>
            <ReportModal show={showReportModal} setShow={setShowReportModal} personId={props.user_id} />
            <BlockModal show={showBlockModal} setShow={setShowBlockModal} personId={props.user_id} />
            <div className='card-and-details-container'>
                <div ref={cardRef} className='card-container'
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    onClick={() => navigate(`/user/${props.first_name} ${props.last_name ?? ""}/${props.user_id}`)}
                >
                    <span style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                    }}>
                        <IconButton type='undo' onClick={(e) => {
                            e.stopPropagation();
                            handleIconButtonClick("undo");
                        }} />
                    </span>
                    <div className='details-container' style={{
                        width: "100%",
                    }}>
                        <div className='details' style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
                            <p>{`${props.first_name} ${props.last_name ?? ""}`}, {dayjs().diff(props.birthday, "y")}</p>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "0.5rem"
                            }}>
                                <img src={ladyIcon} alt="icon" width={30} height={30} />
                                <p style={{
                                    fontSize: "medium",
                                }}>{props.job}</p>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "0.5rem"
                            }}>
                                <FaLocationDot size={25} />
                                <p style={{
                                    fontSize: "medium",
                                }}>{props.location_string}, {props.country}</p>
                            </div>
                        </div>
                        <div className='options'>
                            <IconButton type={liked ? 'likeActive' : 'like'} onClick={(e) => {
                                e.stopPropagation();
                                setLiked(!liked);
                                handleIconButtonClick("like");
                            }} />
                            <div style={{
                                position: "relative",
                                top: "1.5rem"
                            }}>
                                <IconButton
                                    type={"details"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const detailsClassList = detailsRef.current.classList;

                                        if (detailsClassList.contains("show")) {
                                            detailsRef.current.style.transition = "all 0.25s ease-in-out";
                                            detailsRef.current.style.opacity = "0";
                                            setTimeout(() => {
                                                detailsRef.current.style.display = "none";
                                            }, 200);

                                        } else {
                                            detailsRef.current.style.transition = "all 0.25s ease-in-out";
                                            detailsRef.current.style.opacity = "1";
                                            detailsRef.current.style.display = "block";
                                            document.querySelector("#scroll-anchor").scrollIntoView({ behavior: "smooth" });
                                        }

                                        detailsClassList.toggle("show");
                                    }} />
                            </div>
                            <IconButton type='skip' onClick={(e) => {
                                e.stopPropagation();
                                handleIconButtonClick("skip");
                            }} />
                            {/* <IconButton type='chat' onClick={(e) => {
    e.stopPropagation();
    handleIconButtonClick("chat");
}} /> */}
                        </div>
                    </div>
                    <div className='menu'>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            navigate("/user/preferences");
                        }} style={{ cursor: "pointer" }}>
                            <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.45313 7.23751L13.0211 7.23751M13.0211 7.23751C13.0211 8.63074 14.1506 9.76018 15.5438 9.76018C16.937 9.76018 18.0665 8.63074 18.0665 7.23751M13.0211 7.23751C13.0211 5.84428 14.1506 4.71484 15.5438 4.71484C16.937 4.71484 18.0665 5.84428 18.0665 7.23751M18.0665 7.23751L25.6345 7.23751M5.45313 16.0668H20.5891M20.5891 16.0668C20.5891 17.4601 21.7186 18.5895 23.1118 18.5895C24.505 18.5895 25.6345 17.4601 25.6345 16.0668C25.6345 14.6736 24.505 13.5442 23.1118 13.5442C21.7186 13.5442 20.5891 14.6736 20.5891 16.0668ZM10.4985 24.8962H25.6345M10.4985 24.8962C10.4985 23.5029 9.36902 22.3735 7.97579 22.3735C6.58256 22.3735 5.45312 23.5029 5.45312 24.8962C5.45313 26.2894 6.58256 27.4188 7.97579 27.4188C9.36902 27.4188 10.4985 26.2894 10.4985 24.8962Z" stroke="white" stroke-width="1.892" stroke-linecap="round" />
                            </svg>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle
                                as="div"
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDropdown(!showDropdown);
                                }}
                            >
                                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8117 6.78086C16.8117 6.08425 16.247 5.51953 15.5504 5.51953C14.8538 5.51953 14.2891 6.08425 14.2891 6.78086C14.2891 7.47748 14.8538 8.0422 15.5504 8.0422C16.247 8.0422 16.8117 7.47748 16.8117 6.78086Z" stroke="white" stroke-width="1.892" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.8117 15.6102C16.8117 14.9136 16.247 14.3489 15.5504 14.3489C14.8538 14.3489 14.2891 14.9136 14.2891 15.6102C14.2891 16.3068 14.8538 16.8715 15.5504 16.8715C16.247 16.8715 16.8117 16.3068 16.8117 15.6102Z" stroke="white" stroke-width="1.892" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.8117 24.4395C16.8117 23.7429 16.247 23.1782 15.5504 23.1782C14.8538 23.1782 14.2891 23.7429 14.2891 24.4395C14.2891 25.1361 14.8538 25.7009 15.5504 25.7009C16.247 25.7009 16.8117 25.1361 16.8117 24.4395Z" stroke="white" stroke-width="1.892" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu show={showDropdown} style={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                backdropFilter: "blur(50px)",
                                border: "none",
                            }}>
                                <Dropdown.Item
                                    as="button"
                                    className='dropdown-hover-button'
                                    style={{
                                        borderBottom: "1px solid #8b807f",
                                        marginBottom: "0.5rem",
                                        color: "white"
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowReportModal(true);
                                        setShowDropdown(false);
                                    }}
                                >
                                    Report
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    className='dropdown-hover-button'
                                    style={{
                                        color: "white"
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowBlockModal(true);
                                        setShowDropdown(false);
                                    }}
                                >
                                    Block
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div
                    ref={detailsRef}
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "none",
                    }}
                >
                    <ProfileDetails userId={props.user_id} />
                </div>
            </div></>
    )
}

function ReportModal({ show, setShow, personId }) {
    const cookies = useCookies();
    const [options, setOptions] = useState([]);
    const formRef = useRef(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}customer/matches/report-reasons`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.getCookie('token')}`
                },
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setOptions(data);
            }
        })()
    }, [show])

    async function report(e) {
        e.preventDefault();
        const response = await fetch(`${API_URL}customer/matches/report`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.getCookie('token')}`
            },
            body: JSON.stringify({
                personId: personId,
                ...Object.fromEntries(new FormData(formRef.current))
            })
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            window.location.reload();
        }
    }

    return (
        <Modal size='sm' centered show={show}>
            <Modal.Body>
                <p style={{
                    fontSize: "large",
                    fontWeight: "600",
                    margin: "0",
                    marginBottom: "1rem",
                    color: "#6c6c6c"
                }}>Report user?</p>
                <p
                    style={{
                        fontSize: "14px",
                        margin: "0",
                        textAlign: "center",
                        color: "#6c6c6c"
                    }}
                >Report this user for violating MTD's community guidelines. Please select a reason for reporting the user below to help us improve your experience.</p>
                <form
                    ref={formRef}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        marginBlock: "1rem"
                    }}
                    onSubmit={report}
                >
                    {
                        options.map(option => (
                            <label key={option.id} htmlFor={option.id} style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                fontSize: "14px",
                                textAlign: "left",
                                color: "#6c6c6c"
                            }}>
                                <input
                                    type="radio"
                                    name="reportId"
                                    id={option.id}
                                    value={option.id}
                                    style={{
                                        accentColor: "#4E1173",
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                                <span>{option.name}</span>
                            </label>
                        ))
                    }
                </form>
                <div style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "1rem",
                    marginInline: "auto"
                }}>
                    <button
                        type='button'
                        style={{
                            borderRadius: "9999px",
                            padding: "0.75rem 1.5rem",
                            border: "2px solid #6c6c6c",
                            color: "#6c6c6c",
                            backgroundColor: "transparent"
                        }}
                        onClick={() => setShow(false)}
                    >
                        Close
                    </button>
                    <Button
                        type="submit"
                        style={{
                            borderRadius: "9999px",
                            padding: "0.75rem 1.5rem",
                        }}
                        onClick={() => formRef.current?.requestSubmit()}
                    >
                        Submit
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

function BlockModal({ show, setShow, personId }) {
    const cookies = useCookies();

    async function block() {
        const response = await fetch(`${API_URL}customer/matches/block`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.getCookie('token')}`
            },
            body: JSON.stringify({
                personId: personId
            })
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            window.location.reload();
        }
    }


    return (
        <Modal size='sm' centered show={show}>
            <Modal.Body>
                <p style={{
                    fontSize: "large",
                    fontWeight: "600",
                    margin: "0",
                    marginBottom: "1rem",
                    color: "#6c6c6c"
                }}>Block user</p>
                <p
                    style={{
                        fontSize: "14px",
                        margin: "0",
                        textAlign: "center",
                        color: "#6c6c6c"
                    }}
                >Blocked members will no longer be able to message you and won't show up when you're browsing</p>
                <div style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "1rem",
                    marginInline: "auto",
                }}>
                    <button
                        type='button'
                        style={{
                            borderRadius: "9999px",
                            padding: "0.75rem 1.5rem",
                            border: "2px solid #6c6c6c",
                            color: "#6c6c6c",
                            backgroundColor: "transparent"
                        }}
                        onClick={() => setShow(false)}
                    >
                        Close
                    </button>
                    <Button
                        onClick={block}
                        style={{
                            borderRadius: "9999px",
                            padding: "0.75rem 1.5rem",
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}