import styles from './guest.module.css';
import { Professional } from '../../types'; 
import React from 'react';
import { cactus } from '../../app/(views)/ui/fonts';

type ProfessionalCardProps = {
    professional: Professional;
};

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {

    const { nombre, apellido} = professional;

    return (
        <main className={styles.card}>
            <div className={`${styles.infoContainer} ${cactus.className}`}>
                <h1>{`${nombre} ${apellido}`}</h1>
            </div>
        </main>
    );
};

export default ProfessionalCard;