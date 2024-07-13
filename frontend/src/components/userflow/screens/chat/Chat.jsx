import React, { useEffect } from 'react'
import ChatBox from '../../components/chat-box/ChatBox'
import ChatNav from '../../components/chat-nav/ChatNav'
import Likes from '../../components/likes/Likes'
import Matches from '../../components/matches/Matches'
import Navbar from '../../components/navbar/Navbar'
import Others from '../../components/others/Others'
import Requests from '../../components/requests/Requests'
import { MobileSidebar } from '../../components/sidebar/sidebar'
import styles from './chat.module.css'

export default function Chat() {
    const pathname = window.location.pathname.split("/");

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                document.querySelector("#match-box").style.display = "flex";
                document.querySelector("#chat-box").style.display = "flex";
                return;
            }

            if (pathname.includes("with")) {
                document.querySelector("#match-box").style.display = "none";
                document.querySelector("#chat-box").style.display = "flex";
            } else {
                document.querySelector("#match-box").style.display = "flex";
                document.querySelector("#chat-box").style.display = "none";
            }
        });
    }, [])

    useEffect(() => {
        if (window.innerWidth > 768) {
            document.querySelector("#match-box").style.display = "flex";
            document.querySelector("#chat-box").style.display = "flex";
            return;
        }

        if (pathname.includes("with")) {
            console.log("3")
            document.querySelector("#match-box").style.display = "none";
            document.querySelector("#chat-box").style.display = "flex";
        } else {
            console.log("4")
            document.querySelector("#match-box").style.display = "flex";
            document.querySelector("#chat-box").style.display = "none";
        }
    }, [pathname])

    return (
        <section className={[styles.chatLayout, "chat"].join(" ")}>
            <MobileSidebar />
            <div id="match-box" className={styles.matchContainer}>
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
