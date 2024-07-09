import React, { useEffect, useState } from 'react'
import { MobileSidebar } from '../../components/sidebar/sidebar'
import styles from './chat.module.css'
import Matches from '../../components/matches/Matches'
import ChatBox from '../../components/chat-box/ChatBox'
import Likes from '../../components/likes/Likes'
import Requests from '../../components/requests/Requests'
import Others from '../../components/others/Others'
import ChatNav from '../../components/chat-nav/ChatNav'
import Navbar from '../../components/navbar/Navbar'

export default function Chat() {
    const pathname = window.location.pathname.split("/");

    return (
        <section className={styles.chatLayout}>
            <MobileSidebar />
            <div className={styles.matchContainer}>
                <ChatNav />
                {
                    pathname.includes("likes") && <Likes />
                }
                {
                    pathname.includes("requests") && <Requests />
                }
                {
                    pathname.includes("others") && <Others />
                }
                {
                    !(
                        pathname.includes("likes") ||
                        pathname.includes("requests") ||
                        pathname.includes("others")
                    ) && <Matches />
                }
                <div style={{ marginTop: "auto" }}></div>
                <Navbar style={{
                    width: "100%",
                    maxWidth: "100%",
                }} />
            </div>
            <ChatBox />
        </section>
    )
}
