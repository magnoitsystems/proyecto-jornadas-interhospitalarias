import styles from "@/components/Home/CardAndSponsors/CardAndSponsors.module.css";
import Image from "next/image";
import { cactus } from '@/app/(views)/ui/fonts';

export default function CardAndSponsors() {
    return (
        <section className={styles.cardAndSponsorsProperties}>
            <div className={styles.presentationCardProperties}>
                <h1>Carta de Bienvenida al Congreso</h1>
                <section className={styles.sectionCard}>
                    <div className={styles.infoPresentationProperties}>
                        <div className={styles.infoAndImageProperties}>
                            <div className={`${styles.paragraphProperties} ${styles.infoColorProperties} ${cactus.className}`}>
                                <p>
                                    Nos complace darles la bienvenida a este espacio de encuentro, reflexión y
                                    aprendizaje compartido, organizado en conjunto por el Hospital de Niños &quot;Dr. Debilio Blanco
                                    Villegas&quot; de Tandil, el Hospital de Niños &quot;Ricardo Gutiérrez&quot; y el Sistema Integrado de Salud Pública.
                                </p>
                                <p>
                                    Estas jornadas han sido pensadas como un puente entre experiencias hospitalarias, saberes interdisciplinarios y
                                    el compromiso cotidiano por una salud pública de calidad. Desde la ciudad hasta las sierras, nos unimos
                                    para seguir construyendo una atención pediátrica integral, humana y en constante evolución.
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.paragraphProperties} ${styles.secondParagraphProperties} ${styles.infoColorProperties} ${cactus.className}`}>
                            <p>
                                Gracias por ser parte de este evento. ¡Los invitamos a recorrer la página y conocer todas las actividades
                                que tenemos preparadas!
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className={styles.sponsorsProperties}>
                <div className={styles.infoProperties}>
                    <h2>Nos acompañan</h2>
                </div>
                <div className={styles.imageProperties}>
                    <a href="https://www.pfizer.com.ar/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/imgs/sponsors/pfizerSponsor.png"
                            alt="Sponsor Pfizer"
                            width={310}
                            height={180} //agrandar un poco
                        />
                    </a>
                    <a href="https://roemmers.com.ar/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/imgs/sponsors/roemmersSponsor.png"
                            alt="Sponsor Roemmers"
                            width={310}
                            height={140}
                        />
                    </a>
                    <a href="https://inmunova.com/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/imgs/sponsors/inmunova.png"
                            alt="Sponsor Roemmers"
                            width={310}
                            height={140}
                        />
                    </a>
                    <a href="https://www.biomarin.com/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/imgs/sponsors/biomarin.png"
                            alt="Sponsor Roemmers"
                            width={310}
                            height={140}
                        />
                    </a>
                    <a href="https://cassara.com.ar/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/imgs/sponsors/cassara.png"
                            alt="Sponsor Roemmers"
                            width={210}
                            height={140} //achicar
                        />
                    </a>
                    <a href="https://www.casasco.com.ar/es/" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/imgs/sponsors/casascoImg.jpg"
                            alt="Sponsor Casasco"
                            width={250}
                            height={100}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
