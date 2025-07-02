import styles from './Home.module.css';
import Image from "next/image";
import InfoCard from "@/components/Home/InfoCards/InfoCard";
import CardAndSponsors from "@/components/Home/CardAndSponsors/CardAndSponsors";

export default function Home(){
    return(
        <div>
            <section className={styles.sectionCardsProperties}>
                <div className={styles.cardCompletyProperties}>
                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie}`}>
                        <div className={styles.imageCardProperties}>
                            <Image src={'/icons/homeIcon.png'} alt={"Icono de casa"} width={32} height={32}/>
                        </div>
                        <div className={styles.infoCardsProperties}>
                            <span>Sede</span>
                            <span>Ciudad de Tandil</span>
                        </div>
                    </div>
                    <div className={styles.infoCardProperties}>
                        <InfoCard info = "Teatro del Fuerte | Ubicado en Fuerte Independencia 999, frente a la Plaza del Centro" fecha1={""} fecha2={""}/>
                    </div>
                </div>
                <div className={styles.cardCompletyProperties}>
                    <div className= {`${styles.cardProperties} ${styles.cardCalendarProperties} ${styles.cardHoverPropertie}`}>
                        <div className={`${styles.imageCardProperties} ${styles.imageCalendarCardProperties}`}>
                            <Image src={'/icons/calendarIcon.png'} alt={"Icono de calendario"} width={32} height={32}/>
                        </div>
                        <div className={styles.infoCardsProperties}>
                            <span>Fechas</span>
                            <span>Del 05 al 07 de Noviembre</span>
                        </div>
                    </div>
                    <div className={styles.infoCardProperties}>
                        <InfoCard info = "05-Nov  |  nameCongreso1" fecha1={"06-Nov  |  nameCongreso2"} fecha2={"07-Nov  |  nameCongreso3"}/>
                    </div>
                </div>
                <div className={styles.cardCompletyProperties}>
                    <div className={`${styles.cardProperties} ${styles.cardHoverPropertie}`}>
                        <div className={styles.imageCardProperties}>
                            <Image src={'/icons/hatIcon.png'} alt={"Icono de gorro de graduación"} width={32} height={32}/>
                        </div>
                        <div className={styles.infoCardsProperties}>
                            <span>Jornadas</span>
                            <span>Públicas/privadas</span>
                        </div>
                    </div>
                    <div className={styles.infoCardProperties}>
                        <InfoCard info = "Nombre  |  Abierto al público" fecha1={"Nombre  |  Abierto al público"} fecha2={"Nombre  |  Abierto al público"}/>
                    </div>
                </div>
            </section>
            <div className={styles.cardAndSponsorsProperties}>
                <CardAndSponsors />
            </div>
        </div>
    );
}