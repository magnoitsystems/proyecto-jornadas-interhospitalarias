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
                                    Nos complace darles la bienvenida a las Segundas Jornadas Interhospitalarias de Pediatría, organizadas conjuntamente por el Hospital de Niños “Debilio Blanco Villegas” de Tandil y el Hospital de Niños “Ricardo Gutiérrez” de la Ciudad Autónoma de Buenos Aires y el Sistema Integrado de Salud Pública.
                                </p>
                                <p>
                                    Estas jornadas nacen del compromiso compartido de fortalecer los lazos entre instituciones pediátricas, promoviendo el intercambio de saberes, experiencias y buenas prácticas, con el objetivo de mejorar la atención integral de nuestros niños y niñas.
                                </p>
                                <p>
                                    Durante estos días, Tandil será el escenario de un enriquecedor espacio de encuentro científico y humano. Contaremos con la presencia de destacados especialistas, talleres interactivos y mesas redondas que, sin dudas, enriquecerán nuestro ejercicio profesional, el compromiso por una salud pública de calidad, integral, humana y en constante evolución.
                                </p>
                                <p>
                                    Agradecemos profundamente a cada uno de ustedes por su participación, les deseamos unas jornadas inspiradoras, donde el conocimiento se combine con la calidez del encuentro y el compromiso con la salud infantil nos siga guiando.
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.paragraphProperties} ${styles.secondParagraphProperties} ${styles.infoColorProperties} ${cactus.className}`}>
                            <p>
                                Agradecemos profundamente a cada uno de ustedes por su participación, les deseamos unas jornadas inspiradoras, donde el conocimiento se combine con la calidez del encuentro y el compromiso con la salud infantil nos siga guiando.
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
