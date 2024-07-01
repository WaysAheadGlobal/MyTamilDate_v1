import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../api';
import { useCookies } from '../../../hooks/useCookies';
import Card from '../components/card/Card';
import Sidebar from '../components/sidebar/sidebar';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const cookies = useCookies();

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
     */

    /**
     * @type {[Profile[], React.Dispatch<React.SetStateAction<Profile[]>>]}
     */
    const [profiles, setProfiles] = useState([]);
    
    useEffect(() => {
        (async () => {
            setLoading(true);

            const response = await fetch(`${API_URL}customer/user/profiles?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.getCookie('token')}`,
                },
            });
            const data = await response.json();
            if (!data) return;

            if (response.ok) {
                setProfiles([...profiles, ...data]);
                console.log(data);
            }

            setLoading(false);
        })()
    }, [page]);

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

    useEffect(() => {
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

    return (
        <Sidebar>
            <div
                style={{
                    flex: "1",
                    marginInline: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                    scrollbarWidth: "none"
                }}
            >
                {
                    profiles.map((profile) => (
                        <Card key={profile.user_id} {...profile} />
                    ))
                }
                {
                    loading && <p>Loading...</p>
                }
            </div>
        </Sidebar>
    )
}