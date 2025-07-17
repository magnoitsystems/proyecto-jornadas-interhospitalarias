// components/instructionsToPostWorks/instructions.tsx
import styles from './instructions.module.css';

export default function InstructionsToPostWorks() {
    return (
        <nav className={styles.instructionsBox}>
            <ul>
                <li>

                    <a href="#reglamento-resumenes">
                        Ver reglamento para la presentación de resúmenes de trabajos libres
                    </a>
                </li>
                <li>

                    <a href="#opcion-premio">
                        Ver información acerca de
                        “Opción de presentación a premio”
                    </a>
                </li>
                <li>

                    <a href="#posters-digitales">
                        Ver instrucciones para el armado de
                        pósters digitales
                    </a>
                </li>
                {/*} lo dejo asi ya que en el figma, no hay contenido sonre pediatria en las reglas
                 <li>

                    <a href="#pautas-publicaciones">
                        Ver pautas del Reglamento de Publicaciones de Archivos Argentinos de Pediatría
                    </a>
                </li>
                */}
            </ul>
        </nav>
    );
}