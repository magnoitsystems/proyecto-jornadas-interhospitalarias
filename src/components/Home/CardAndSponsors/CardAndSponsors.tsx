import styles from "@/components/Home/CardAndSponsors/CardAndSponsors.module.css";
import Image from "next/image";

export default function CardAndSponsors(){
    return(
        <div className={styles.cardAndSponsorsProperties}>
            <div className={styles.presentationCardProperties}>
                <h1>Carta de Bienvenida al Congreso</h1>
                <div className={styles.infoPresentationProperties}>
                    <div className={`${styles.totalInfoProperties} ${styles.infoColorProperties}`}>
                        <div className={styles.infoAndImageProperties}>
                            <div className={`${styles.paragraphProperties} ${styles.infoColorProperties}`}>
                                <p>Nos complace darles la bienvenida a este espacio de encuentro, reflexión y aprendizaje compartido,
                                    organizado en conjunto por el Hospital de Niños "Dr. Debilio Blanco Villegas" de Tandil, el Hospital
                                    de Niños "Ricardo Gutiérrez" y el Sistema Integrado de Salud Pública.
                                </p>
                            </div>
                            <div className={styles.imagePresentationProperties}>
                                <Image src={'/imgs/fotoDirectorJornada.png'} alt={"Foto del director de la jornada"} width={207} height={236}/>
                                <span>Apellido, Nombre</span>
                                <span>Director/a del [Lugar]</span>
                            </div>
                        </div>
                        <div className={`${styles.paragraphProperties} ${styles.infoColorProperties}`}>
                            <p>Estas jornadas han sido pensadas
                                como un puente entre experiencias hospitalarias, saberes interdisciplinarios y el compromiso cotidiano
                                por una salud pública de calidad. Desde la ciudad hasta las sierras, nos unimos para seguir construyendo
                                una atención pediátrica integral, humana y en constante evolución.</p>
                        </div>
                    </div>
                    <div className={`${styles.paragraphProperties} ${styles.secondParagraphProperties} ${styles.infoColorProperties}`}>
                        <p>Nos complace darles la bienvenida a este espacio de encuentro, reflexión y aprendizaje compartido,
                            organizado en conjunto por el Hospital de Niños "Dr. Debilio Blanco Villegas" de Tandil, el Hospital
                            de Niños "Ricardo Gutiérrez" y el Sistema Integrado de Salud Pública.
                        </p>
                        <p>Estas jornadas han sido pensadas como un puente entre experiencias hospitalarias, saberes interdisciplinarios
                            y el compromiso cotidiano por una salud pública de calidad.
                        </p>
                        <p>
                            Gracias por ser parte de este evento. ¡Los invitamos a recorrer la página y conocer todas las actividades
                            que tenemos preparadas!
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.sponsorsProperties}>
                <h1>Sponsors Oficiales</h1>
                <div className={styles.imageProperties}>
                    <Image src={'/imgs/sponsor5.png'} alt={"Imagen sponsor CardioVex"} width={281} height={112} />
                    <Image src={'/imgs/sponsor4.png'} alt={"Imagen sponsor CardioVex"} width={281} height={112} />
                    <Image src={'/imgs/sponsor3.png'} alt={"Imagen sponsor Laerdal"} width={281} height={112} />
                    <Image src={'/imgs/sponsor2.png'} alt={"Imagen sponsor AstraZeneca"} width={281} height={112} />
                    <Image src={'/imgs/sponsor1.png'} alt={"Imagen sponsor Biopas"} width={281} height={112} />
                </div>
            </div>
        </div>
    );
}