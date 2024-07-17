import React, { useEffect } from 'react';
import Card from '../components/card/Card';
import { useUserProfile } from '../components/context/UserProfileContext';
import Sidebar from '../components/sidebar/sidebar';
import styles from './home.module.css';

export default function Home() {   
    const {
        profiles,
        setProfiles,
        abortController,
        setAbortController,
        wave,
        setWave,
        page,
        setPage,
        loading,
        setLoading
    } = useUserProfile();

    useEffect(() => {
        if (profiles.length === 0) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.target.classList.contains('show')) return;

                entry.target.classList.toggle('show', entry.isIntersecting);
                if (entry.isIntersecting) observer.unobserve(entry.target);
            })
        }, {
            threshold: 0.2,
            root: document.querySelector('.children')
        });
        const cards = document.querySelectorAll('.card-container');
        cards.forEach(card => {
            observer.observe(card);
        });

        return () => {
            observer.disconnect()
        };
    }, [profiles]);

    /* useEffect(() => {
        if (profiles.length === 0) return;

        const lastCardObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0];

            if (!lastCard.isIntersecting) return;

            setPage(page + 1);
        });
        lastCardObserver.observe(Array(...document.querySelectorAll('.card-container')).at(-1));
        return () => {
            lastCardObserver.disconnect()
        };
    }, [profiles])
 */
    return (
        <Sidebar>
            {/* <Modal centered show={show}>
                <Modal.Body>
                    {
                        wave === 2 && (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "large",
                                    fontWeight: "600",

                                }}
                            >
                                We've shown you the users who meet your criteria. Let's help you discover some other awesome users you may not have considered!
                            </p>
                        )
                    }
                    {
                        wave === 3 && (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "large",
                                    fontWeight: "600",

                                }}
                            >
                                We've shown you the users who meet your criteria. Let's help you discover some other awesome users you may not have considered!
                            </p>
                        )
                    }
                </Modal.Body>
                <Button style={{
                    borderRadius: "9999px",
                    marginTop: "3rem",
                    marginInline: "auto",
                }} onClick={() => setShow(false)}>Close</Button>
            </Modal> */}
            <div
                className={styles.container}
            >
                {
                    profiles.slice(0, 1).map((profile) => (
                        <Card key={profile.user_id} {...profile} setPage={setPage} />
                    ))
                }
                {
                    loading && <p style={{ textAlign: "center" }}>Loading...</p>
                }
            </div>
        </Sidebar>
    )
}

