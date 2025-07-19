'use client';

import { useEffect, useState } from 'react';
import RoundedCard from "@/components/RoundedCard/RoundedCard";
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";
import UserCard from "@/components/UserCard/UserCard";

const cardData = [
    { number: "0", title: "Inscriptos", borderColor: "linear-gradient(45deg, red, blue, green, yellow)" },
    { number: "0", title: "Mujeres" },
    { number: "0", title: "Hombres" },
    { number: "0", title: "Estudiante" },
    { number: "0", title: "Médico" },
    { number: "0", title: "Enfermero" },
    { number: "0", title: "Técnico" },
    // { number: "0", title: "Kinesiólogos" },
    // { number: "0", title: "Fonoaudiólogo" },
    { number: "0", title: "Otros" },
    // { number: "0", title: "No pertenecientes a la salud" },
];

const userCardData = [
    {
        id: 1,
        image: "/icons/autoridades.png",
        name: "María",
        surname: "González",
        profession: "Médica",
        age: 34,
        genero: "Femenino",
        specialty: "Pediatra"
    },
    {
        id: 2,
        image: "/icons/autoridades.png",
        name: "Carlos",
        surname: "Mendoza",
        profession: "Médico",
        age: 45,
        genero: "Masculino",
        specialty: "Cardiólogo"
    },
    {
        id: 3,
        image: "/icons/autoridades.png",
        name: "Ana",
        surname: "Pérez",
        profession: "Médica",
        age: 38,
        genero: "Femenino",
        specialty: "Neuróloga"
    },
    {
        id: 4,
        image: "/icons/autoridades.png",
        name: "Luis",
        surname: "Rodríguez",
        profession: "Médico",
        age: 42,
        genero: "Masculino",
        specialty: "Ginecólogo"
    },
    {
        id: 5,
        image: "/icons/autoridades.png",
        name: "Carmen",
        surname: "Silva",
        profession: "Médica",
        age: 29,
        genero: "Femenino",
        specialty: "Dermatóloga"
    },
    {
        id: 6,
        image: "/icons/autoridades.png",
        name: "Roberto",
        surname: "Morales",
        profession: "Médico",
        age: 51,
        genero: "Masculino",
        specialty: "Traumatólogo"
    },
    {
        id: 7,
        image: "/icons/autoridades.png",
        name: "Isabel",
        surname: "Vargas",
        profession: "Médica",
        age: 39,
        genero: "Femenino",
        specialty: "Psiquiatra"
    },
    {
        id: 8,
        image: "/icons/autoridades.png",
        name: "Fernando",
        surname: "Castro",
        profession: "Médico",
        age: 47,
        genero: "Masculino",
        specialty: "Oftalmólogo"
    },
    {
        id: 9,
        image: "/icons/autoridades.png",
        name: "Patricia",
        surname: "Ramos",
        profession: "Médica",
        age: 36,
        genero: "Femenino",
        specialty: "Endocrinóloga"
    },
    {
        id: 10,
        image: "/icons/autoridades.png",
        name: "Miguel",
        surname: "Torres",
        profession: "Médico",
        age: 44,
        genero: "Masculino",
        specialty: "Urólogo"
    }
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
                Registros de Inscriptos
            </h1>
            <section className={styles.containerContent}>
                <aside className={styles.aside}>
                    <GroupFilters/>
                </aside>
                <section className={styles.containerUserCard}>
                    {userCardData.map((user) => (
                        <UserCard
                            key={user.id}
                            image={user.image}
                            name={user.name}
                            surname={user.surname}
                            profession={user.profession}
                            age={user.age}
                            gender={user.genero}
                            specialty={user.specialty}
                        />
                    ))}
                </section>
            </section>
        </main>
    );
}
