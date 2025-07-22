'use client'

import styles from './activitiesGuide.module.css';
import { cactus } from '../../../app/(views)/ui/fonts';

export default function ActivitiesGuide() {
    return (
        <main className={`${cactus.className} ${styles.guide}`}>
            <div className={`${cactus.className} ${styles.activity} ${styles.taller}`}>
                <h3>Taller</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.redonda}`}>
                <h3>Mesa Redonda</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.simposio}`}>
                <h3>Simposio Satelite</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.conferencia}`}>
                <h3>Conferencia</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.dialogo}`}>
                <h3>Diálogo con expertos</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.reunion}`}>
                <h3>Reunión</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.confAbierta}`}>
                <h3>Conferencia abierta a la Comunidad</h3>
            </div>

            <div className={`${cactus.className} ${styles.activity} ${styles.others}`}>
                <h3>Otros</h3>
            </div>
        </main>
    )
}