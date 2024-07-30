import React, { useEffect } from 'react'
import styles from './sidebar.module.css'
import { useUserProfile } from '../context/UserProfileContext'
import { API_URL } from '../../../../api';
import { useNavigate } from 'react-router-dom';

export default function Suggestions({ Rejected }) {
    const { profiles } = useUserProfile()
    const navigate = useNavigate();

    const getImageURL = (type, hash, extension, userId) => type === 1 ? `https://data.mytamildate.com/storage/public/uploads/user/${userId}/avatar/${hash}-large.${extension}` : `${API_URL}media/avatar/${hash}.${extension}`;

    return (
        <div className={styles.suggestions} style={{ borderTop: "2px solid #e0e0e0" }}>
            <div>
                <p style={{ fontSize: "16px" }}>Suggested for you</p>
                <p style={{ cursor: "pointer", fontSize: "16px" }} onClick={() => !Rejected && navigate("/user/recommendations")}>See All</p>
            </div>


            {
                !Rejected && Array.isArray(profiles) && profiles.slice(0, 3).map(profile => (
                    <div
                        key={profile.id}
                        style={{
                            display: "flex",
                            gap: "1rem",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            padding: "10px",
                        }}
                        onClick={() => navigate(`/user/${profile.first_name}/${profile.user_id}`)}
                    >
                        <img
                            src={getImageURL(profile.type, profile.hash, profile.extension, profile.user_id)}
                            alt={"profile"}
                            width={70}
                            height={70}
                            style={{
                                borderRadius: "9999px",
                                objectFit: "cover",
                            }}
                        />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            color: "#515151"
                        }}>
                            <p style={{
                                fontWeight: "600",
                                fontSize: "1rem",
                                marginBottom: "-0.5rem",
                            }}>{profile.first_name}</p>
                            <p>Suggested for you</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
