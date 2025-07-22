import Title from "@/components/general/SectionTitle/SectionTitle";
import styles from './page.module.css';
import ActivityCard from "@/components/program/activityCard/activityCard";

export default function Programa(){
    return(
        <main>
            <Title
                section={'Programa'}
                imgSrc={'/icons/programa.png'}
                className={'programTitle'}
            />

            <div className={styles.dayProgram}>
                <div className={styles.date}>
                    <h2>Miércoles 05 de Noviembre</h2>
                </div>
                <div className={styles.events}>
                    <ActivityCard
                        eventName={"Situaciones Clínicas en Vacunas"}
                        time={"09:15 - 12:15"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Dra. Angela Gentile,',
                            ' Dra. Florencia Bruggesser.'
                        ]}
                        coordinators={[
                            'Dra. Carolina Bullor'
                        ]}
                        topics={[
                            '"Situación epidemiológica de sarampión: Cómo enfrentamos el brote de Sarampión (09:15 - 10:15)", ',
                            '"Pertussis: un brote silencioso (10:15 - 11:10)", ',
                            '"Cómo completar esquemas y evitar oportunidades perdidas de vacunación (11:30 - 12:15)".'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Educar para la prevención cardiovascular"}
                        time={"13:45 - 15:30"}
                        place={"MUMBAT"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Dra. Angela Sardella,',
                            ' Dra. Evangelina Latazza,',
                            ' Dra. Gabriela Rossi,',
                            ' Dra. Sol Elorriaga.'
                        ]}
                        coordinators={[
                            'Dra. Laura Riva'
                        ]}
                        topics={[
                            '"Prevención cardiovascular y envejecimiento vascular en pediatría", ',
                            '"HTA", ',
                            '"Obesidad y sme metabólico, "',
                            '"Prescripción de actividad física en pediatría".'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Enfermedades crónicas, adecuación y transición a clínica médica"}
                        time={"16:00 - 17:30"}
                        place={"MUMBAT"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Dra. Ileana Mastropierro,',
                            ' Dr. Alejandro Fainboim.'
                        ]}
                        coordinators={[
                            'Dra.Carolina Bullor'
                        ]}
                        topics={[
                            '“El proceso de transición a los servicios de adultos en Tandil”, ',
                            '“El proceso de transición a los servicios de adultos en CABA”, ',
                            '“¿Cuál es la mirada del clínico al recibir un adolescente con enfermedad crónica?".'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Novedades de calendario 2026"}
                        time={"17:45 - 18:45"}
                        place={"Salón Blanco"}
                        guestsName={"Conferencista"}
                        guests={[
                            'Dra. Angela Gentile.'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'conferencia'}
                    />

                    <ActivityCard
                        eventName={"Acto Inaugural"}
                        time={"19:00"}
                        place={"Salón Blanco"}
                        guestsName={"Disertantes"}
                        guests={[
                            '-'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'}
                    />
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
                        place={"MUMBAT/Teatro del Fuerte"}
                        guestsName={"Invitados"}
                        guests={[
                            'Dr. Tomás Baliña,',
                            ' Dra. Carolina Bullor',
                            ' Dra. Micaela Salas,',
                            ' Dra. Celeste Garreta.'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'}
                    />

                    <ActivityCard
                        eventName={"Seguridad del paciente y calidad"}
                        time={"09:15 - 10:45"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Dra. Mariana Flichman,',
                            ' Lic. Alejandra Rigalli.'
                        ]}
                        coordinators={[
                            'Dra. Manuela Beazley,',
                            ' Dra. Ana Albanese'
                        ]}
                        topics={[
                            '"La importancia de la comunicación efectiva en salud", ',
                            '"Instaurando una cultura de seguridad para brindar cuidados de calidad".'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Simulación como herramienta de formación"}
                        time={"11:00 - 12:30"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Dra. Adriana Bordogna,',
                            ' Dra. Gladys Palacios,',
                            ' Dr. Estanislao Diaz Pumara.'
                        ]}
                        coordinators={[
                            'Dra.Celeste Garreta, ',
                            'Equipo TANSIM.'
                        ]}
                        topics={[
                            '“Experiencia Tandil”, ',
                            '“Experiencia CABA”.'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Simposio de la industria VSR y Prevenar 20"}
                        time={"13:00 - 14:00"}
                        place={"Teatro del Fuerte"}
                        guestsName={"Disertante"}
                        guests={[
                            'Laboratorio PFIZER.'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'simposio'}
                    />

                    <ActivityCard
                        eventName={"De Freud a la biología molecular. Actualidad del neurodesarrollo 130 años después."}
                        time={"16:00 - 17:25"}
                        place={"??????????"}
                        guestsName={"Conferencista"}
                        guests={[
                            'Dr. Julian Onaindia'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'conferencia'}
                    />

                    <ActivityCard
                        eventName={"La internación por salud mental en sala pediatría."}
                        time={"16:00 - 17:25"}
                        place={"??????????"}
                        guestsName={"Disertantes"}
                        guests={[
                            'Dra. Carolina Pascual, ',
                            'Dra. Sandra Novas, ',
                            'Lic. Constanza Funes.'
                        ]}
                        coordinators={[
                            'Dr. Teo Silva'
                        ]}
                        topics={[
                            '"Cuidados clínicos en pacientes internados por patología de salud mental", ',
                            '"Seguimiento pediátrico ambulatorio de pacientes con patología".'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Presentación y diálogo con expertos"}
                        time={"17:30 - 18:45"}
                        place={"???????????"}
                        guestsName={"Expertos"}
                        guests={[
                            'Dra. Alejandra Pérez Cerisola, ',
                            'Dra. Alejandra Ariovich, ',
                            'Dra. Maria del Valle Carpinetta, ',
                            'Dr. Juan B. Dartiguelongue.'
                        ]}
                        coordinators={[
                            'Dra. Camila Pereyra, ',
                            'Dra. Ileana Mastropierro.'
                        ]}
                        topics={[
                            '"Desafíos clínicos en la atención de los TCA", ',
                            '"Fluidoterapia endovenosa en situaciones especiales: CAD, cardiopatías y lesión renal aguda".'
                        ]}
                        personalizedClassName={'dialogo'}
                    />
                </div>
            </div>

            <div className={styles.dayProgram}>
                <div className={styles.date}>
                    <h2>Viernes 07 de Noviembre</h2>
                </div>
                <div className={styles.events}>
                    <ActivityCard
                        eventName={"Talleres de habilidades Simulación"}
                        time={"08:00 - 09:30"}
                        place={"HNDV"}
                        guestsName={"Disertantes"}
                        guests={[
                            'TANSIM,',
                            ' Hospital de Niños Debilio Villegas'
                        ]}
                        coordinators={[
                            ''
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Reunión del Comité de Ética"}
                        time={"08:30 - 10:00"}
                        place={"MUMBAT"}
                        guestsName={"Invitados"}
                        guests={[
                            'Dr. Miguel del Valle,',
                            ' Dra. Lorena Firenze.'
                        ]}
                        coordinators={[
                            'Comité de Ética SISP.'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'reunion'}
                    />

                    <ActivityCard
                        eventName={"Controversias en la atención del politrauma TIPO??"}
                        time={"09:45 - 11:15"}
                        place={"??????????"}
                        guestsName={"????????"}
                        guests={[
                            'Dra. Miriam Carbone,',
                            ' Dr. Pablo Neira.'
                        ]}
                        coordinators={[
                            'Dra.Celeste Garreta.'
                        ]}
                        topics={[
                            '“Trauma con víctimas múltiples. Prehospital.”, ',
                            '“Registro Nacional del Trauma”.'
                        ]}
                        personalizedClassName={'others'}
                    />

                    <ActivityCard
                        eventName={"Comorbilidades en los trastornos del neurodesarrollo. Alimentación, crianza y sueño"}
                        time={"11:15 - 12:45"}
                        place={"?????????"}
                        guestsName={"????????"}
                        guests={[
                            'Dra. Natalia Regatky, ',
                            'Dra. Josefina Girodo.'
                        ]}
                        coordinators={[
                            'Dra. Micaela Salas'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'}
                    />

                    <ActivityCard
                        eventName={"Obesidad. Tratamiento obesidad con análogos GLP1."}
                        time={"13:00 - 14:15"}
                        place={"??????????"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Dra. Gabrielle Grinstein, ',
                            'Dra. Adriana Roussos.'
                        ]}
                        coordinators={[
                            'Dra. Cintia Ojea, ',
                            'Nancy Guerrero.'
                        ]}
                        topics={[
                            '"Estrategias en intervenciones nutricionales y hábitos."'
                        ]}
                        personalizedClassName={'redonda'}
                    />

                    <ActivityCard
                        eventName={"Vacuna Dengue."}
                        time={"14:00 - 15:00"}
                        place={"??????????"}
                        guestsName={"Disertante"}
                        guests={[
                            'TAKEDA.'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'simposio'}
                    />

                    <ActivityCard
                        eventName={"Innovación Tecnológica"}
                        time={"15:00 - 16:30"}
                        place={"???????????"}
                        guestsName={"Panelistas"}
                        guests={[
                            'Dr. Nicolás Vecchio, ',
                            'Dr. Guillermo Golfarb.'
                        ]}
                        coordinators={[
                            '-'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'redonda'}
                    />

                    <ActivityCard
                        eventName={"Taller Mindfullnes"}
                        time={"14:00 - 15:30"}
                        place={"???????????"}
                        guestsName={"Disertante"}
                        guests={[
                            'Dr. Christian Elias Costa'
                        ]}
                        coordinators={[
                            'Dra. Nancy Guerrero'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'taller'}
                    />

                    <ActivityCard
                        eventName={"Inteligencia Artificial aplicada al campo de la salud. ¿Para qué debemos prepararnos?"}
                        time={"15:30 - 16:45"}
                        place={"???????????"}
                        guestsName={"?????????"}
                        guests={[
                            'Dr. Nicolás Vecchio, ',
                            'Dr. Guillermo Golfarb.'
                        ]}
                        coordinators={[
                            'Dra. Camila Pereyra'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'others'}
                    />

                    <ActivityCard
                        eventName={'Procuración de órganos y trasplante'}
                        time={"17:00 - 18:00"}
                        place={"???????????"}
                        guestsName={"Conferencistas"}
                        guests={[
                            'Dra. Lorena Moreno, ',
                            'Dr. Ruben Bernardi, ',
                            'Dr. Alejandro Yancowoski, ',
                            'Dra. Mariana Ziunen, ',
                            'Natalia Cuesta (Autora del libro "Psicología").'
                        ]}
                        coordinators={[
                            'Equipo de procuración'
                        ]}
                        topics={[
                            '-'
                        ]}
                        personalizedClassName={'confAbierta'}
                    />

                    <ActivityCard
                        eventName={"Cierre - Cocktail despedida"}
                        time={"18:00 - 18:30"}
                        place={"???????????"}
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
                        personalizedClassName={'others'}
                    />
                </div>
            </div>
        </main>
    )
}