'use client'

import styles from './activityCard.module.css';
import { cactus } from '../../../app/(views)/ui/fonts';
import { useState } from "react";

type Props = {
    eventName: string,
    time: string,
    place: string,
    guestsName: string,
    guests: string[],
    coordinators: string[],
    topics: string[],
    className: string,
}

export default function ActivityCard({eventName, time, place, guestsName, guests, coordinators, topics, personalizedClassName}: Props) {
    const [showDetails, setShowDetails] = useState(false);

    return(
        <main className={`${cactus.className} ${styles.card}`}>
            <div className={styles[personalizedClassName]}>

            </div>
            <div className={styles.information}>
                <div className={styles.eventMainInformation}>
                    <div className={styles.name}>
                        <h3>{eventName}</h3>
                    </div>
                    <div className={styles.details}>
                        <h3>{time}</h3>
                        <h3>{place}</h3>
                        <h3
                            className={styles.plus}
                            onClick={() => setShowDetails(prev => !prev)}
                            style={{cursor: "pointer"}}
                        >
                            {showDetails ? "-" : "+"}
                        </h3>
                    </div>
                </div>
                <div className={`${styles.aditionalInformation} ${showDetails ? styles.visible : ""}`}>
                    <h4>{guestsName}: {guests}</h4>
                    <h4>Coordinadores: {coordinators}</h4>
                    <h4>Temas a tratar: {topics}</h4>
                </div>
            </div>
        </main>
    )
}