'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './FilterView.module.css';

// Definimos los tipos para las props
type Option = {
    value: string;
    label: string;
};

type CustomSelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Encuentra la etiqueta del valor seleccionado para mostrarla
    const selectedLabel = options.find(option => option.value === value)?.label;

    // Cierra el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.customSelectContainer} ref={selectRef}>
            <button
                type="button"
                className={styles.selectTrigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selectedLabel}</span>
                <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▼</span>
            </button>
            {isOpen && (
                <ul className={styles.optionsList} role="listbox">
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={`${styles.option} ${option.value === value ? styles.optionSelected : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;