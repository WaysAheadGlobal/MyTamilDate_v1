import React from 'react'
import styles from "./styles.module.css"
import { useNavigate } from 'react-router-dom';

export default function ChatNav() {
    const navigate = useNavigate();
    const pathname = window.location.pathname.split("/");

    return (
        <div className={styles.nav}>
            <ul>
                <li className={pathname.at(-1) === "chat" ? styles.active : ""} onClick={() => navigate("/user/chat")}>Matches</li>
                <li className={pathname.includes("likes") ? styles.active : ""} onClick={() => navigate("/user/chat/likes")}>Likes</li>
                <li className={pathname.includes("requests") ? styles.active : ""} onClick={() => navigate("/user/chat/requests")}>Requests</li>
                <li className={pathname.includes("others") ? styles.active : ""} onClick={() => navigate("/user/chat/others")}>Others</li>
            </ul>
        </div>
    )
}
