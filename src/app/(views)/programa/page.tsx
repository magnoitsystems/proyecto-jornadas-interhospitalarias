import Title from "@/components/general/SectionTitle/SectionTitle";
import Summery from "@/components/programa/ProgramSummery/programSummery";
import SummaryCard from "@/components/SummaryCard/SummaryCard";

export default function Programa(){
    return(
        <main>
            <Title
                section={'Programa'}
                imgSrc={'/icons/programa.png'}
                className={'programTitle'}
            />
            <Summery
                date={'Miércoles 05 de Noviembre'}
                eventos={['--- Acreditación de actividades pre-jornadas',
                    '--- Taller Interactivo Situaciones Clínicas en Vacunas:',
                    '• Situación epidemiológica de Sarampión: Cómo enfrentamos el brote de Sarampión',
                    '• Pertussis: un brote silencioso',
                    '• Cómo completar esquemas y evitar oportunidades perdidas de vacunación',
                    '--- Jornada de enfermería',
                    '--- Taller de sedoanalgesia',
                    '--- Taller de Neonatología',
                    '--- Educar para la prevención cardiovascular:',
                    '• Prevención cardiovascular y envejecimiento vascular en pediatría ',
                    '• HTA',
                    '• Obesidad y sme metabólico',
                    '• Prescripción de actividad física en pediatría',
                    '--- Enfermedades crónicas, adecuación y transición a clínica médica:',
                    '• El proceso de transición a los servicios de adultos en Tandil',
                    '• El proceso de transición a los    servicios de adultos en CABA',
                    '• ¿Cuál es la mirada del clínico al recibir un adolescente con enfermedad crónica?',
                    '--- Novedades de calendario 2026',
                    '--- Acto inaugural Salon Blanco'
                ]}
                invitados={['Dra. Angela Gentile',
                    'Dra. Florencia Bruggesser',
                    'Dra. Angela Sardella',
                    'Dra. Evangelina Latazza',
                    'Dra. Gabriela Rossi',
                    'Dra. Sol Elorriaga',
                    'Dra. Ileana Mastropierro',
                    'Dr. Alejandro Fainboim'
                ]}
                coordinadores={['Dra. Laura Riva',
                    'Dra. Carolina Bullor',
                    'Mabel Brindo',
                    'Dra. Laura Riva'
                ]}
                day={"miercoles"}
            />
            <Summery
                date={'Jueves 06 de Noviembre'}
                eventos={[
                    '--- Presentación de posters',
                    '--- Seguridad del paciente y calidad:',
                    '• La importancia de la comunicación efectiva en salud',
                    '• Instaurando una cultura de seguridad para brindar cuidados de calidad',
                    '--- Simulación como herramienta de formación:',
                    '• Experiencia Tandil',
                    '• Experiencia CABA',
                    '--- Simposio de la industria VSR  y Prevenar 20',
                    '--- Conferencia - De Freud a la biología molecular. Actualidad del neurodesarrollo 130 años después',
                    '--- La internación por salud mental en sala pediatría:',
                    '• Cuidados clínicos en pacientes internados por patología de salud mental',
                    '• Seguimiento pediátrico ambulatorio de pacientes con patología',
                    '--- Presentación y diálogo con expertos:',
                    '• Desafíos clínicos en la atención de los TCA',
                    '• Fluidoterapia endovenosa en situaciones especiales: CAD, cardiopatías y lesión renal aguda'
                ]}
                invitados={[
                    'Dr. Tomás Baliña',
                    'Dra. Carolina Bullor',
                    'Dra. Micaela Salas',
                    'Dra. Celeste Garreta',
                    'Dra. Mariana Flichman',
                    'Lic. Alejandra Rigalli',
                    'Dra. Adriana Bordogna',
                    'Dra. Gladys Palacios',
                    'Dr. Estanislao Diaz Pumara',
                    'Laboratorio PFIZER',
                    'Dr. Julián Onaindia',
                    'Dra. Carolina Pascual',
                    'Dra. Sandra Novas',
                    'Lic. Constanza Funes',
                    'Dra. Alejandra Perez Cerisola',
                    'Dra. Alejandra Ariovich',
                    'Dra. Maria del Valle Carpinetta',
                    'Dr. Juan B.Dartiguelongue'
                ]}
                coordinadores={[
                    'Dra. Ana Albanese',
                    'Dra. Manuela Beazley',
                    'Dra. Celeste Garreta',
                    'Dr. Teo Silva',
                    'Dra. Camila Pereyra',
                    'Dra. Ileana Mastropierro'
                ]}
                day={"jueves"}
            />
            <Summery
                date={'Viernes 07 de Noviembre'}
                eventos={[
                    '--- Talleres de habilidades Simulación',
                    '--- Reunión del Comité de Ética. MUMBAT',
                    '--- Controversias en la atención del politrauma:',
                    '• Trauma con víctimas múltiples. Prehospital',
                    '• Registro Nacional del Trauma',
                    '--- Comorbilidades en los trastornos del neurodesarrollo. Alimentación, crianza y sueño',
                    '--- Mesa redonda - Obesidad:',
                    '• Tratamiento obesidad con análogos GLP1',
                    '• Estrategias en intervenciones nutricionales y hábitos',
                    '--- Simposio de la industria - Vacuna Dengue',
                    '--- Mesa redonda - Innovacion Tecnológica',
                    '--- Taller de Mindfullnes',
                    '--- Inteligencia artificial aplicada al campo de la salud. ¿Para que debemos prepararnos?',
                    '--- Conferencia de cierre - Procuración de órganos y trasplante (Abierta  a la Comunidad)',
                    '--- Actividad cerrada para el equipo de procuracion',
                    '--- CIERRE - COCKTAIL DESPEDIDA'
                ]}
                invitados={[
                    'TANSIM',
                    'Dr. Miguel del Valle',
                    'Dra. Lorena Firenze',
                    'Dra. Miriam Carbone',
                    'Dr. Pablo Neira',
                    'Dra. Natalia Regatky',
                    'Dra. Josefina Girodo',
                    'Dra. Gabrielle Grinstein',
                    'Dra. Adriana Roussos',
                    'TAKEDA',
                    'Dr. Nicolás Vecchio',
                    'Dr. Guillermo Golfarb',
                    'Dr. Christian Elias Costa',
                    'Dra. Lorena Moreno',
                    'CUCAIBA PBA Dr. Ruben Bernardi',
                    'INCUCAI  Dr. Alejandro Yancowoski',
                    'Dra. Mariana Ziunen',
                    'Autora del Libro "Psicologa": Natalia Cuesta',
                    'Dr. Pablo Centeno y equipo'
                ]}
                coordinadores={[
                    'Comite de Etica SISP',
                    'Dra. Celeste Garreta',
                    'Dra. Micaela Salas',
                    'Dra. Cintia Ojeda',
                    'Dra. Nancy Guerrero',
                    'Dra. Camila Pereyra',
                    'Equipo de Procuración'
                ]}
                day={"viernes"}
            />
        </main>
    )
}