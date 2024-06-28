import React from 'react'
import styles from './matches.module.css'
import Navbar from '../navbar/Navbar'

export default function Matches() {
    return (
        <section className={styles.matchContainer}>
            <div className={styles.nav}>
                <ul>
                    <li className={styles.active}>Matches</li>
                    <li>Likes</li>
                    <li>Requests</li>
                    <li>Others</li>
                </ul>
            </div>
            <p style={{
                fontSize: "large",
                fontWeight: "600",
                marginBottom: "-1rem"
            }}>Matches</p>
            <div className={styles.profiles}>
                {
                    Array(10).fill(0).map((_, i) => (
                        <div key={i}>
                            <img src="https://via.placeholder.com/75" alt="profile" />
                            <p>John Doe</p>
                        </div>
                    ))
                }
            </div>
            <p style={{
                fontSize: "large",
                fontWeight: "600",
                marginBottom: "-1rem"
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
            <Navbar style={{
                width: "100%",
                maxWidth: "100%",
            }} />
        </section>
    )
}
