'use client';
import styles from './Home.module.css';
import Image from "next/image";
import InfoCard from "@/components/Home/InfoCards/InfoCard";
import CardAndSponsors from "@/components/Home/CardAndSponsors/CardAndSponsors";
import { useState } from 'react';
import { nunito } from '@/app/(views)/ui/fonts';

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

    const url: string[] = [
         "https://www.google.com.ar/maps/place/Teatro+del+Fuerte/@-37.3300755,-59.138836,16z/data=!3m1!4b1!4m6!3m5!1s0x95911f97a5ac2bd7:0x8d04342b14053258!8m2!3d-37.3300798!4d-59.1362611!16s%2Fg%2F11btwv__tf?hl=es&entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D",
         "https://www.google.com.ar/maps/place/Museo+y+Academia+Municipal+de+Bellas+Artes/@-37.3302796,-59.1398119,17z/data=!3m1!4b1!4m6!3m5!1s0x95911f9798bc98cf:0xf5efcea15b43b3a3!8m2!3d-37.3302839!4d-59.137237!16s%2Fg%2F11btwv90z6?hl=es&entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D",
         "https://www.google.com.ar/maps/place/Sal%C3%B3n+Blanco+Municipal/@-37.3298718,-59.1391468,17z/data=!3m1!4b1!4m6!3m5!1s0x95911f970ba42b73:0x4c2b355d4fca861e!8m2!3d-37.3298761!4d-59.1365719!16s%2Fg%2F11g65fw99d?hl=es&entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D",
        "https://www.google.com.ar/maps/place/Hospital+de+Ni%C3%B1os+%22Dr.+Debilio+Blanco+Villegas%22+S.I.S.P./@-37.3163487,-59.1413192,17z/data=!3m1!4b1!4m6!3m5!1s0x95911f86286dc111:0x753c87304b361e09!8m2!3d-37.316353!4d-59.1387443!16s%2Fg%2F11b7y76kbp?hl=es&entry=ttu&g_ep=EgoyMDI1MDcyNy4wIKXMDSoASAFQAw%3D%3D"
    ];

    const daysUrls: string[] = [
        "/programa/#wednesday",
        "/programa/#thursday",
        "/programa/#friday",
    ]

    return(
        <main className={styles.main}>
            <section className={`${styles.sectionCardsProperties} ${nunito.className}`}>
                <div className={`${styles.cardCompletyProperties} ${abierta? styles.openCardCardCompletyProperties : styles.cardCompletyProperties}`}  onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}>

                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie} ${abierta? styles.openCardProperties : styles.cardProperties}`}>
                        <div className={styles.deployIconProperties}>
                            <button className={`${styles.buttonProperties} ${abierta? styles.iconRotate : styles.buttonProperties}`} onClick={toggleCardB1}>
                                <Image src={'/icons/deployIcon.png'} alt={"Icono para desplegar la card con información"} width={25} height={15} />
                            </button>
                        </div>

                        <div className={`${styles.todo} ${nunito.className}`}>
                            <div className={styles.imageCardProperties}>
                                <Image src={'/icons/homeIcon.png'} alt={"Icono de casa"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Sede</span>
                                <span>Ciudad de Tandil</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.infoCardProperties} ${nunito.className} ${abierta? styles.openCard : styles.cardClosed}`}>
                        <InfoCard info="Teatro del Fuerte" info2={"MUMBAT"} info3={"Salón Blanco del Palacio Municipal"}
                                  info4={"Htal. de Niños Debilio Blanco Villegas"} sede={true} url={url}/>
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
                        <div className={`${styles.todo} ${nunito.className}`}>
                            <div className={`${styles.imageCardProperties} ${styles.imageCalendarCardProperties}`}>
                                <Image src={'/icons/calendarIcon.png'} alt={"Icono de calendario"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Fecha</span>
                                <span>05 al 07 de Noviembre</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.infoCardProperties} ${abiertaB2? styles.openCard : styles.cardClosed} ${nunito.className}`}>
                        <InfoCard info = {"05/11  -  Miércoles ( Ver más + )"} info2={"06/11  -  Jueves ( Ver más + )"} info3={"07/11  -  Viernes ( Ver más + )"} sede={true} url={daysUrls}/>
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
                        <div className={`${styles.todo} ${nunito.className}`}>
                            <div className={`${styles.imageCardProperties}`}>
                                <Image src={'/icons/hatIcon.png'} alt={"Icono de gorro de graduación"} width={32} height={32}/>
                            </div>
                            <div className={styles.infoCardsProperties}>
                                <span>Auspicios</span>
                                <span>Apoyan este evento</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.infoCardProperties} ${abiertaB3? styles.openCard : styles.cardClosed} ${nunito.className}`}>
                        <InfoCard info = {"Estas jornadas han sido declaradas de interés Municipal\n" +
                            "                        y son auspiciadas por la Sociedad Argentina de Pediatría, la Facultad de Ciencias de la Salud de la UNICEN, Colegio de Médicos Distrito VIII, Universidad Nacional del Sur y Universidad Nacional de Mar del Plata"} sede={false} url={[]}/>
                    </div>
                </div>
            </section>
            <div className={`${styles.documentProperties} ${hovered ? styles.activa : ""}`}>
                <CardAndSponsors />
            </div>

        </main>
    );
}