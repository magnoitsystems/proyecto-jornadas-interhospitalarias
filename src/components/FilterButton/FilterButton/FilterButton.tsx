'use client';

import styles from './filterButton.module.css'
import {useState} from "react";
import { cactus } from "@/app/ui/fonts";

// import {MouseEventHandler} from "react";

interface FilterButtonProps {
    label: string;
    initialState?: boolean;
    onChange?: (isActive: boolean) => void;
    disabled?: boolean;
}

export default function FilterButton({
    label,
    initialState = false,
}: FilterButtonProps) {

    const [isActive, setIsActive] = useState(initialState);

    return (
        <button
            className={`
            ${styles.button} 
            ${isActive ? styles.active : ''} 
            `}
            onClick={() => {setIsActive(!isActive)}}
        >
            <span className={styles.label}>{label}</span>
            <div className={`${styles.switch} ${isActive ? styles.active : ''}`}>
                <div className={styles.slider}>
                    <div className={styles.knob}></div>
                </div>
            </div>
        </button>
    )
}

