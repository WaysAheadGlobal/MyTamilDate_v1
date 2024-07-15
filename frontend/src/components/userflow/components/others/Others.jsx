import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './others.module.css';
import { API_URL } from '../../../../api';
import { useCookies } from '../../../../hooks/useCookies';
import { Skeleton } from '@mui/material';

export default function Others() {
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState([]);
    const cookies = useCookies();

    const getImageURL = (type, hash, extension, userId) => type === 1 ? `https://data.mytamildate.com/storage/public/uploads/user/${userId}/avatar/${hash}-large.${extension}` : `${API_URL}media/avatar/${hash}.${extension}`;

    useEffect(() => {
        setProfiles([]);
        (async () => {
            const path = searchParams[0].get("t") === "b" ? "blocked" : "skipped";
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}customer/matches/${path}`, {
                    headers: {
                        'Authorization': `Bearer ${cookies.getCookie("token")}`
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setProfiles(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [searchParams[0].get("t")]);

    return (
        <>
            <ul className={styles.nav}>
                <li
                    onClick={() => navigate("?t=s")}
                    className={(searchParams[0].get("t") === "s" || !searchParams[0].get("t")) ? styles.active : ""}
                >
                    <p>Skipped members</p>
                    <div className={styles.indicator}></div>
                </li>
                <li
                    onClick={() => navigate("?t=b")}
                    className={searchParams[0].get("t") === "b" ? styles.active : ""}
                >
                    <p>Blocked members</p>
                    <div className={styles.indicator}></div>
                </li>
            </ul>
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
                    Array.isArray(profiles) && profiles.map((profile, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundImage: `url(${getImageURL(profile.type, profile.hash, profile.extension, profile.user_id)})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                            onClick={() => navigate(`/user/${profile.first_name}/${profile.user_id}`)}
                        >
                            <div style={{
                                width: "100%",
                            }}>
                                <p>{profile.first_name} {profile.last_name}</p>
                                <p>{profile.location_string}, {profile.country}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
