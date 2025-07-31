'use client';

import { useEffect } from 'react';
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './Banner.module.css';

type Props = {
    tipo: 'success' | 'error';
    mensaje: string;
    onClose: () => void;
    autoClose?: boolean;
    duracion?: number;
}

export default function Banner({ tipo, mensaje, onClose, autoClose = true, duracion = 4000 } : Props) {
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(onClose, duracion);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duracion, onClose]);

    return(
        <main className={`${styles.banner} ${styles[tipo]} ${cactus.className}`}>
            <span>{mensaje}</span>
            <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Cerrar"
            >
            ×
            </button>
        </main>
    )
}