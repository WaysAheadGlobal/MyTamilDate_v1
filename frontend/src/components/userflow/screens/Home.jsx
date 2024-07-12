import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../api';
import { useCookies } from '../../../hooks/useCookies';
import Card from '../components/card/Card';
import Sidebar from '../components/sidebar/sidebar';
import { useSearchParams } from 'react-router-dom';
import { useUserProfile } from '../components/context/UserProfileContext';
/* import { Modal } from 'react-bootstrap';
import Button from '../components/button/Button'; */

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const cookies = useCookies();
    const [wave, setWave] = useState(1);

    /**
     * @typedef {Object} Profile
     * @property {number} id - The unique identifier for the user.
     * @property {number} user_id - The user ID associated with the user.
     * @property {string} first_name - The first name of the user.
     * @property {string} last_name - The last name of the user.
     * @property {string} birthday - The birthday of the user in ISO format.
     * @property {string} hash - A hash string associated with the user.
     * @property {string} extension - The file extension of the user's profile picture.
     * @property {number} type - The type of user.
     * @property {number} location_id - The location ID associated with the user.
     * @property {number} job_id - The job ID associated with the user.
     * @property {string} country - The country of the user.
     * @property {string} continent - The continent of the user.
     * @property {string} location_string - The location string of the user.
     * @property {string} job - The job of the user.
     * @property {string} created_at - The creation timestamp of the user record in ISO format.
     * @property {boolean} like - The like status of the user.
     */

    /**
     * @type {[Profile[], React.Dispatch<React.SetStateAction<Profile[]>>]}
     */

    const { profiles, setProfiles } = useUserProfile();
    const [abortController, setAbortController] = useState(new AbortController());
    /* const [show, setShow] = useState(true); */

    useEffect(() => {
        const storedWave = cookies.getCookie('wave');

        if (storedWave) {
            abortController.abort();
            setAbortController(new AbortController());
            setWave(Number(storedWave));
        }
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const response = await fetch(`${API_URL}customer/user/profiles?page=${page}&wave=${wave}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.getCookie('token')}`,
                },
                signal: abortController.signal
            });
            const data = await response.json();
            if (!data) return;
            console.log(data)

            if (response.ok) {
                if (data.length === 0 && wave < 3) {
                    setWave(wave + 1);
                    cookies.setCookie('wave', wave + 1);
                }
                setProfiles([...profiles, ...data]);
            }

            setLoading(false);
        })()
    }, [page, wave]);

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
                style={{
                    flex: "1",
                    marginInline: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                }}
            >
                {
                    profiles.slice(0, 1).map((profile) => (
                        <Card key={profile.user_id} {...profile} setPage={setPage} />
                    ))
                }
                {
                    loading && <p>Loading...</p>
                }
            </div>
        </Sidebar>
    )
}