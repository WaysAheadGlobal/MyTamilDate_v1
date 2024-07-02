import React from 'react'
import styles from './likes.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Likes() {
    const navigate = useNavigate();
    const searchParams = useSearchParams();

    return (
        <>
            <ul className={styles.nav}>
                <li
                    onClick={() => navigate("?t=r")}
                    className={(searchParams[0].get("t") === "r" || !searchParams[0].get("t")) ? styles.active : ""}
                >
                    Received
                    <div className={styles.indicator}></div>
                </li>
                <li
                    onClick={() => navigate("?t=s")}
                    className={searchParams[0].get("t") === "s" ? styles.active : ""}
                >
                    Sent
                    <div className={styles.indicator}></div>
                </li>
            </ul>
            <div className={styles.profiles}>
                {
                    Array(10).fill(0).map((_, i) => (
                        <div key={i} style={{
                            backgroundImage: `url(https://via.placeholder.com/150)`
                        }}>
                            <div>
                                <p>John Doe</p>
                                <p>Computer Science, Canada</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
