'use client';
import styles from './Home.module.css';
import Image from "next/image";
import InfoCard from "@/components/Home/InfoCards/InfoCard";
import CardAndSponsors from "@/components/Home/CardAndSponsors/CardAndSponsors";
import { useState } from 'react';

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

    return(
        <div>
            <section className={styles.sectionCardsProperties}>
                <div className={`${styles.cardCompletyProperties} ${abierta? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`}>
                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie} ${abierta? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abierta? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB1}>
                                <Image src={'/icons/deployIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>
                        <div className={styles.todo}>
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
                        <InfoCard info = "Teatro del Fuerte | Ubicado en Fuerte Independencia 999, frente a la Plaza del Centro" fecha1={""} fecha2={""}/>
                    </div>
                </div>
                <div className={`${styles.cardCompletyProperties} ${abiertaB2? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`}>
                    <div className={`${styles.cardProperties} ${styles.cardCalendarProperties} ${styles.cardHoverPropertie} ${abiertaB2? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abiertaB2? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB2}>
                                <Image src={'/icons/deployBlackIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>
                        <div className={styles.todo}>
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
                        <InfoCard info = "05-Nov  |  nameCongreso1" fecha1={"06-Nov  |  nameCongreso2"} fecha2={"07-Nov  |  nameCongreso3"}/>
                    </div>
                </div>
                <div className={`${styles.cardCompletyProperties} ${abiertaB3? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`}>
                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie} ${abiertaB3? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abiertaB3? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB3}>
                                <Image src={'/icons/deployIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>
                        <div className={styles.todo}>
                            <div className={`${styles.imageCardProperties}`}>
                                <Image src={'/icons/hatIcon.png'} alt={"Icono de gorro de graduación"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Jornadas</span>
                                <span>Públicas/privadas</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.infoCardProperties} ${abiertaB3? styles.openCard : styles.cardClosed}`}>
                        <InfoCard info = "Nombre  |  Abierto al público" fecha1={"Nombre  |  Abierto al público"} fecha2={"Nombre  |  Abierto al público"}/>
                    </div>
                </div>
            </section>
            <div>
                <CardAndSponsors />
            </div>
        </div>
    );
}