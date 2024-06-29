import React, { useEffect } from 'react'
import styles from './chatbox.module.css'
import dayjs from 'dayjs';

export default function ChatBox() {
    /**
     * @typedef {Object} Message
     * @property {"you" | "other"} sender - The sender of the message.
     * @property {string} message - The content of the message.
     * @property {string} time - The date the message was sent.
     */

    /**
     * @typedef {Object.<string, Message[]>} Messages
     */

    /**
     * @type {[Messages, (messages: Messages) => void]}
     */

    const [messages, setMessages] = React.useState({});
    const [text, setText] = React.useState("");

    useEffect(() => {
        setMessages({
            "2021-10-01": [
                {
                    sender: "you",
                    message: "Hello",
                    time: "12:00"
                },
                {
                    sender: "other",
                    message: "Hi",
                    time: "12:01"
                }
            ],
            "2021-10-02": [
                {
                    sender: "you",
                    message: "How are you?",
                    time: "12:00"
                },
                {
                    sender: "other",
                    message: "I'm fine",
                    time: "12:01"
                }
            ],
            "2024-06-27": [
                {
                    sender: "you",
                    message: "What's up?",
                    time: "12:00"
                },
                {
                    sender: "other",
                    message: "Nothing much",
                    time: "12:01"
                }
            ],
            "2024-06-28": [
                {
                    sender: "you",
                    message: "Goodbye",
                    time: "12:00"
                },
                {
                    sender: "other",
                    message: "Bye",
                    time: "12:01"
                }
            ]
        })
    }, []);

    useEffect(() => {
        const chatContainer = document.querySelector(`.${styles.chatContainer}`);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    /**
     * 
     * @param {string | Date} date
     * @returns {string} 
     */
    function getDateDifference(date) {
        const today = dayjs();
        const messageDate = dayjs(date);
        const diff = today.diff(messageDate, 'day');

        if (diff === 0) {
            return "Today";
        } else if (diff === 1) {
            return "Yesterday";
        } else {
            return messageDate.format("DD/MM/YYYY");
        }
    }

    /**
     * 
     * @param {React.FormEvent<HTMLFormElement>} e 
     * @returns {Promise<void>}
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setMessages({
            ...messages,
            [dayjs().format("YYYY-MM-DD")]: [
                ...messages[dayjs().format("YYYY-MM-DD")],
                {
                    sender: "you",
                    message: text,
                    time: dayjs().format("h:mm A")
                }
            ]
        });
        setText("");
    }

    return (
        <section className={styles.chatbox}>
            <div className={styles.chatHeader}>
                <img src="https://via.placeholder.com/75" alt="profile" />
                <p>John Doe</p>
                <div style={{ flexGrow: "1" }}></div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3307 6.66536C17.3307 5.92898 16.7338 5.33203 15.9974 5.33203C15.261 5.33203 14.6641 5.92898 14.6641 6.66536C14.6641 7.40174 15.261 7.9987 15.9974 7.9987C16.7338 7.9987 17.3307 7.40174 17.3307 6.66536Z" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.3307 15.9987C17.3307 15.2623 16.7338 14.6654 15.9974 14.6654C15.261 14.6654 14.6641 15.2623 14.6641 15.9987C14.6641 16.7351 15.261 17.332 15.9974 17.332C16.7338 17.332 17.3307 16.7351 17.3307 15.9987Z" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.3307 25.332C17.3307 24.5957 16.7338 23.9987 15.9974 23.9987C15.261 23.9987 14.6641 24.5957 14.6641 25.332C14.6641 26.0684 15.261 26.6654 15.9974 26.6654C16.7338 26.6654 17.3307 26.0684 17.3307 25.332Z" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className={styles.chatContainer}>
                {
                    Object.keys(messages).map(date => (
                        <React.Fragment key={date}>
                            <div className={styles.date}>
                                <hr />
                                <p>{getDateDifference(date)}</p>
                                <hr />
                            </div>
                            {
                                messages[date].map((message, i) => (
                                    <React.Fragment key={i}>
                                        <div key={i} className={styles.message}>
                                            <div className={message.sender === "you" ? styles.you : styles.other}>
                                                <p>{message.message}</p>
                                                <p>{message.time}</p>
                                            </div>
                                        </div>
                                        {
                                            message.sender === "you" && <img src="https://via.placeholder.com/75" alt="profile" />
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </div>
            <form className={styles.chatInput} onSubmit={handleSubmit}>
                <input type="text" placeholder='Message...' value={text} onChange={(e) => setText(e.currentTarget.value)} />
                <button>Send</button>
            </form>
        </section>
    )
}
