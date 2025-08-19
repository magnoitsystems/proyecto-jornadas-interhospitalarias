import Title from "@/components/general/SectionTitle/SectionTitle";
import styles from './page.module.css';
import ActivityCard from "@/components/program/activityCard/activityCard";
import ActivitiesGuide from "@/components/program/guide/activitiesGuide";

export default function Programa(){
    return(
        <main>
            <Title
                section={'Programa'}
                imgSrc={'/icons/programa.png'}
                className={'programTitle'}
            />

            <ActivitiesGuide/>

            <div className={styles.dayProgram}>
                <div className={styles.date}>
                    <h2>Miércoles 05 de Noviembre</h2>
                </div>
                <div className={styles.events}>
                    <ActivityCard
                        eventName={"Acreditación"}
                        time={"08:30"}
                        place={"-"}
                        guestsName={"-"}
                        guests={['-']}
                        coordinators={['-']}
                        topics={['-']}
                        personalizedClassName={'others'} className={""}
                    />

                    <ActivityCard
                        eventName={"Situaciones clínicas en vacunas"}
                        time={"09:15 - 12:15"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"-"}
                        guests={[]}
                        coordinators={[
                            'Carolina Bullor,',
                            ' Romina Escruela.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Situación epidemiológica de sarampión:\n" +
                            "¿Cómo enfrentamos el brote ?"}
                        time={"09:15 - 10:15"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Ángela Gentile,',
                            ' María del Valle Juárez,',
                            ' Natalia Pejito.'
                        ]}
                        coordinators={[
                            'Carolina Bullor,',
                            ' Romina Escruela.'
                        ]}
                        topics={[

                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Pertussis: un brote silencioso"}
                        time={"10:15 - 11:10"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Florencia Bruggesser,',
                            ' María del Valle Juárez,',
                            ' Natalia Pejito.',
                        ]}
                        coordinators={[
                            'Carolina Bullor,',
                            ' Romina Escruela.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Receso"}
                        time={"11:10 - 11:30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={'-'}
                        guests={['-']}
                        coordinators={['-']}
                        topics={['-']}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Cómo completar esquemas y evitar oportunidades perdidas de\n" +
                            "vacunación"}
                        time={"11:30 - 12:15"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Vanesa Castellano,',
                            ' Virginia Bazan.',
                        ]}
                        coordinators={[
                            'Carolina Bullor,',
                            ' Romina Escruela.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Almuerzo"}
                        time={"12.30"}
                        place={"-"}
                        guestsName={'-'}
                        guests={['-']}
                        coordinators={['-']}
                        topics={['-']}
                        personalizedClassName={'others'} className={""}                    />

                    {/*<ActivityCard*/}
                    {/*    eventName={"Jornada para Enfermería"}*/}
                    {/*    time={"14:00 - 18:00"}*/}
                    {/*    place={"MUMBAT"}*/}
                    {/*    guestsName={"Disertantes"}*/}
                    {/*    guests={[*/}
                    {/*        '-',*/}
                    {/*    ]}*/}
                    {/*    coordinators={[*/}
                    {/*        '-'*/}
                    {/*    ]}*/}
                    {/*    topics={[*/}
                    {/*        'Taller de sedoanalgesia. Taller cuidados del recién nacido.'*/}
                    {/*    ]}*/}
                    {/*    personalizedClassName={'taller'} className={""}                    />*/}

                    <ActivityCard
                        eventName={"Analgo sedación en paciente con ARM en UTIP"}
                        time={"14:00 - 16:00"}
                        place={"MUMBAT"}
                        guestsName={"Disertantes"}
                        guests={[
                            "Laura Vazquez -  Rosa Gonzáles  Gabriela Ozimek"
                        ]}
                        coordinators={[
                            "Cecilia Acosta, Miriam Aguirre"
                        ]}
                        topics={[

                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Intervenciones Humanizadas en UCIN. Fortaleciendo el vínculo en momentos críticos"}
                        time={"16:00 - 17:00"}
                        place={"MUMBAT"}
                        guestsName={"Disertantes"}
                        guests={[
                            "Cecilia Trangoni -  Marisol Lazarte"
                        ]}
                        coordinators={[
                            "Cecilia Acosta, Miriam Aguirre"
                        ]}
                        topics={[

                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Cuidados Humanizados, ayudar a los padres a hacer frente a la UCIN"}
                        time={"17:00 - 18:00"}
                        place={"MUMBAT"}
                        guestsName={"Disertantes"}
                        guests={[
                            "Daniela Satragno  -  María Luisa Videla Balaguer"
                        ]}
                        coordinators={[
                            "Cecilia Acosta, Miriam Aguirre"
                        ]}
                        topics={[

                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Educar para la prevención cardiovascular"}
                        time={"13.45 - 15.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Detallado en cada evento',
                        ]}
                        coordinators={[
                            'Laura Riva.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Prevención cardiovascular y envejecimiento vascular en pediatría"}
                        time={"13.45 - 15.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Claudio Moros.',
                        ]}
                        coordinators={[
                            'Laura Riva.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Hipertensión arterial"}
                        time={"13.45 - 15.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Evangelina Latazza.',
                        ]}
                        coordinators={[
                            'Laura Riva.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Obesidad y sindrome metabólico"}
                        time={"13.45 - 15.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Gabriela Rossi.',
                        ]}
                        coordinators={[
                            'Laura Riva.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Prescripción de actividad física en pediatría y controles"}
                        time={"13.45 - 15.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Sol Elorriaga.',
                        ]}
                        coordinators={[
                            'Laura Riva.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Niños con enfermedades crónicas: la transición a la vida adulta."}
                        time={"16:00 - 17.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Detallados en cada evento',
                        ]}
                        coordinators={[
                            'Mabel Brindo,',
                            ' Lucila Heer.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"El proceso de transición a los servicios de adultos en Tandil"}
                        time={"16:00 - 17.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Josefina Girodo.',
                        ]}
                        coordinators={[
                            'Mabel Brindo,',
                            ' Lucila Heer.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"El proceso de transición a los servicios de adultos en CABA"}
                        time={"16:00 - 17.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Alejandro Fainboim.',
                        ]}
                        coordinators={[
                            'Mabel Brindo,',
                            ' Lucila Heer.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"¿Cuál es la mirada del clínico al recibir un adolescente con\n" +
                            "enfermedad crónica?"}
                        time={"16:00 - 17.30"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Laura Lewin.',
                        ]}
                        coordinators={[
                            'Mabel Brindo,',
                            ' Lucila Heer.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Últimas novedades del Calendario Nacional"}
                        time={"17.45 - 18.45"}
                        place={"Salón Blanco"}
                        guestsName={"Conferencista"}
                        guests={[
                            'Ángela Gentile.',
                        ]}
                        coordinators={[
                            'Carolina Pascual.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'conferencia'} className={""}                    />

                    <ActivityCard
                        eventName={"Acto Inaugural"}
                        time={"19:00"}
                        place={"Salón Blanco"}
                        guestsName={"-"}
                        guests={[
                            '-',
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'} className={""}                    />
                </div>

            </div>

            <div className={styles.dayProgram}>
                <div className={styles.date}>
                    <h2>Jueves 06 de Noviembre</h2>
                </div>
                <div className={styles.events}>
                    <ActivityCard
                        eventName={"Presentación de pósters"}
                        time={"08:00 - 09:00"}
                        place={"MUMBAT-Teatro del Fuerte"}
                        guestsName={"-"}
                        guests={[
                            '-'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'} className={""}                    />

                    <ActivityCard
                        eventName={"Presentaciones y diálogo con experto en temas de medicina interna"}
                        time={"09:15 - 10:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Expertos"}
                        guests={[
                            'Especificado en cada evento.'
                        ]}
                        coordinators={[
                            'Alejandra Pérez Cerisola.'
                        ]}
                        topics={[
                            '"Desafíos clínicos en la atención de los paciente con TCA", ',
                            '"Fluidoterapia endovenosa en situaciones especiales: cetoacidosis diabetica, cardiopatías y lesión renal aguda".'
                        ]}
                        personalizedClassName={'dialogo'} className={""}                    />

                    <ActivityCard
                        eventName={"Desafíos clínicos en la atención de los paciente con TCA"}
                        time={"09:15 - 10:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Expertos"}
                        guests={[
                            'Alejandra Ariovich,',
                            ' Maria del Valle Carpineta.'
                        ]}
                        coordinators={[
                            'Alejandra Pérez Cerisola, Camila Pereyra'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'dialogo'} className={""}                    />

                    <ActivityCard
                        eventName={"Fluidoterapia endovenosa en situaciones especiales:\n" +
                            "cetoacidosis diabetica, cardiopatías y lesión renal aguda"}
                        time={"09:15 - 10:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Expertos"}
                        guests={[
                            ''
                        ]}
                        coordinators={[
                            'Alejandra Pérez Cerisola, Camila Pereyra'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'dialogo'} className={""}                    />

                    <ActivityCard
                        eventName={"Simulación como herramienta en la formación"}
                        time={"11:00 - 12:30"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Adriana Bordogna,',
                            ' Gladys Palacios,',
                            ' Cristian Bernardo,',
                            ' Estanislao Díaz Pumara,',
                        ]}
                        coordinators={[
                            'Manuel Morán.'
                        ]}
                        topics={[
                            '"Debriefing clínico", ',
                            ' "Recorrido y desafíos Tansim", ',
                            ' "Simulación con bajos recursos".'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Simposio de la Industria: VSR y Prevenar 20 - Laboratorio Pfizer"}
                        time={"13:00 - 14:00"}
                        place={"Teatro del Fuerte"}
                        guestsName={"-"}
                        guests={[
                            '-',
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'simposio'} className={""}                    />

                    <ActivityCard
                        eventName={"Almuerzo"}
                        time={"14:00 - 14:45"}
                        place={"-"}
                        guestsName={"-"}
                        guests={[
                            '-',
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'} className={""}                    />

                    <ActivityCard
                        eventName={"De Freud a la biología molecular. Actualidad del neurodesarrollo 130 años después "}
                        time={"14:45 - 15:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Conferencista"}
                        guests={[
                            'Julian Onaindia.',
                        ]}
                        coordinators={[
                            'Nancy Guerrero.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'conferencia'} className={""}                    />

                    <ActivityCard
                        eventName={"Calidad en la atención en salud"}
                        time={"16:00 - 17:15"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Detallado en cada evento',
                        ]}
                        coordinators={[
                            'Ana Albanese,',
                            ' Manuela Beazley.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"La importancia de la comunicación efectiva en salud"}
                        time={"16:00 - 17:15"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Alejandra Rigalli.',
                        ]}
                        coordinators={[
                            'Ana Albanese,',
                            ' Manuela Beazley.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Instaurando una cultura de seguridad para brindar cuidados de calidad"}
                        time={"16:00 - 17:15"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Mariana Flichman.',
                        ]}
                        coordinators={[
                            'Ana Albanese,',
                            ' Manuela Beazley.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"La internación por salud mental en la infancia. Prácticas clínicas, gestión, abordaje interdisciplinario en un hospital pediátrico"}
                        time={"17:30 - 19:50"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Detallado en cada evento',
                        ]}
                        coordinators={[
                            'Cynthia Sflaeftein,',
                            '  Ileana Mastropierro.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Abordaje integral de pacientes internados por patología de salud mental en salas de pediatría"}
                        time={"17:30 - 19:50"}
                        place={"Teatro del Fuerte"}
                        guestsName={""}
                        guests={[
                            'Carolina Pascual',
                        ]}
                        coordinators={[
                            'Cynthia Sflaeftein,',
                            '  Ileana Mastropierro.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Internación por salud mental de niños y adolescentes. Desafíos y controversias actuales"}
                        time={"17:30 - 19:50"}
                        place={"Teatro del Fuerte"}
                        guestsName={""}
                        guests={[
                            'Sandra Novas',
                        ]}
                        coordinators={[
                            'Cynthia Sflaeftein,',
                            ' Ileana Mastropierro.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"El pediatra en salud mental: un nuevo espacio de articulación y cuidado clínico"}
                        time={"17:30 - 19:50"}
                        place={"Teatro del Fuerte"}
                        guestsName={""}
                        guests={[
                            'Constanza Funes, ',
                            'Jose Silva.'
                        ]}
                        coordinators={[
                            'Cynthia Sflaeftein,',
                            ' Ileana Mastropierro.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Actividad Cultural: Proyección de la película “Alemania”"}
                        time={"19:00"}
                        place={"Cine Fórum - Teatro Del Fuerte"}
                        guestsName={""}
                        guests={[
                            'Actividad abierta a la comunidad'
                        ]}
                        coordinators={[
                            'Constanza Funes.'
                        ]}
                        personalizedClassName={'others'} className={""}                    />

                    <ActivityCard
                        eventName={"RCP al paso"}
                        time={"Todo el día"}
                        place={"Teatro del Fuerte - Mumbat"}
                        guestsName={""}
                        guests={[
                            'Residencia de Pediatría Tandil'
                        ]}
                        coordinators={[
                            'Emilia Peñalva.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'} className={""}                    />
                </div>
            </div>

            <div className={styles.dayProgram}>
                <div className={styles.date}>
                    <h2>Viernes 07 de Noviembre</h2>
                </div>
                <div className={styles.events}>
                    <ActivityCard
                        eventName={"Talleres de habilidades en simulación clínica"}
                        time={"08:00 - 09:30"}
                        place={"SUM HDBV"}
                        guestsName={"Invitados"}
                        guests={[
                            '-'
                        ]}
                        coordinators={[
                            'Centro de simulación clínica Tandil (TANSIM).'
                        ]}
                        topics={[
                            'Suturas / Manejo del paciente traqueostomizado / Vía aérea'
                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Reunión de Integrantes del Comité de Ética e Investigadores"}
                        time={"08:30 - 10:00"}
                        place={"MUMBAT"}
                        guestsName={"Invitados"}
                        guests={[
                            'Dr. Miguel del Valle,',
                            ' Dra. Lorena Firenze.'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'reunion'} className={""}                    />

                    <ActivityCard
                        eventName={"Novedades en el manejo del politrauma"}
                        time={"09:45 - 11:15"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Detallado en cada evento.'
                        ]}
                        coordinators={[
                            'Celeste Garreta,',
                            ' Gonzalo Laplace.',
                        ]}
                        topics={[
                            '“Controversias en la atención del politrauma”, ',
                            '“Trauma con víctimas múltiples. Prehospital.”.'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Controversias en la atención del politrauma"}
                        time={"09:45 - 11:15"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Miriam Carbone.'
                        ]}
                        coordinators={[
                            'Celeste Garreta,',
                            ' Gonzalo Laplace.',
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Trauma con víctimas múltiples. Prehospital"}
                        time={"09:45 - 11:15"}
                        place={"Teatro Del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Pablo Neira.'
                        ]}
                        coordinators={[
                            'Celeste Garreta,',
                            ' Gonzalo Laplace.',
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={'Neurodesarrollo'}
                        time={"11:15 - 12:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"??????????"}
                        guests={[
                            'Natalia Regatky, ',
                            '  Ana Cabral.'
                        ]}
                        coordinators={[
                            'Josefina Girodo,',
                            ' Micaela Salas',
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={'Neurodesarrollo y desafíos cotidianos: comorbilidades en el espectro'}
                        time={"11:15 - 12:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"??????????"}
                        guests={[
                            'Natalia Regatky'
                        ]}
                        coordinators={[
                            'Josefina Girodo,',
                            ' Micaela Salas',
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={'Alimentación, crianza y sueño'}
                        time={"11:15 - 12:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"??????????"}
                        guests={[
                            'Natalia Regatky, ',
                            ' Ana Cabral.'
                        ]}
                        coordinators={[
                            'Josefina Girodo,',
                            ' Micaela Salas',
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Nuevos desafíos en el manejo de la obesidad"}
                        time={"13:00 - 14:15"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Especificados en cada evento.'
                        ]}
                        coordinators={[
                            'Juliana Mehring, ',
                            'Florencia Migliano.'
                        ]}
                        topics={[
                            '"Tratamiento obesidad con análogos GLP1,"',
                            ' "Estrategias en intervenciones nutricionales y hábitos de vida".'
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Tratamiento de la obesidad con análogos GLP1"}
                        time={""}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Nuni Grinstein.'
                        ]}
                        coordinators={[
                            'Juliana Mehring, ',
                            'Florencia Migliano.'
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={"Estrategias en intervenciones nutricionales y hábitos de vida"}
                        time={""}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelista"}
                        guests={[
                            'Adriana Roussos.'
                        ]}
                        coordinators={[
                            'Juliana Mehring, ',
                            'Florencia Migliano.'
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={'Simposio Laboratorio Inmunova'}
                        time={"14:15 - 15:15"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Disertante"}
                        guests={[
                            '-'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'simposio'} className={""}                    />

                    <ActivityCard
                        eventName={"Taller Mindfullnes. Cupo: 30 personas - Inscripción previa."}
                        time={"14:00 - 15:30"}
                        place={"MUMBAT"}
                        guestsName={"Disertante"}
                        guests={[
                            'Christian Elias Costa.'
                        ]}
                        coordinators={[
                            ''
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'taller'} className={""}                    />

                    <ActivityCard
                        eventName={"Inteligencia Artificial aplicada al campo de la salud. ¿Para qué debemos prepararnos?"}
                        time={"15:30 - 16:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Nicolás Vecchio, ',
                            'Guillermo Golfarb.'
                        ]}
                        coordinators={[
                            'Camila Pereyra,',
                            ' Cintia Ojea.'
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'redonda'} className={""}                    />

                    <ActivityCard
                        eventName={'Hablemos de la donación de órganos en pediatría'}
                        time={"17:00 - 18:00"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Conferencistas"}
                        guests={[
                            'Lorena Moreno, ',
                            'Mariana Cyunell, ',
                            'Laura Alladro.'
                        ]}
                        coordinators={[
                            ''
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'confAbierta'} className={""}                    />

                    <ActivityCard
                        eventName={"Cierre de Jornadas"}
                        time={"18:00 - 18:30"}
                        place={"Teatro del Fuerte"}
                        guestsName={"-"}
                        guests={[
                            ''
                        ]}
                        coordinators={[
                            ''
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'others'} className={""}                    />

                    <ActivityCard
                        eventName={"Cocktail de Despedida"}
                        time={"18:00 - 18:30"}
                        place={"Teatro del Fuerte"}
                        guestsName={"-"}
                        guests={[
                            ''
                        ]}
                        coordinators={[
                            ''
                        ]}
                        topics={[
                            ''
                        ]}
                        personalizedClassName={'others'} className={""}                    />
                </div>
            </div>
        </main>
    )
}