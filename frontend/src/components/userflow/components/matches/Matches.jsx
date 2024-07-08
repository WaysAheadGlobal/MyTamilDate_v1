import React, { useEffect, useState } from 'react';
import styles from './matches.module.css';
import { useCookies } from '../../../../hooks/useCookies';
import { API_URL } from '../../../../api';
import { Skeleton } from '@mui/material';
import chatPlaceholder from '../../../../assets/images/chatPlaceholder.svg';
import { useNavigate } from 'react-router-dom';

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [currentMatches, setCurrentMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const cookies = useCookies();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

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
    }, [page])

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
    }, [matches])

    async function getRoom(userId, name, img) {
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
                sessionStorage.setItem("conversationId", data.conversationId);
                navigate(`/user/chat/with/${name}`, {
                    state: {
                        name,
                        img
                    }
                })
            }

        } catch (error) {
            console.error(error)
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
                                Array(10).fill(0).map((_, i) => (
                                    <div key={i} className={styles.message}>
                                        <img src="https://via.placeholder.com/75" alt="profile" />
                                        <div>
                                            <p>John Doe</p>
                                            <p>Lorem ipsum dolor sit</p>
                                        </div>
                                        <div style={{ flexGrow: "1" }}></div>
                                        <p>15 mins ago</p>
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
