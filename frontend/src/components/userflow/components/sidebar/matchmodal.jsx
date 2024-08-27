import React, { useState } from 'react';
import styles from './CustomModal.module.css';
import HorizontalLogo from '../../../../assets/images/HorizontalLogo.png';
import profilepic from '../../../../assets/images/profilepic.png'; // Default image for fallback
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';
import UpgradeModal from '../upgradenow/upgradenow';
import { useSocket } from '../../../../Context/SockerContext';
import { useNavigate } from 'react-router-dom';

const MatchCustomModal = ({ matchmodal, handleClose, userMedia }) => {
    const cookies = useCookies();
    const [showmodal, setshowmodal] = useState(false);
    const { socket } = useSocket();
    const navigate = useNavigate();
    const userId = cookies.getCookie("userId");

    if (!matchmodal || !userMedia) return null;

    // Function to get image URL
    const getImageURL = (type, hash, extension, userId) => {
        if (type === 1) {
            return `https://data.mytamildate.com/storage/public/uploads/user/${userId}/avatar/${hash}-large.${extension}`;
        } else {
            return `${API_URL}media/avatar/${hash}.${extension}`;
        }
    };

    const { media, userDetails } = userMedia || {};

    // Default to profilepic if no media is available
    const user1Image = media && media[0]
        ? getImageURL(media[0].type, media[0].hash, media[0].extension, media[0].user_id)
        : profilepic;

    const user2Image = media && media[1]
        ? getImageURL(media[1].type, media[1].hash, media[1].extension, media[1].user_id)
        : profilepic;

    async function getRoom() {
        if (cookies.getCookie("isPremium") !== "true") {
            setshowmodal(true);
            return;
        }

        try {
            const response = await fetch(`${API_URL}customer/chat/create-room`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${cookies.getCookie("token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    participantId: userDetails.user_id
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (sessionStorage.getItem("conversationId")) {
                    socket?.emit("leave-room", sessionStorage.getItem("conversationId"));
                }
                sessionStorage.setItem("conversationId", data.conversationId);
                navigate(`/user/chat/with/${userDetails.first_name}`, {
                    state: {
                        name: userDetails.first_name,
                        img: user1Image,
                        recepientId: userId
                    }
                });
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleClose}>&times;</button>
                <img className={styles.img} src={HorizontalLogo} alt="Horizontal Logo" />
                <p className={styles.text}>
                    It’s a <span style={{ color: "#4B164C" }}>match!</span>
                </p>

                <div className={styles.bothimg}>
                    <div className={`${styles.maincontainer} ${styles.left}`}>
                        <div className={styles.imgContainer}>
                            <img
                                src={user1Image}
                                alt="User 1"
                                width={270}
                                height={270}
                                style={{
                                    borderRadius: "9999px",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </div>

                    <div className={`${styles.maincontainer} ${styles.right}`}>
                        <div className={styles.imgContainer}>
                            <img
                                src={user2Image}
                                alt="User 2"
                                width={270}
                                height={270}
                                style={{
                                    borderRadius: "9999px",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <button className={styles.button} onClick={getRoom}>Send a message</button>
                <p className={styles.keepbrowsing} onClick={handleClose}>Keep browsing</p>
            </div>
            <UpgradeModal show={showmodal} setShow={setshowmodal} />
        </div>
    );
};

export default MatchCustomModal;
