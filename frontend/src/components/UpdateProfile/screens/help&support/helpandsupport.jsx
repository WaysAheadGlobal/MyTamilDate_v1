import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './helpandsupport.module.css'; // Import the custom CSS as a module
import Sidebar from '../../../userflow/components/sidebar/sidebar';
import './helpsupport.css';
import backarrow from "../../../../assets/images/backarrow.jpg";
import { Image } from 'react-bootstrap';

const HelpSupport = () => {

    return (
        <Sidebar>
            <div style={{
                flex: "1",
                marginInline: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflowY: "auto",
                scrollbarWidth: "none",
                width: "-webkit-fill-available",
                padding: "2rem"
            }}>
                <div className={styles.helpSupportSection}>
                    <div className={styles.logoarrow}>
                        <Image src={backarrow} className={styles.backarrow} onClick={() => window.history.back()} alt="Back Arrow" />
                        <div className={styles.helpSupportTitle}>Help & Support</div>
                    </div>
                    <div className="accordion accordion-flush" id="accordionHelpSupport">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    About myTamilDate
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>What is myTamilDate?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>How's myTamilDate different from other dating services?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                        
                                    </div>
                                    <div className={styles.accordionItemContent}>Have people found love on myTamilDate?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>Do I have to be Tamil to use myTamilDate?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>Is myTamilDate available in my country?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Getting Started
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>How can I quickly access myTamilDate from my phone like I do with other apps?
                                    <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingThree">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    Matching and Messaging
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>Share your success story.
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>How come I can't message someone?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>How do I view who liked me?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>Why did one of my matches disappear?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingFour">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                    Browsing
                                </button>
                            </h2>
                            <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>I keep seeing people I've x'd.
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>There aren't enough people in my area.
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingFive">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                    Profile and Account Settings
                                </button>
                            </h2>
                            <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>How do I edit my profile?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>I want to delete my account.
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingSix">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                    Premium Memberships
                                </button>
                            </h2>
                            <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>What do I get with a Premium Membership?  <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>How can I upgrade my membership?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>How can I pay for my Premium Membership?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>Can I give someone a premium membership to myTamilDate as a gift?
                                    <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>How can I cancel my Premium Membership subscription?
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>I canceled my membership, but was charged again anyway.
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>I'd like a refund.</div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingSeven">
                                <button style={{ width: "100%", borderRadius  : "36px" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                    Get in touch
                                </button>
                            </h2>
                            <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionHelpSupport">
                                <div className="accordion-body">
                                    <div className={styles.accordionItemContent}>Contact us
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                    <div className={styles.accordionItemContent}>Report Technical Issue
                                        <span style={{ display: "flex", justifyContent: "flex-end" }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.33398 14.1654L12.5007 9.9987L8.33398 5.83203" stroke="#6C6C6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default HelpSupport;
