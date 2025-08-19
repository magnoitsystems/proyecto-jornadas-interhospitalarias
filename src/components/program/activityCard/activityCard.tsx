'use client'

import styles from './activityCard.module.css';
import { cactus } from '@/app/(views)/ui/fonts';
import { useState } from "react";

type Props = {
    eventName: string,
    time: string,
    place: string,
    guestsName: string,
    guests: string[],
    coordinators?: string[] | undefined,
    topics?: string[] | undefined,
    className: string,
    personalizedClassName: string;
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
                        <h1
                            className={styles.plus}
                            onClick={() => setShowDetails(prev => !prev)}
                            style={{cursor: "pointer"}}
                        >
                            {showDetails ? "-" : "+"}
                        </h1>
                        <h3>{time}</h3>
                        <h4>{place}</h4>
                    </div>
                </div>
                <div className={`${styles.aditionalInformation} ${showDetails ? styles.visible : styles.invisible}`}>
                    <h4>{guests}</h4>
                    <h4><span>Coordinadores</span>: {coordinators}</h4>
                    <h4>{topics}</h4>
                </div>
            </div>
        </main>
    )
}