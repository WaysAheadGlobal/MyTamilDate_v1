import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './likes.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';
import { Skeleton } from '@mui/material';
import chatPlaceholder from '../../../../assets/images/chatPlaceholder.svg';

export default function Likes() {
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const cookies = useCookies();
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const observerRef = useRef(null);
    const [currentLikes, setCurrentLikes] = useState([]);

    const getImageURL = (type, hash, extension, userId) => type === 1 ? `https://data.mytamildate.com/storage/public/uploads/user/${userId}/avatar/${hash}-large.${extension}` : `${API_URL}media/avatar/${hash}.${extension}`;

    const fetchLikes = useCallback(async () => {
        const path = searchParams[0].get("t") === "s" ? "sent" : "received";
        console.log(page)
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}customer/matches/likes/${path}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.getCookie("token")}`
                }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setLikes([...likes, ...data]);
                setCurrentLikes(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [page, searchParams[0].get("t"), cookies.getCookie("token")]);

    useEffect(() => {
        fetchLikes();
    }, [page, searchParams[0].get("t")]);

    useEffect(() => {
        if (currentLikes.length < 10) return;

        if (observerRef.current) observerRef.current.disconnect();

        const lastLikeElement = document.querySelector('.like:last-child');

        if (lastLikeElement) {
            observerRef.current = new IntersectionObserver((entries) => {
                const lastLike = entries[0];
                if (lastLike.isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                    observerRef.current.unobserve(lastLike.target);
                }
            });
            observerRef.current.observe(lastLikeElement);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [likes]);

    return (
        <>
            <ul className={styles.nav}>
                <li
                    onClick={() => {
                        navigate("?t=r");
                        if (searchParams[0].get("t") !== "r") {
                            setPage(1);
                            setLikes([]);
                        }
                    }}
                    className={(searchParams[0].get("t") === "r" || !searchParams[0].get("t")) ? styles.active : ""}
                >
                    Received
                    <div className={styles.indicator}></div>
                </li>
                <li
                    onClick={() => {
                        navigate("?t=s");
                        if (searchParams[0].get("t") !== "s") {
                            setPage(1);
                            setLikes([]);
                        }
                    }}
                    className={searchParams[0].get("t") === "s" ? styles.active : ""}
                >
                    Sent
                    <div className={styles.indicator}></div>
                </li>
            </ul>
            {
                Array.isArray(likes) && !loading && likes.length === 0 && (
                    <div className={styles.chatPlaceholder}>
                        <img src={chatPlaceholder} alt="chat placeholder" />
                        <p>New likes will appear here</p>
                    </div>
                )
            }
            <div className={styles.profiles}>
                {
                    loading && Array(6).fill(0).map((_, i) => (
                        <Skeleton
                            key={i}
                            animation="pulse"
                            sx={{
                                borderRadius: "12px",
                            }}
                            variant="rounded"
                            width={160}
                            height={180}
                        />
                    ))
                }
                {
                    Array.isArray(likes) && likes.map((like, i) => (
                        <div key={i} className='like' style={{
                            backgroundImage: `url(${getImageURL(like.type, like.hash, like.extension, like.user_id)})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                            <div>
                                <p>{like.first_name} {like.last_name}</p>
                                <p>{like.job}, {like.country}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
