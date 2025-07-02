import styles from './programSummery.module.css';
import {cactus} from "@/app/ui/fonts";

type Props = {
    date: string;
    eventos: string[];
    invitados: string[];
    coordinadores: string[];
}

export default function Summary({date, eventos, invitados, coordinadores}: Props) {
    return(
        <main className={`${styles.main} ${cactus.className}`}>
            <div className={styles.date}>
                <h2>{date}</h2>
                <h2>Ver horarios +</h2>
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
        </main>
    )
}