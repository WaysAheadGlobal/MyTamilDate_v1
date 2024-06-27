import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/sidebar';
import Card from '../components/card/Card';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [arr, setArr] = useState(Array.from({ length: 4 }, (_, i) => i + 1));

    useEffect(() => {
        if (arr.length === 0) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
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
    }, [arr]);

    useEffect(() => {
        if (arr.length === 0) return;

        const lastCardObserver = new IntersectionObserver(entries => {
            const lastCard = entries[0];

            if (!lastCard.isIntersecting) return;
            fetchNewCard();
        });
        lastCardObserver.observe(Array(...document.querySelectorAll('.card-container')).at(-1));
        return () => {
            lastCardObserver.disconnect()
        };
    }, [arr])

    const fetchNewCard = useCallback(async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(() => { resolve(true) }, 1000));
        setArr(prev => [...prev, Array.from({ length: 4 }, (_, i) => i + prev.length + 1)]);
        setLoading(false);
        window.scrollTo(0, document.body.scrollHeight);
    })

    return (
        <Sidebar>
            <div style={{
                flex: "1",
                marginInline: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflowY: "auto",
                scrollbarWidth: "none"
            }}>
                {
                    arr.map((item) => (
                        <Card key={item} />
                    ))
                }
                {
                    loading && <p>Loading...</p>
                }
            </div>
        </Sidebar>
    )
}
