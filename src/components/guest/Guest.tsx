// app/components/ProfessionalCard.tsx
import Image from 'next/image';
import styles from './page.module.css';
import { Professional } from '../../types'; // Importamos nuestro tipo
import React from 'react';
import { cactus } from '../../app/(views)/ui/fonts';

// Un componente SVG para el ícono de "incógnito"
const UserIcon = () => (
    // ... (El código del SVG es el mismo que antes, lo omito por brevedad)
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.placeholderIcon}><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>
);

// Definimos los props que espera nuestro componente
type ProfessionalCardProps = {
    professional: Professional;
};

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {

    const { nombre, apellido, imagen, profesion, especializacion, lugarEjerce, origen } = professional;

    return (
        <main className={styles.card}>
            <div className={`${styles.infoContainer} ${cactus.className}`}>
                <h1>{`${nombre} ${apellido}`}</h1>
            </div>
            <div className={`${styles.info} ${cactus.className}`}>
                <h5> Profesión-es/Cursos/Estudios: {profesion}</h5>
                <h5> Especialización-es: {especializacion}</h5>
                <h5> Lugar donde ejerce: {lugarEjerce}</h5>
                <h5> Desde dónde viene: {`${origen.ciudad}, ${origen.provincia}, ${origen.pais}`}</h5>
            </div>
        </main>
    );
};

export default ProfessionalCard;