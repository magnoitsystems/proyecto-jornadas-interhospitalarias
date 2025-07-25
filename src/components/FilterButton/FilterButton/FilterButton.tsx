// src/components/FilterButton/FilterButton.tsx

'use client';

import styles from './filterButton.module.css';
import { useState } from "react";
import { cactus } from '@/app/(views)/ui/fonts';

interface FilterButtonProps {
    label: string;
    initialState?: boolean;
    onChange?: (isActive: boolean) => void
    disabled?: boolean;
}

export default function FilterButton({
                                         label,
                                         initialState = true,
                                         onChange,
                                     }: FilterButtonProps) {

    const [isActive, setIsActive] = useState(initialState);

    const handleClick = () => {
        const newActiveState = !isActive;
        setIsActive(newActiveState); // Actualiza el estado visual interno
        onChange?.(newActiveState); // Notifica al padre del cambio
    };

    return (
        <button
            className={`
            ${styles.button} 
            ${cactus.className}
            ${isActive ? styles.active : ''} 
            `}
            onClick={handleClick}
        >
            <span className={styles.label}>{label}</span>
            <div className={`${styles.switch} ${isActive ? styles.active : ''}`}>
                <div className={styles.slider}>
                    <div className={styles.knob}></div>
                </div>
            </div>
        </button>
    );
}