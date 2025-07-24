'use client';
import styles from './Home.module.css';
import Image from "next/image";
import InfoCard from "@/components/Home/InfoCards/InfoCard";
import CardAndSponsors from "@/components/Home/CardAndSponsors/CardAndSponsors";
import { useState } from 'react';
import { cactus } from '@/app/(views)/ui/fonts';

export default function Home(){
    const [abierta, setAbiertaB1] = useState(false);
    const [abiertaB2, setAbiertaB2] = useState(false);
    const [abiertaB3, setAbiertaB3] = useState(false);


    const toggleCardB1 = () => {
        setAbiertaB1(!abierta);
    };

    const toggleCardB2 = () => {
        setAbiertaB2(!abiertaB2);
    };

    const toggleCardB3 = () => {
        setAbiertaB3(!abiertaB3);
    };
    const [hovered, setHovered] = useState(false);

    return(
        <div>
            <section className={`${styles.sectionCardsProperties}`}>
                <div className={`${styles.cardCompletyProperties} ${abierta? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`}  onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}>

                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie} ${abierta? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abierta? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB1}>
                                <Image src={'/icons/deployIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>

                        <div className={`${styles.todo} ${cactus.className}`}>
                            <div className={styles.imageCardProperties}>
                                <Image src={'/icons/homeIcon.png'} alt={"Icono de casa"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Sede</span>
                                <span>Ciudad de Tandil</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.infoCardProperties} ${abierta? styles.openCard : styles.cardClosed}`}>
                        <InfoCard info="Teatro del Fuerte" info2={"MUMBAT"} info3={"Salón Blanco del Palacio Municipal"}
                                  info4={"Htal. de Niños Debilio Blanco Villegas"} sede={true}/>
                    </div>
                </div>
                <div className={`${styles.cardCompletyProperties} ${abiertaB2? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`} onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}>
                    <div className={`${styles.cardProperties} ${styles.cardCalendarProperties} ${styles.cardHoverPropertie} ${abiertaB2? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abiertaB2? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB2}>
                                <Image src={'/icons/deployBlackIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>
                        <div className={`${styles.todo} ${cactus.className}`}>
                            <div className={`${styles.imageCardProperties} ${styles.imageCalendarCardProperties}`}>
                                <Image src={'/icons/calendarIcon.png'} alt={"Icono de calendario"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Fecha</span>
                                <span>05 al 07 de Noviembre</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.infoCardProperties} ${abiertaB2? styles.openCard : styles.cardClosed}`}>
                        <InfoCard info = {"05-Nov  |  Comienzo de la jornada"} info2={"06-Nov  |  intervalo"} info3={"07-Nov  |  Cierre de la jornada"} sede={false}/>
                    </div>
                </div>
                <div className={`${styles.cardCompletyProperties} ${abiertaB3? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`} onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}>
                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie} ${abiertaB3? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abiertaB3? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB3}>
                                <Image src={'/icons/deployIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>
                        <div className={`${styles.todo} ${cactus.className}`}>
                            <div className={`${styles.imageCardProperties}`}>
                                <Image src={'/icons/hatIcon.png'} alt={"Icono de gorro de graduación"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Auspicios</span>
                                <span>Auspiciantes</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.infoCardProperties} ${abiertaB3? styles.openCard : styles.cardClosed}`}>
                        <InfoCard info = {"Al momento las Jornadas han sido declaradas de interes Municipal\n" +
                            "                        y han sido auspiciadas por la Sociedad Argentina de Pediatria"} sede={false}/>
                    </div>
                </div>
            </section>
            <div className={`${styles.documentProperties} ${hovered ? styles.activa : ""}`}>
                <CardAndSponsors />
            </div>
        </div>
    );
}