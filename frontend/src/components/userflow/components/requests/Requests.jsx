import React from 'react'
import styles from './requests.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Requests() {
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
            <div className={styles.messagesContainer}>
                {
                    (searchParams[0].get("t") === "r" || !searchParams[0].get("t")) ? (
                        Array(10).fill(0).map((_, i) => (
                            <div key={i} className={styles.message}>
                                <img src="https://via.placeholder.com/75" alt="profile" />
                                <div>
                                    <p>John Doe</p>
                                    <p>Lorem ipsum dolor sit</p>
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                    <p style={{
                                        fontSize: "small",
                                        color: "#6c6c6c",
                                        fontWeight: "500"
                                    }}>15 mins ago</p>
                                    <div style={{
                                        display: "flex",
                                        gap: "1rem",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_dddd_778_15721)">
                                                <circle cx="17.2222" cy="15.2222" r="14.2222" fill="white" />
                                            </g>
                                            <g clip-path="url(#clip0_778_15721)">
                                                <path d="M20.9735 11.4707L13.4717 18.9725M13.4717 11.4707L20.9735 18.9725" stroke="black" stroke-width="1.09402" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_dddd_778_15721" x="0.264957" y="0.452991" width="33.9144" height="38.8375" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="0.547009" />
                                                    <feGaussianBlur stdDeviation="0.547009" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.1 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_778_15721" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="1.64103" />
                                                    <feGaussianBlur stdDeviation="0.820513" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.09 0" />
                                                    <feBlend mode="normal" in2="effect1_dropShadow_778_15721" result="effect2_dropShadow_778_15721" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="3.82906" />
                                                    <feGaussianBlur stdDeviation="1.09402" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.05 0" />
                                                    <feBlend mode="normal" in2="effect2_dropShadow_778_15721" result="effect3_dropShadow_778_15721" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="7.11111" />
                                                    <feGaussianBlur stdDeviation="1.36752" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.01 0" />
                                                    <feBlend mode="normal" in2="effect3_dropShadow_778_15721" result="effect4_dropShadow_778_15721" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_778_15721" result="shape" />
                                                </filter>
                                                <clipPath id="clip0_778_15721">
                                                    <rect width="8.75214" height="8.75214" fill="white" transform="translate(12.8467 10.8457)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="14.7779" cy="14.2222" r="13.9487" fill="url(#paint0_linear_778_15726)" stroke="#DDCAED" stroke-width="0.547009" />
                                            <g clip-path="url(#clip0_778_15726)">
                                                <mask id="mask0_778_15726" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="6" y="7" width="17" height="17">
                                                    <path d="M6.57227 7.10732H22.9825V23.5176H6.57227V7.10732Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_778_15726)">
                                                    <path d="M7.89648 12.4281C7.89648 8.62826 13.1581 7.22 14.7771 11.6188C16.3961 7.22 21.6578 8.62826 21.6578 12.4281C21.6578 16.5566 14.7771 21.791 14.7771 21.791C14.7771 21.791 7.89648 16.5566 7.89648 12.4281Z" fill="white" />
                                                </g>
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_778_15726" x1="15.9229" y1="-1.18519" x2="15.9229" y2="31.4074" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#FC8C66" />
                                                    <stop offset="1" stop-color="#F76A7B" />
                                                </linearGradient>
                                                <clipPath id="clip0_778_15726">
                                                    <rect width="16.4103" height="16.4103" fill="white" transform="translate(6.57227 7.11133)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        Array(10).fill(0).map((_, i) => (
                            <div key={i} className={styles.message}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.39052 7.05752C4.63181 6.81623 4.96514 6.66699 5.33333 6.66699H26.6667C27.0349 6.66699 27.3682 6.81623 27.6095 7.05752M4.39052 7.05752C4.14924 7.2988 4 7.63214 4 8.00033V24.0003C4 24.7367 4.59695 25.3337 5.33333 25.3337H26.6667C27.403 25.3337 28 24.7367 28 24.0003V8.00033C28 7.63214 27.8508 7.2988 27.6095 7.05752M4.39052 7.05752L14.1144 16.7813C15.1558 17.8227 16.8442 17.8227 17.8856 16.7813L27.6095 7.05752" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div>
                                    <p style={{
                                        fontWeight: "500",
                                        color: "#6c6c6c"
                                    }}>You requested to chat with Vlada</p>
                                </div>
                                <div style={{ flexGrow: "1" }}></div>
                                <p style={{
                                    fontSize: "smaller",
                                    color: "#6c6c6c",
                                    fontWeight: "500"
                                }}>1 days ago</p>
                            </div>
                        ))
                    )
                }
            </div>
        </>
    )
}
