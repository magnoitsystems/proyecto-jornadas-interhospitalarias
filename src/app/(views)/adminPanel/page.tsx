'use client';

import { useEffect, useState } from 'react';
import RoundedCard from "@/components/RoundedCard/RoundedCard";
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";
import UserCard from "@/components/UserCard/UserCard";
import useUsers, { User } from '@/hooks/useUsers';

const cardData = [
    { number: "0", title: "Inscriptos", borderColor: "linear-gradient(45deg, red, blue, green, yellow)" },
    { number: "0", title: "Mujeres" },
    { number: "0", title: "Hombres" },
    { number: "0", title: "Estudiante" },
    { number: "0", title: "Médico" },
    { number: "0", title: "Enfermero" },
    { number: "0", title: "Técnico" },
    { number: "0", title: "Otros" },
];

export default function AdminPanel() {
    const { users, getAllUsers, loading, error } = useUsers();
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

    useEffect(() => {
        getAllUsers();
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
            <div className={`${styles.seeCards} ${cactus.className}`}>
                <h1>Ver</h1>
                <select name="cards" id="cards">
                    <option value="registro">Registro de inscriptos</option>
                    <option value="sin">Manuscritos SIN opción a premio</option>
                    <option value="con">Manuscritos CON opción a premio</option>
                </select>
            </div>
            <section className={styles.containerContent}>
                <aside className={styles.aside}>
                    <GroupFilters />
                </aside>
                <section className={styles.containerUserCard}>
                    {loading && <p>Cargando usuarios...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!loading && !error && users.length === 0 && <p>No hay usuarios para mostrar.</p>}

                    {!loading && users.map((user: User) => (
                        <UserCard
                            key={user.id}
                            image={user.admin ? "/icons/autoridades.png" : undefined} // icono si admin
                            name={user.name}
                            surname={user.lastname}
                            profession={user.job}
                            age={user.age}
                            gender={user.gender}
                            specialty={user.specialty || ""}
                            typeCard="user"
                        />
                    ))}
                </section>
            </section>
        </main>
    );
}
