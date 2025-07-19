'use client'

import styles from './programSummery.module.css';
import { cactus } from '@/app/(views)/ui/fonts';
import { useState } from 'react';
import TableSummary from "@/components/programa/TableSummary/TableSummary";
import SummaryCard from "@/components/SummaryCard/SummaryCard";

type Props = {
    date: string;
    eventos: string[];
    invitados: string[];
    coordinadores: string[];
    day: string;
}

export default function Summary({date, eventos, invitados, coordinadores, day}: Props) {
    const [mostrarHorario, setMostrarHorario] = useState(false);

    return(
        <main className={`${styles.main} ${cactus.className}`}>
            <div className={styles.date}>
                <h3>{date}</h3>
                <h3 className={styles.desplegable}
                    onClick={() => setMostrarHorario(!mostrarHorario)}
                    style={{cursor: 'pointer'}}>
                    {mostrarHorario ? 'Ocultar horarios -' : 'Ver horarios +'}
                </h3>
            </div>
            <div className={mostrarHorario ? styles.visible : styles.notVisible}>
                <TableSummary day={day} />
            </div>
            <div>
                <SummaryCard eventos={eventos} invitados={invitados} coordinadores={coordinadores}/>
            </div>
        </main>
    )
}