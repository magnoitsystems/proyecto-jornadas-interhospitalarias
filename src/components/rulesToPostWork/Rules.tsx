import styles from './Rules.module.css';

export default function ContentSections() {
    return (
        <div className={styles.container}>

            <section id="reglamento-resumenes" className={styles.section}>
                <h1 className={styles.title}>Reglamento para la presentación de resúmenes de trabajos libres</h1>
                <ol className={styles.list}>
                    <li><h3>1. Los resúmenes de los trabajos libres serán recibidos y evaluados por el Comité
                        Científico.
                        Serán aceptados para su evaluación solamente aquellos que se ajusten plenamente al
                        reglamento para la presentación de resúmenes de trabajos libres.</h3></li>
                    <li><h3>2. La fecha límite para la presentación de los resúmenes será el 5 de Septiembre del
                        2025</h3></li>
                    <li><h3>3. Los trabajos no deben estar publicados. Pueden haber sido presentados en otros eventos
                        del país
                        y del exterior en los últimos 2 (dos) años.</h3></li>
                    <li><h3>4. El trabajo presentado no debe tener errores pues se publicará exactamente como se
                        envió.</h3></li>
                    <li><h3>5. El relator de cada trabajo deberá estar inscripto en el Congreso, sin excepción, al
                        momento de
                        presentar el trabajo en el Evento.</h3></li>
                    <li><h3>6. La modalidad de presentación de los trabajos será presentación oral digital.</h3></li>
                    <li><h3>D7. El resumen no podrá exceder los 5000 caracteres incluyendo los espacios en blanco. De
                        acuerdo con el diseño los trabajos pueden ser</h3>
                        <ul className={styles.sublist}>
                            <li><h3>a. Trabajo de investigación - Diseño cuantitativo o cualitativo</h3></li>
                            <li><h3>b. Presentación de casos</h3></li>
                            <li><h3>c. Relato de experiencias * (VER ANEXO)</h3></li>
                        </ul>
                    </li>
                    <li><h3>Se pueden incluir recomendaciones como así también tablas pero no ilustraciones, ni
                        imágenes, ni bibliografía.</h3></li>
                    <li><h3>8. Forma de envío: El envío de los resúmenes se realizará únicamente enviando el trabajo al
                        siguiente
                        correo electrónico codei@sisptandil.gob.ar, Ud. recibirá un correo electrónico con la
                        confirmación de
                        la recepción de su resumen. Posteriormente el Comité Científico le enviará la notificación de su
                        aprobación, modalidad, día y hora de su presentación. Una vez enviado el resumen NO se admitirán
                        modificaciones ni en el texto ni en la nómina de autores.</h3></li>
                </ol>
            </section>

            <section id="opcion-premio" className={styles.section}>
                <h1 className={styles.title}>Opción de presentación a premio</h1>
                <h3>Se otorgarán premios a los mejores Trabajos Libres.</h3>
                <h3>El Comité Científico del Congreso será el encargado de seleccionar los Trabajos Libres más
                    destacados para opción a premio y de comunicar su dictamen a los autores correspondientes. De estar
                    interesados, los autores deberán enviar el trabajo completo de acuerdo al presente Reglamento.</h3>
                <h3 className={styles.subtitle}>Reglamento de trabajos que optan a premios</h3>
                <h2>Para que el envío sea correcto Ud. deberá enviar lo siguiente:</h2>
                <ol className={styles.list}>
                    <li><h3>1. El trabajo completo en formato PDF escrito en procesador de texto a doble espacio, con
                        las
                        hojas numeradas. Se deberán omitir el nombre de los autores y cualquier referencia al lugar
                        donde
                        fue realizado a fin de garantizar su anonimato.</h3></li>
                    <li><h3>2. El trabajo debe constar de: Introducción, Objetivos, Población, Material y Métodos,
                        Resultados,
                        Discusión, Conclusiones y Bibliografía solamente en idioma castellano y acorde a las pautas del
                        Reglamento de Publicaciones de Archivos Argentinos de Pediatría (www.sap.org.ar).</h3></li>
                    <li><h3> 3. Un archivo
                        en PDF donde conste: título del trabajo, número, apellidos y nombres completos de los autores,
                        lugar donde se realizó, localidad, provincia y código postal.</h3></li>
                    <li><h3>4. Una copia en PDF del resumen ya enviado on-line donde figura el número de resumen (en
                        este
                        archivo no deberá figurar el nombre de los autores).</h3></li>
                    <li><h3>5. Oportunamente se darán a conocer los miembros del jurado, cuyo veredicto será inapelable.
                        6. El
                        premio consistirá en Diploma a cada uno de los autores, que será otorgado en el Acto de Clausura
                        del evento</h3></li>
                </ol>
            </section>

            <section id={"anonimato"} className={styles.section}>
                <h1 className={styles.title}>Anonimato de Pacientes – Consentimiento Informado</h1>

                <ol className={styles.list}>
                    <li><h3>
                        En todas las actividades desarrolladas en las jornadas, se deben tomar todas las medidas
                        necesarias para garantizar el anonimato de las personas, tanto en las fotografías presentadas
                        como en las imágenes de observaciones microscópicas o de estudios por imágenes. Si se utilizan
                        ilustraciones de otros autores, publicadas o inéditas, deberá citar las fuentes de referencia.
                        (Protección Datos Personales - Ley 25.326).
                    </h3></li>

                    <li><h3>
                        En todos los casos, las presentaciones no podrán contener ningún dato o imagen que permita
                        identificar al paciente. Previo a la presentación, el profesional deberá manifestar cuando
                        entrega el
                        material, que cuenta con el consentimiento informado y firmado por los familiares responsables
                        del
                        menor y del adolescente mayor de 13 años para su presentación en el ámbito de las Jornadas y
                        será
                        responsable personalmente ante cualquier incumplimiento, comprometiéndose a mantener
                        indemne a la organización ante cualquier reclamo que pudieran efectuarse.
                    </h3></li>
                </ol>
            </section>

            <section id={"tipos-trabajos"} className={styles.section}>
                <h1 className={styles.title}>Tipos de Trabajos</h1>

                <ol className={styles.list}>
                    <h2>1) Trabajo de investigación:</h2>
                    <li><h3>Se entiende por tal a la presentación de un estudio en el cual se realiza una descripción
                        y/o
                        comparación de una o más variables, en uno o más grupos. Los hay de tipo cuantitativos (ej:
                        tensiónarterial de una población, eficacia de un fármaco vs. placebo, etc) y también
                        cualitativos (ej:
                        observación de lactantes, descripción de una experiencia de intervención no mensurable, etc.)
                        Son trabajos que requieren la realización y aprobación de un protocolo de investigación previo
                        al
                        desarrollo del mismo. Tratan de responder hipótesis planteadas por los autores. Constan de las
                        siguientes secciones:
                    </h3>
                        <ul className={styles.sublist}>
                            <li><h3>a) Título y autores:</h3></li>

                            <li><h3>b) Introducción: breve resumen del conocimiento del tema hasta el momento y
                                justificación de la
                                realización del estudio.
                            </h3></li>

                            <li><h3>
                                c) Objetivos: comunicar cual/cuales fueron el/los objetivos por los que se realizó el
                                estudio.
                            </h3></li>

                            <li><h3>
                                d)
                                Materiales y métodos: Descripción de cómo se ha realizado el estudio, incluyendo la
                                información
                                necesaria para que otro investigador lo replique en idénticas condiciones: tipo de
                                estudio, criterios
                                de inclusión y exclusión, definiciones, descripción de técnicas, variables, tipo de
                                análisis a realizar.
                            </h3></li>

                            <li><h3>
                                e) Resultados: Debe incluir todos los datos encontrados por los autores siguiendo los
                                objetivos y la
                                metodología planteados, y evitar la inclusión de datos sin interés y los comentarios de
                                los mismos.
                            </h3></li>

                            <li><h3>
                                f) Discusión y/o Conclusión: Comentar y analizar los datos más relevantes obviando la
                                repetición de
                                lo ya expuesto.
                            </h3></li>
                        </ul>
                    </li>

                    <h2>2) Presentación de casos:</h2>
                    <li><h3>Se entiende por tal la presentación de un caso clínico individual o de una serie de hasta
                        cuatro
                        pacientes en los que: o bien su carácter excepcional, o aspecto o estudios inusuales de
                        patología
                        frecuente le confieren al caso/s un interés docente, o bien le otorguen caracteres de problema
                        clínico de difícil solución.
                        No requieren la confección de un protocolo de investigación.
                        Las series de casos (de 5 o más casos) es conveniente realizarlas y analizarlas según el
                        formato de trabajos de investigación.
                        Constan de las siguientes secciones:
                    </h3>
                        <ul className={styles.sublist}>
                            <li><h3>a) Título y autores: En el título debe constar “A propósito de XX caso/s”</h3></li>

                            <li><h3>b) Introducción: Exposición de la relevancia del tema, las lagunas de conocimiento
                                existentes en la
                                actualidad y sus implicaciones clínicas.
                            </h3></li>

                            <li><h3>
                                c) Objetivos: comunicar cual/cuales fueron el/los objetivos por los que se presenta el
                                caso.
                            </h3></li>

                            <li><h3>
                                d)
                                Descripción del caso: Antecedentes familiares, hábitos, antecedentes personales, motivo
                                de consulta,
                                exploración física, exploraciones complementarias, diagnóstico diferencial, diagnóstico,
                                tratamiento,
                                evolución y toda cuanta información clínica se considere relevante.
                            </h3></li>

                            <li><h3>
                                e) Discusión y/o Conclusión:
                                Comentar y analizar los datos más relevantes obviando la repetición de lo ya expuesto.
                                Recomendaciones de práctica clínica en relación con el caso presentado.
                            </h3></li>
                        </ul>
                    </li>


                    <h2>3) Relatos de Experiencias:</h2>
                    <li>
                        Se trata de un tipo de comunicación en la que se desea transmitir una experiencia, clínica o
                        comunitaria, sin atenerse a los cánones de los tradicionales trabajos de investigación. Se sugiere
                        organizar el resumen bajo los siguientes ítems: Breve introducción o marco teórico, Objetivos,
                        Diagnóstico de situación previa (si lo hubo), Población a la que está destinado, Número de
                        participantes o destinatarios, Actividades o desarrollo de la experiencia, Resultados, Evaluación (de
                        la experiencia y del impacto de la misma)
                    </li>
                </ol>
            </section>

            <section id="posters-digitales" className={styles.section}>
                <h1 className={styles.title}>Normas para la presentación de póster digital</h1>
                <ul className={styles.bulletList}>
                    <li><h3>Confeccionar una diapositiva con el programa PowerPoint® versiones 97 o superior. -
                        Configurar el tamaño de la diapositiva para “Presentación en Pantalla”, con orientación
                        vertical.</h3></li>

                    <li><h3>Guardar el archivo con extensión .ppt o .pptx con un tamaño no mayor a 2 MB (ver
                        instrucciones para la creación del mismo)</h3></li>

                    <li><h3>En el cuerpo de la diapositiva deberá incluirse: Título, Autores y a continuación Introducción
                        [con los objetivos o información más relevante de la presentación], Población, Material y
                        Métodos, Resultados, Conclusiones y/o Recomendaciones.</h3></li>

                    <li><h3>Se sugiere utilizar fondo liso sin ornamentos en un color que contraste con las letras del texto
                        (por ejemplo fondo claro y letras oscuras o viceversa).</h3></li>

                    <li><h3> Para las letras se deberá utilizar fuente Arial 8 en negrita como mínimo, para que permita
                        una adecuada lectura a distancia. Sólo utilizar negrita en ese tamaño, no para letras más
                        grandes.
                    </h3></li>

                    <li><h3>No se admiten animaciones.</h3></li>
                    <li><h3>Las tablas, gráficos, ilustraciones y fotografías requeridas para la presentación deberán ser lo
                        suficientemente explicativas y estar distribuidas secuencialmente en orden a su explicación.
                        Deberá colocarse título en cada una de ellas.</h3></li>

                    <li><h3> Las imágenes deben estar en formato JPG. Recordar que el archivo con el poster debe ser
                        menor a 2MB.
                    </h3></li>

                    <li><h3>Se comunicará al relator de cada trabajo aceptado por el Comité Científico día, hora y número
                        de monitor para realizar su presentación.
                    </h3></li>

                    <li><h3>
                        Ver las fechas límite para el envío de Pósters Digitales. Es necesario contar con este material con
                        anticipación por razones técnicas de edición y programación para la correcta visualización de los
                        trabajos en el Congreso. Por tal motivo de no enviar el Póster Digital en la mencionada fecha, el
                        mismo no se incluirá en la exposición sin excepción. - El envío del Póster Digital se realizará
                        exclusivamente al siguiente correo electrónico.
                    </h3></li>
                </ul>
            </section>

        </div>
    );
}