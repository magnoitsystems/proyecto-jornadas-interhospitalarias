import styles from './guest.module.css';
import { Professional } from '../../types'; 
import React from 'react';
import { cactus } from '../../app/(views)/ui/fonts';

type ProfessionalCardProps = {
    professional: Professional;
};

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {

    const { nombre, apellido, profesion, especializacion, lugarEjerce, origen } = professional;

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