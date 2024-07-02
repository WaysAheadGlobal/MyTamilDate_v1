import React from 'react'
import styles from './others.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Others() {
    const navigate = useNavigate();
    const searchParams = useSearchParams();

    return (
        <>
            <ul className={styles.nav}>
                {/* <li
                    onClick={() => navigate("?t=r")}
                    className={(searchParams[0].get("t") === "r" || !searchParams[0].get("t")) ? styles.active : ""}
                >
                    Reject
                    <div className={styles.indicator}></div>
                </li>
                <li
                    onClick={() => navigate("?t=b")}
                    className={searchParams[0].get("t") === "b" ? styles.active : ""}
                >
                    Blocked
                    <div className={styles.indicator}></div>
                </li> */}

                <Dropdown
                    as="li"
                    className={(searchParams[0].get("t") === "r" || !searchParams[0].get("t")) ? styles.active : ""}
                >
                    <Dropdown.Toggle as="p">
                        Reject
                    </Dropdown.Toggle>
                    <div className={styles.indicator}></div>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("?t=r&b=u")}>Rejected by you</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("?t=r&b=t")}>Rejected by them</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                    as="li"
                    className={searchParams[0].get("t") === "b" ? styles.active : ""}
                >
                    <Dropdown.Toggle as="p">
                        Blocked
                    </Dropdown.Toggle>
                    <div className={styles.indicator}></div>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("?t=b&b=u")}>Blocked by you</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("?t=b&b=t")}>Blocked by them</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
