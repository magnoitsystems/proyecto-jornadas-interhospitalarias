import styles from './Redirection.module.css';
import Link from "next/link";
import { cactus } from '@/app/ui/fonts';

export default function Redirection(){
    return(
        <section className={styles.sectionRedirection}>
            <div className={styles.redirectionProperties}>
                <h3 className={cactus.className}>¡Se ha registrado con éxito!</h3>
                <div className={`${styles.buttonsProperties} ${cactus.className}`}>
                    <Link href={'/login'}><button className={`${styles.buttonStartSesionProperties} ${cactus.className}`}>Iniciar sesión</button></Link>
                    <Link href={'/'}><button className={`${styles.buttonBackHomeProperties} ${cactus.className}`}>Volver al home</button></Link>
                </div>
            </div>
        </section>
    );
}