import React from 'react';
import './card.css';
import cardImage from '../../../../assets/images/cardImage.png';

export default function Card() {
    return (
        <div className='card-container' style={{
            backgroundImage: `url(${cardImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div>
                <div className='details'>
                    <p style={{ gridColumn: "span 2 / span 2", textAlign: "center" }}>Aishwarya, 31</p>
                    <p style={{ position: "relative", left: "20px" }}>Model</p>
                    <p>Toronto, Canada</p>
                </div>
                <div className='options'>
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25.2267" cy="25.2267" r="24.596" transform="matrix(-1 0 0 1 50.9219 0.09375)" fill="#4B164C" stroke="#DDCAED" stroke-width="1.26133" />
                        <g clip-path="url(#clip0_969_22038)">
                            <path d="M33.8701 24.1495H20.0188L24.2583 19.0574C24.4565 18.8189 24.5519 18.5115 24.5234 18.2026C24.4949 17.8938 24.3449 17.6089 24.1064 17.4107C23.8679 17.2125 23.5604 17.1171 23.2516 17.1456C22.9428 17.174 22.6579 17.324 22.4597 17.5625L16.6202 24.5699C16.5809 24.6257 16.5458 24.6842 16.5151 24.7451C16.5151 24.8035 16.5151 24.8386 16.4333 24.897C16.3804 25.0309 16.3527 25.1734 16.3516 25.3174C16.3527 25.4614 16.3804 25.6039 16.4333 25.7378C16.4333 25.7962 16.4333 25.8313 16.5151 25.8897C16.5458 25.9506 16.5809 26.0091 16.6202 26.0649L22.4597 33.0723C22.5695 33.2041 22.707 33.3101 22.8624 33.3828C23.0179 33.4555 23.1874 33.493 23.359 33.4927C23.6319 33.4932 23.8963 33.3982 24.1064 33.2241C24.2247 33.126 24.3224 33.0056 24.3941 32.8697C24.4657 32.7339 24.5099 32.5852 24.524 32.4322C24.5381 32.2793 24.5219 32.125 24.4763 31.9783C24.4307 31.8316 24.3566 31.6954 24.2583 31.5773L20.0188 26.4853H33.8701C34.1798 26.4853 34.4769 26.3623 34.6959 26.1432C34.9149 25.9242 35.038 25.6271 35.038 25.3174C35.038 25.0076 34.9149 24.7106 34.6959 24.4916C34.4769 24.2725 34.1798 24.1495 33.8701 24.1495Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_969_22038">
                                <rect width="28.0296" height="28.0296" fill="white" transform="translate(11.6797 11.3047)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="33.4665" cy="33.322" r="32.164" fill="white" stroke="white" stroke-width="1.26133" />
                        <g clip-path="url(#clip0_969_22045)">
                            <mask id="mask0_969_22045" style={{ maskType: " luminance" }} maskUnits="userSpaceOnUse" x="14" y="16" width="39" height="39">
                                <path d="M14.5469 16.9256H52.3869V54.7656H14.5469V16.9256Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_969_22045)">
                                <path d="M17.6016 29.1994C17.6016 20.4374 29.7343 17.1901 33.4675 27.3332C37.2007 17.1901 49.3334 20.4374 49.3334 29.1994C49.3334 38.7191 33.4675 50.7891 33.4675 50.7891C33.4675 50.7891 17.6016 38.7191 17.6016 29.1994Z" fill="url(#paint0_linear_969_22045)" />
                            </g>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_969_22045" x1="34.7448" y1="52.0282" x2="34.7448" y2="17.9517" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FC8C66" />
                                <stop offset="1" stop-color="#F76A7B" />
                            </linearGradient>
                            <clipPath id="clip0_969_22045">
                                <rect width="37.84" height="37.84" fill="white" transform="translate(14.5469 16.9219)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32.8025" cy="33.322" r="32.164" fill="white" stroke="white" stroke-width="1.26133" />
                        <g clip-path="url(#clip0_969_22053)">
                            <path d="M41.4545 24.6641L24.1562 41.9623M24.1562 24.6641L41.4545 41.9623" stroke="url(#paint0_linear_969_22053)" stroke-width="2.52267" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_969_22053" x1="33.5017" y1="23.9433" x2="33.5017" y2="43.7643" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FC8C66" />
                                <stop offset="1" stop-color="#F76A7B" />
                            </linearGradient>
                            <clipPath id="clip0_969_22053">
                                <rect width="20.1813" height="20.1813" fill="white" transform="translate(22.7109 23.2305)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dddd_969_22058)">
                            <circle cx="31.5782" cy="27.3204" r="25.2267" fill="#4B164C" />
                        </g>
                        <path d="M31.582 28.4725C32.227 28.4725 32.7499 27.9496 32.7499 27.3046C32.7499 26.6596 32.227 26.1367 31.582 26.1367C30.9369 26.1367 30.4141 26.6596 30.4141 27.3046C30.4141 27.9496 30.9369 28.4725 31.582 28.4725Z" fill="white" />
                        <path d="M36.2538 28.4725C36.8989 28.4725 37.4217 27.9496 37.4217 27.3046C37.4217 26.6596 36.8989 26.1367 36.2538 26.1367C35.6088 26.1367 35.0859 26.6596 35.0859 27.3046C35.0859 27.9496 35.6088 28.4725 36.2538 28.4725Z" fill="white" />
                        <path d="M26.9101 28.4725C27.5551 28.4725 28.078 27.9496 28.078 27.3046C28.078 26.6596 27.5551 26.1367 26.9101 26.1367C26.2651 26.1367 25.7422 26.6596 25.7422 27.3046C25.7422 27.9496 26.2651 28.4725 26.9101 28.4725Z" fill="white" />
                        <path d="M39.8392 19.0531C37.9229 17.1243 35.3937 15.9245 32.6877 15.6606C29.9816 15.3967 27.2683 16.0852 25.0154 17.6074C22.7626 19.1296 21.1114 21.3901 20.3466 23.9992C19.5818 26.6083 19.7512 29.4025 20.8257 31.9C20.9377 32.1322 20.9745 32.3935 20.9308 32.6475L19.9031 37.5877C19.8635 37.7771 19.8716 37.9734 19.9266 38.1589C19.9817 38.3444 20.0819 38.5133 20.2184 38.6505C20.3303 38.7616 20.4635 38.8488 20.6101 38.9071C20.7566 38.9653 20.9134 38.9932 21.071 38.9892H21.3046L26.3032 37.9848C26.5572 37.9542 26.8149 37.9905 27.0506 38.0899C29.5482 39.1644 32.3424 39.3338 34.9515 38.569C37.5606 37.8042 39.8211 36.153 41.3433 33.9002C42.8654 31.6473 43.5539 28.934 43.29 26.228C43.0261 23.5219 41.8263 20.9927 39.8976 19.0765L39.8392 19.0531ZM40.8085 28.8168C40.5802 30.2112 40.0385 31.5357 39.2243 32.6906C38.4101 33.8454 37.3446 34.8006 36.1079 35.4841C34.8712 36.1677 33.4956 36.5618 32.0845 36.6369C30.6735 36.712 29.2638 36.4661 27.9616 35.9176C27.4997 35.7212 27.0036 35.618 26.5017 35.6139C26.2825 35.6155 26.0637 35.635 25.8477 35.6723L22.5542 36.338L23.2199 33.0446C23.3525 32.3313 23.267 31.5946 22.9747 30.9307C22.4262 29.6284 22.1803 28.2187 22.2553 26.8077C22.3304 25.3967 22.7246 24.0211 23.4081 22.7844C24.0917 21.5477 25.0468 20.4822 26.2017 19.6679C27.3566 18.8537 28.681 18.3121 30.0755 18.0837C31.5392 17.8435 33.0391 17.9552 34.451 18.4097C35.863 18.8641 37.1465 19.6481 38.1953 20.697C39.2441 21.7458 40.0282 23.0293 40.4826 24.4412C40.937 25.8532 41.0487 27.3531 40.8085 28.8168Z" fill="white" />
                        <defs>
                            <filter id="filter0_dddd_969_22058" x="0.0448956" y="0.832417" width="63.0665" height="74.4185" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="1.26133" />
                                <feGaussianBlur stdDeviation="1.26133" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.1 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_969_22058" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="3.784" />
                                <feGaussianBlur stdDeviation="1.892" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.09 0" />
                                <feBlend mode="normal" in2="effect1_dropShadow_969_22058" result="effect2_dropShadow_969_22058" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="8.82933" />
                                <feGaussianBlur stdDeviation="2.52267" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.05 0" />
                                <feBlend mode="normal" in2="effect2_dropShadow_969_22058" result="effect3_dropShadow_969_22058" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="16.3973" />
                                <feGaussianBlur stdDeviation="3.15333" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0 0.388235 0 0 0 0.01 0" />
                                <feBlend mode="normal" in2="effect3_dropShadow_969_22058" result="effect4_dropShadow_969_22058" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_969_22058" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className='menu'>
                <div>
                    <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.45313 7.23751L13.0211 7.23751M13.0211 7.23751C13.0211 8.63074 14.1506 9.76018 15.5438 9.76018C16.937 9.76018 18.0665 8.63074 18.0665 7.23751M13.0211 7.23751C13.0211 5.84428 14.1506 4.71484 15.5438 4.71484C16.937 4.71484 18.0665 5.84428 18.0665 7.23751M18.0665 7.23751L25.6345 7.23751M5.45313 16.0668H20.5891M20.5891 16.0668C20.5891 17.4601 21.7186 18.5895 23.1118 18.5895C24.505 18.5895 25.6345 17.4601 25.6345 16.0668C25.6345 14.6736 24.505 13.5442 23.1118 13.5442C21.7186 13.5442 20.5891 14.6736 20.5891 16.0668ZM10.4985 24.8962H25.6345M10.4985 24.8962C10.4985 23.5029 9.36902 22.3735 7.97579 22.3735C6.58256 22.3735 5.45312 23.5029 5.45312 24.8962C5.45313 26.2894 6.58256 27.4188 7.97579 27.4188C9.36902 27.4188 10.4985 26.2894 10.4985 24.8962Z" stroke="white" stroke-width="1.892" stroke-linecap="round" />
                    </svg>
                </div>
                <div>
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8117 6.78086C16.8117 6.08425 16.247 5.51953 15.5504 5.51953C14.8538 5.51953 14.2891 6.08425 14.2891 6.78086C14.2891 7.47748 14.8538 8.0422 15.5504 8.0422C16.247 8.0422 16.8117 7.47748 16.8117 6.78086Z" stroke="white" stroke-width="1.892" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.8117 15.6102C16.8117 14.9136 16.247 14.3489 15.5504 14.3489C14.8538 14.3489 14.2891 14.9136 14.2891 15.6102C14.2891 16.3068 14.8538 16.8715 15.5504 16.8715C16.247 16.8715 16.8117 16.3068 16.8117 15.6102Z" stroke="white" stroke-width="1.892" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.8117 24.4395C16.8117 23.7429 16.247 23.1782 15.5504 23.1782C14.8538 23.1782 14.2891 23.7429 14.2891 24.4395C14.2891 25.1361 14.8538 25.7009 15.5504 25.7009C16.247 25.7009 16.8117 25.1361 16.8117 24.4395Z" stroke="white" stroke-width="1.892" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
