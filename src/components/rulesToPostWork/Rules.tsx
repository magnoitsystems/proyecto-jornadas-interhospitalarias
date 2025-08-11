import styles from './Rules.module.css';

export default function ContentSections() {
    return (
        <div className={styles.container}>

            <section id="reglamento-resumenes" className={styles.section}>
                <h1 className={styles.title}>Reglamento para la presentación de resúmenes de trabajos libres</h1>
                <ol className={styles.list}>
                    <li><h3>Los resúmenes de los trabajos libres serán recibidos y evaluados por el Comité Científico. Serán aceptados para su evaluación solamente aquellos que se ajusten plenamente al reglamento para la presentación de resúmenes de trabajos libres.</h3></li>
                    <li><h3>La fecha límite para la presentación de los resúmenes será el 05/09/2025.</h3></li>
                    <li><h3>Los trabajos no deben estar publicados. Pueden haber sido presentados en otros eventos del país y del exterior en los últimos 2 (dos) años.</h3></li>
                    <li><h3>El trabajo presentado no debe tener errores pues se publicará exactamente como se envió.</h3></li>
                    <li><h3>El relator de cada trabajo deberá estar inscripto en las Jornadas, sin excepción, al momento de presentar el trabajo en el Evento.</h3></li>
                    <li><h3>La modalidad de presentación de los trabajos será póster digital (especificaciones).</h3></li>
                    <li><h3>El resumen no podrá exceder los 5000 caracteres, incluyendo los espacios en blanco. De acuerdo con el diseño los trabajos pueden ser:</h3>
                        <ul className={styles.sublist}>
                            <li><h3>Trabajo de investigación - Diseño cuantitativo o cualitativo</h3></li>
                            <li><h3>Presentación de casos</h3></li>
                            <li><h3>Relato de experiencias</h3></li>
                        </ul>
                    </li>
                    <li><h3>En caso de optar por presentar el manuscrito para premio, usted deberá subir el texto completo (ver pautas) en la sección correspondiente. Ud. recibirá un correo electrónico con la confirmación de la recepción de su resumen. Posteriormente el Comité Científico le enviará la notificación de su aprobación, modalidad, día y hora de su presentación. Una vez enviado el resumen NO se admitirán modificaciones ni en el texto ni en la nómina de autores.</h3></li>
                </ol>
            </section>

            <section id="opcion-premio" className={styles.section}>
                <h1 className={styles.title}>Opción de presentación a premio</h1>
                <h3>Se otorgarán premios a los mejores Trabajos Libres.</h3>
                <h3>El Comité Científico del Congreso será el encargado de seleccionar los Trabajos Libres más destacados para opción a premio y de comunicar su dictamen a los autores correspondientes. De estar interesados, los autores deberán enviar el trabajo completo de acuerdo al presente Reglamento.</h3>
                <h3 className={styles.subtitle}>Reglamento de trabajos que optan a premios</h3>
                <h2>Para que el envío sea correcto Ud. deberá enviar lo siguiente:</h2>
                <ol className={styles.list}>
                    <li><h3>Un documento en formato pdf con el trabajo completo escrito en procesador de texto con interlineado a doble espacio, con las hojas numeradas. En este documento se deberán omitir los nombres de los autores y cualquier referencia al lugar donde fue realizado a fin de garantizar su anonimato. El cumplimiento de este requisito es obligatorio para la consideración del manuscrito para premio.</h3></li>
                    <li><h3>El manuscrito debe estar escrito en castellano e incluir las siguientes secciones: Introducción, Objetivos, Población, Materiales y Métodos, Resultados, Discusión, Conclusiones y Bibliografía, de acuerdo con las pautas del Reglamento de Publicaciones de Archivos Argentinos de Pediatría.</h3></li>
                    <li><h3>Oportunamente se darán a conocer los miembros del jurado, cuyo veredicto será inapelable.</h3></li>
                    <li><h3>El premio consistirá en un Diploma a cada uno de los autores, que será otorgado en el Acto de Clausura del evento.</h3></li>
                </ol>
            </section>
            
            <section id="posters-digitales" className={styles.section}>
                <h1 className={styles.title}>Instrucciones para el armado de pósters digitales</h1>
                <ul className={styles.bulletList}>
                    <li><h3>Confeccionar una diapositiva con el programa PowerPoint® versiones 97 o superior.</h3></li>
                    <li><h3>Configurar el tamaño de la diapositiva para “Presentación en Pantalla”, con orientación vertical.</h3></li>
                    <li><h3>Guardar el archivo con extensión .ppt o .pptx con un tamaño no mayor a 2 MB (ver instrucciones para la creación del mismo).</h3></li>
                    <li><h3>En el cuerpo de la diapositiva deberá incluirse: Título, Autores y a continuación:</h3>
                        <ul className={styles.sublist}>
                            <li><h3>Introducción [con los objetivos o información más relevante de la presentación]</h3></li>
                            <li><h3>Población</h3></li>
                            <li><h3>Material y Métodos</h3></li>
                            <li><h3>Resultados</h3></li>
                            <li><h3>Conclusiones y/o Recomendaciones.</h3></li>
                        </ul>
                    </li>
                    <li><h3>Se sugiere utilizar fondo liso sin ornamentos en un color que contraste con las letras del texto (por ejemplo fondo claro y letras oscuras o viceversa).</h3></li>
                    <li><h3>Para las letras se deberá utilizar fuente Arial 8 en negrita como mínimo, para que permita una adecuada lectura a distancia. Sólo utilizar negrita en ese tamaño, no para letras más grandes.</h3></li>
                    <li><h3>No se admiten animaciones.</h3></li>
                    <li><h3>Las tablas, gráficos, ilustraciones y fotografías requeridas para la presentación deberán ser lo suficientemente explicativas y estar distribuidas secuencialmente en orden a su explicación.</h3></li>
                    <li><h3>Deberá colocarse título en cada una de ellas.</h3></li>
                    <li><h3>Las imágenes deben estar en formato JPG. Recordar que el archivo con el poster debe ser menor a 2MB.</h3></li>
                </ul>
            </section>

        </div>
    );
}