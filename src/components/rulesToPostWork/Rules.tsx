// components/ContentSections/ContentSections.tsx
import styles from './Rules.module.css';

export default function ContentSections() {
    return (
        <div className={styles.container}>

            {/* --- SECCIÓN 1: REGLAMENTO --- */}
            <section id="reglamento-resumenes" className={styles.section}>
                <h2 className={styles.title}>Reglamento para la presentación de resúmenes de trabajos libres</h2>
                <ol className={styles.list}>
                    <li>Los resúmenes de los trabajos libres serán recibidos y evaluados por el Comité Científico. Serán aceptados para su evaluación solamente aquellos que se ajusten plenamente al reglamento para la presentación de resúmenes de trabajos libres.</li>
                    <li>La fecha límite para la presentación de los resúmenes será el 05/09/2025.</li>
                    <li>Los trabajos no deben estar publicados. Pueden haber sido presentados en otros eventos del país y del exterior en los últimos 2 (dos) años.</li>
                    <li>El trabajo presentado no debe tener errores pues se publicará exactamente como se envió.</li>
                    <li>El relator de cada trabajo deberá estar inscripto en las Jornadas, sin excepción, al momento de presentar el trabajo en el Evento.</li>
                    <li>La modalidad de presentación de los trabajos será póster digital (especificaciones).</li>
                    <li>El resumen no podrá exceder los 5000 caracteres, incluyendo los espacios en blanco. De acuerdo con el diseño los trabajos pueden ser:
                        <ul className={styles.sublist}>
                            <li>Trabajo de investigación - Diseño cuantitativo o cualitativo</li>
                            <li>Presentación de casos</li>
                            <li>Relato de experiencias</li>
                        </ul>
                    </li>
                    <li>En caso de optar por presentar el manuscrito para premio, usted deberá subir el texto completo (ver pautas) en la sección correspondiente. Ud. recibirá un correo electrónico con la confirmación de la recepción de su resumen. Posteriormente el Comité Científico le enviará la notificación de su aprobación, modalidad, día y hora de su presentación. Una vez enviado el resumen NO se admitirán modificaciones ni en el texto ni en la nómina de autores.</li>
                </ol>
            </section>

            {/* --- SECCIÓN 2: OPCIÓN A PREMIO --- */}
            <section id="opcion-premio" className={styles.section}>
                <h2 className={styles.title}>Opción de presentación a premio</h2>
                <p>Se otorgarán premios a los mejores Trabajos Libres.</p>
                <p>El Comité Científico del Congreso será el encargado de seleccionar los Trabajos Libres más destacados para opción a premio y de comunicar su dictamen a los autores correspondientes. De estar interesados, los autores deberán enviar el trabajo completo de acuerdo al presente Reglamento.</p>
                <h3 className={styles.subtitle}>Reglamento de trabajos que optan a premios</h3>
                <p>Para que el envío sea correcto Ud. deberá enviar lo siguiente:</p>
                <ol className={styles.list}>
                    <li>Un documento en formato pdf con el trabajo completo escrito en procesador de texto con interlineado a doble espacio, con las hojas numeradas. En este documento se deberán omitir los nombres de los autores y cualquier referencia al lugar donde fue realizado a fin de garantizar su anonimato. El cumplimiento de este requisito es obligatorio para la consideración del manuscrito para premio.</li>
                    <li>El manuscrito debe estar escrito en castellano e incluir las siguientes secciones: Introducción, Objetivos, Población, Materiales y Métodos, Resultados, Discusión, Conclusiones y Bibliografía, de acuerdo con las pautas del Reglamento de Publicaciones de Archivos Argentinos de Pediatría.</li>
                    <li>Oportunamente se darán a conocer los miembros del jurado, cuyo veredicto será inapelable.</li>
                    <li>El premio consistirá en un Diploma a cada uno de los autores, que será otorgado en el Acto de Clausura del evento.</li>
                </ol>
            </section>

            {/* --- SECCIÓN 3: PÓSTERS DIGITALES --- */}
            <section id="posters-digitales" className={styles.section}>
                <h2 className={styles.title}>Instrucciones para el armado de pósters digitales</h2>
                <ul className={styles.bulletList}>
                    <li>Confeccionar una diapositiva con el programa PowerPoint® versiones 97 o superior.</li>
                    <li>Configurar el tamaño de la diapositiva para “Presentación en Pantalla”, con orientación vertical.</li>
                    <li>Guardar el archivo con extensión .ppt o .pptx con un tamaño no mayor a 2 MB (ver instrucciones para la creación del mismo).</li>
                    <li>En el cuerpo de la diapositiva deberá incluirse: Título, Autores y a continuación:
                        <ul className={styles.sublist}>
                            <li>Introducción [con los objetivos o información más relevante de la presentación]</li>
                            <li>Población</li>
                            <li>Material y Métodos</li>
                            <li>Resultados</li>
                            <li>Conclusiones y/o Recomendaciones.</li>
                        </ul>
                    </li>
                    <li>Se sugiere utilizar fondo liso sin ornamentos en un color que contraste con las letras del texto (por ejemplo fondo claro y letras oscuras o viceversa).</li>
                    <li>Para las letras se deberá utilizar fuente Arial 8 en negrita como mínimo, para que permita una adecuada lectura a distancia. Sólo utilizar negrita en ese tamaño, no para letras más grandes.</li>
                    <li>No se admiten animaciones.</li>
                    <li>Las tablas, gráficos, ilustraciones y fotografías requeridas para la presentación deberán ser lo suficientemente explicativas y estar distribuidas secuencialmente en orden a su explicación.</li>
                    <li>Deberá colocarse título en cada una de ellas.</li>
                    <li>Las imágenes deben estar en formato JPG. Recordar que el archivo con el poster debe ser menor a 2MB.</li>
                </ul>
            </section>

        </div>
    );
}