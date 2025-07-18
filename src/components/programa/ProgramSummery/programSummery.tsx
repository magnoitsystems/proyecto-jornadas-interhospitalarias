'use client'

import styles from './programSummery.module.css';
import { cactus } from '../../../app/(views)/ui/fonts';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
    date: string;
    eventos: string[];
    invitados: string[];
    coordinadores: string[];
    imgSrc: string;
}

export default function Summary({date, eventos, invitados, coordinadores, imgSrc}: Props) {
    const [mostrarHorario, setMostrarHorario] = useState(false);

    return(
        <main className={`${styles.main} ${cactus.className}`}>
            <div className={styles.date}>
                <h3>{date}</h3>
                <h3 className={styles.desplegable}
                    onClick={() => setMostrarHorario(!mostrarHorario)}
                    style={{ cursor: 'pointer' }}>
                    {mostrarHorario ? 'Ocultar horarios -' : 'Ver horarios +'}
                </h3>
            </div>

            <div className={styles.section}>
                <h4>EVENTOS A REALIZAR</h4>
                <ul>
                    {eventos.map((evento, index) => (
                        <li key={index}>{evento}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.section}>
                <h4>INVITADOS DEL DÍA</h4>
                <ul>
                    {invitados.map((invitado, index) => (
                        <li key={index}>{invitado}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.section}>
                <h4>COORDINADORES ASIGNADOS</h4>
                <ul>
                    {coordinadores.map((coordinador, index) => (
                        <li key={index}>{coordinador}</li>
                    ))}
                </ul>
            </div>

            <Image
                src={imgSrc}
                alt={'cronograma del dia'}
                width={0}
                height={0}
                sizes="95vw"
                style={{ width: '95%', height: 'auto' }}
                className={`${styles.schedule} ${mostrarHorario ? styles.visible : ''}`}
            />
        </main>
    )
}