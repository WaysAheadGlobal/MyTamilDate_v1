import { Skeleton } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../api';
import chatPlaceholder from '../../../../assets/images/chatPlaceholder.svg';
import { useSocket } from '../../../../Context/SockerContext';
import { useCookies } from '../../../../hooks/useCookies';
import styles from './matches.module.css';
import { useAlert } from '../../../../Context/AlertModalContext';

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [currentMatches, setCurrentMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const [conversations, setConversations] = useState([]);
    const cookies = useCookies();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { socket } = useSocket();
    const alert = useAlert();

    const getImageURL = (type, hash, extension, userId) => type === 1 ? `https://data.mytamildate.com/storage/public/uploads/user/${userId}/avatar/${hash}-large.${extension}` : `${API_URL}media/avatar/${hash}.${extension}`;

    useEffect(() => {
        (async () => {
            try {
                setLoadingMatches(true);
                const response = await fetch(`${API_URL}customer/matches?page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${cookies.getCookie("token")}`
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setMatches([...matches, ...data]);
                    setCurrentMatches(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingMatches(false);
            }
        })()
    }, [page]);

    useEffect(() => {
        if (currentMatches.length < 10) return;

        const lastProfileObserver = new IntersectionObserver(entries => {
            const lastProfile = entries[0];

            if (!lastProfile.isIntersecting) return;

            setPage(page + 1);
        });
        lastProfileObserver.observe(document.querySelector(`.profile:last-child`));
        return () => {
            lastProfileObserver.disconnect()
        };
    }, [matches]);

    async function getRoom(userId, name, img) {
        if (cookies.getCookie("isPremium") !== "true") {
            alert.setModal({
                show: true,
                title: "Upgrade to premium",
                message: "You need to be a premium user to chat with other users. Would you like to upgrade now?",
                onButtonClick: () => navigate("/selectplan"),
                showCancelButton: true
            });
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
                    participantId: userId
                })
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                if (sessionStorage.getItem("conversationId")) {
                    socket?.emit("leave-room", sessionStorage.getItem("conversationId"));
                }
                sessionStorage.setItem("conversationId", data.conversationId);
                navigate(`/user/chat/with/${name}`, {
                    state: {
                        name,
                        img,
                        recepientId: userId
                    }
                })
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}customer/chat/get-conversations`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.getCookie('token')}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setConversations(data);
            }
        })()
    }, [])

    useEffect(() => {
        socket?.on("fetch-messages", async (data) => {
            const response = await fetch(`${API_URL}customer/chat/get-conversations?limit=1`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.getCookie('token')}`
                }
            });
            const result = await response.json();

            if (response.ok) {
                console.log("messages", result);
                setConversations([
                    result[0],
                    ...conversations.filter(conversation => conversation.conversation_id !== result[0].conversation_id)
                ])
            }
        });

        return () => {
            socket?.off("fetch-messages");
        }
    });

    useEffect(() => {
        socket?.on("block", (data) => {
            const personId = data.personId;
            setConversations(conversations.filter(conversation => conversation.user_id !== personId));
        });

        return () => {
            socket?.off("block");
        }
    });

    /**
     * 
     * @param {string | Date} date
     * @returns {string} 
     */
    function getDateDifference(date) {
        const today = dayjs();
        const messageDate = dayjs(date);
        const diff = today.diff(messageDate, 'day');
        const diffInHours = today.diff(messageDate, 'hour');
        const diffInMinutes = today.diff(messageDate, 'minute');

        if (diff === 0) {
            if (diffInHours < 1) {
                if (diffInMinutes > 1) {
                    return `${diffInMinutes} minutes ago`;
                } else if (diffInMinutes === 1) {
                    return "A minute ago";
                } else {
                    return "Just Now"
                }
            } else {
                return `${diffInHours} hours ago`;
            }
        } else if (diff === 1) {
            return "Yesterday";
        } else {
            return messageDate.format("DD/MM/YYYY");
        }
    }

    return (
        <>
            <p style={{
                fontSize: "large",
                fontWeight: "600",
                marginBottom: "-1rem"
            }}>Matches</p>
            {
                Array.isArray(matches) && !loadingMatches && matches.length === 0 && (
                    <div className={styles.chatPlaceholder}>
                        <img src={chatPlaceholder} alt="chat placeholder" />
                        <p>You don't have any chats yet. Make the first move & say hello!</p>
                    </div>
                )
            }
            {
                loadingMatches && (
                    <div className={styles.profiles}>
                        {
                            Array(5).fill(0).map((_, i) => (
                                <div key={i}>
                                    <Skeleton
                                        animation="pulse"
                                        variant="circular"
                                        width={75}
                                        height={75}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <div className={styles.profiles}>
                {
                    Array.isArray(matches) && matches.map((match) => (
                        <div key={match.user_id} className='profile' onClick={() => getRoom(match.user_id, match.first_name, getImageURL(match.type, match.hash, match.extension, match.user_id))}>
                            <img
                                src={getImageURL(match.type, match.hash, match.extension, match.user_id)}
                                alt="profile"
                                width={75}
                                height={75}
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                            <p>{match.first_name}</p>
                        </div>
                    ))
                }
            </div>
            {
                matches.length !== 0 && (
                    <>
                        <p style={{
                            fontSize: "large",
                            fontWeight: "600",
                        }}>Messages</p>
                        <div className={styles.messagesContainer}>
                            {
                                conversations.map((conversation, i) => (
                                    <div key={i} className={styles.message} onClick={() => getRoom(conversation.user_id, conversation.first_name, getImageURL(conversation.type, conversation.hash, conversation.extension, conversation.user_id))}>
                                        <img src={getImageURL(conversation.type, conversation.hash, conversation.extension, conversation.user_id)} alt="profile" style={{
                                            width: "70px",
                                            height: "70px",
                                            objectFit: "cover"
                                        }} />
                                        <div>
                                            <p>{conversation.first_name} {conversation.last_name}</p>
                                            <p style={{
                                                filter: cookies.getCookie("isPremium") === "true" ? "none" : "blur(5px)",
                                            }}>{conversation.message}</p>
                                        </div>
                                        <div style={{ flexGrow: "1" }}></div>
                                        <p>{getDateDifference(conversation.sent_at)}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}