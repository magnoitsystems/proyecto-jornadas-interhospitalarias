'use client';

import { useEffect, useState } from 'react';
import RoundedCard from "@/components/RoundedCard/RoundedCard";
import { cactus } from "@/app/ui/fonts";
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";

const cardData = [
    { number: "0", title: "Inscriptos", borderColor: "linear-gradient(45deg, red, blue, green, yellow)" },
    { number: "0", title: "Edad +50" },
    { number: "0", title: "Edad -50" },
    { number: "0", title: "Mujeres" },
    { number: "0", title: "Hombres" },
];

export default function AdminPanel() {
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 728);
        };

        handleResize(); // set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cardData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
    };

    return (
        <main>
            <div className={styles.roundedCards}>
                {isMobile ? (
                    <div className={styles.sliderWrapper}>
                        <button className={styles.arrow} onClick={handlePrev} aria-label="Anterior">
                            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                            </svg>
                        </button>


                        <RoundedCard {...cardData[currentIndex]} />

                        <button className={styles.arrow} onClick={handleNext} aria-label="Siguiente">
                            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.12 4.12 6.71 5.54 13.17 12l-6.46 6.46 1.41 1.41L16 12z" />
                            </svg>
                        </button>

                    </div>
                ) : (
                    cardData.map((card, index) => (
                        <RoundedCard key={index} {...card} />
                    ))
                )}
            </div>
            <h1 className= {`${styles.titleProperties} ${cactus.className}`}>
                Registros de inscripción
            </h1>
            <aside className={styles.aside}>
                <GroupFilters/>
            </aside>
        </main>
    );
}
