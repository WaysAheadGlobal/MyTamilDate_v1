import React from 'react'
import { MobileSidebar } from '../../components/sidebar/sidebar'
import styles from './chat.module.css'
import Matches from '../../components/matches/Matches'
import ChatBox from '../../components/chat-box/ChatBox'

export default function Chat() {
    return (
        <section className={styles.chatLayout}>
            <MobileSidebar />
            <Matches />
            <ChatBox />
        </section>
    )
}
