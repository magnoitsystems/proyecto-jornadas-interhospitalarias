import styles from './instructions.module.css';
import {cactus} from "@/app/(views)/ui/fonts";

export default function InstructionsToPostWorks() {
    return (
        <nav className={`${styles.instructionsBox} ${cactus.className}`}>
            <ul>
                <li className={cactus.className}>
                    <a className={cactus.className} href="#reglamento-resumenes">
                        Ver reglamento para la presentación de resúmenes de trabajos libres
                    </a>
                </li>
                <li className={cactus.className}>
                    <a href="#opcion-premio">
                        Ver información acerca de “Opción de presentación a premio”
                    </a>
                </li>
                <li className={cactus.className}>
                    <a href="#anonimato">
                        Ver información acerca de Anonimato de Pacientes – Consentimiento Informado
                    </a>
                </li>
                <li className={cactus.className}>
                    <a href="#tipos-trabajos">
                        Ver tipos de Trabajos
                    </a>
                </li>
                <li className={cactus.className}>
                    <a href="#posters-digitales">
                        Ver instrucciones para el armado de pósters digitales
                    </a>
                </li>
            </ul>
        </nav>
    );
}