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
            {/*<div className={styles.section}>*/}
            {/*    <h4>EVENTOS A REALIZAR</h4>*/}
            {/*    <ul>*/}
            {/*        {eventos.map((evento, index) => (*/}
            {/*            <li key={index}>{evento}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {/*<div className={styles.section}>*/}
            {/*    <h4>INVITADOS DEL DÍA</h4>*/}
            {/*    <ul>*/}
            {/*        {invitados.map((invitado, index) => (*/}
            {/*            <li key={index}>{invitado}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}

            {/*<div className={styles.section}>*/}
            {/*    <h4>COORDINADORES ASIGNADOS</h4>*/}
            {/*    <ul>*/}
            {/*        {coordinadores.map((coordinador, index) => (*/}
            {/*            <li key={index}>{coordinador}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </main>
    )
}