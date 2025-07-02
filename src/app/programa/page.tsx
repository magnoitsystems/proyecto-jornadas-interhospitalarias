import SectionTitle from "@/components/general/SectionTitle/SectionTitle";
import Summery from "@/components/programa/ProgramSummery/programSummery";

export default function Programa(){
    return(
        <main>
            <SectionTitle
                section={'Programa'}
                imgSrc={'/icons/programa.png'}
                className={'programTitle'}
            />
            <Summery
                date={'Miércoles 05 de Noviembre'}
                eventos={['Acreditación de actividades pre-jornadas',
                    'Apertura Jornadas Vacunas',
                    'Taller Jornada Actualización Inmunizaciones',
                    'Acreditaciones Jornadas',
                    'Talleres para enfermería MUMBAT Sedoanalgesia Neonatología',
                    '--- Prevención cardiovascular y envejecimiento vascular en pediatría',
                    '--- HTA',
                    '--- Obesidad y SME metabólico',
                    '--- Prescripción de actividad física ene pediatría y controles',
                    '--- Enfermedades crónicas, adecuación y transición a clínica médica',
                    '--- Novedades de calendario 2026 Salón Blanco',
                    'Acto inaugural'
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
                    'Carolina Bullor',
                    'Mabel Brindo'
                ]}
                imgSrc={'/imgs/cronograma/miercoles.png'}
            />
            <Summery
                date={'Jueves 06 de Noviembre'}
                eventos={[
                    'Presentación de posters',
                    'Talleres de la Jornada',
                    '--- Seguridad del paciente y calidad',
                    '--- Simulación',
                    '--- Simposio vacunas: VSR y Prevenar 20',
                    '--- De Freud a la biología molecular. Actualidad del neurodesarrollo 130 años después',
                    '--- Patología en salud mental en internación',
                    '--- Presentación y diálogo con expertos',
                    '--- Abordaje integral en TCA',
                    '--- Nuevas Estrategias de Rehidratación'
                ]}
                invitados={[
                    'Dr. Tomás Baliña',
                    'Dra. Mariana Flichman',
                    'Dra. Alejandra Rigalli',
                    'Dra. Adriana Bordogna',
                    'Dra. Gladys Palacios',
                    'Dra. Dolores Laraguyetansim',
                    'Dr. Estanislao Diaz Pumara',
                    'Laboratorio PFIZER',
                    'Dr. Julián Onaindia',
                    'Dra. Carolina Pascual',
                    'Dra. Sandra Novas',
                    'Lic. Constanza Funes',
                    'Dra. Alejandra Perez Cerisola',
                    'Dra. Alejandra Ariovich',
                    'Dr. Juan B.Dartiguelongue'
                ]}
                coordinadores={[
                    'Ana Albanese',
                    'Manuela Beazley',
                    'Celeste Garreta',
                    'Camila Pereyra'
                ]}
                imgSrc={'/imgs/cronograma/jueves.png'}
            />
            <Summery
                date={'Viernes 07 de Noviembre'}
                eventos={[
                    'Talleres de la jornada',
                    '--- Talleres de simulación (HTAL DBV)',
                    '--- Reunión del Comité de Ética',
                    '--- Trauma: Incidentes con víctimas múltiples',
                    '--- Neurodesarrollo: Selectividad alimentaria',
                    '--- Endocrinología. Tratamiento obesidad con análogos GLP1',
                    '--- Simposio Takeda. Dengue',
                    '--- Innovación Tecnológica/IA',
                    '--- Procuración de órganos y trasplante (Comunidad)',
                    'Cierre - Cocktail despedida 20:30hs'
                ]}
                invitados={[
                    'Dr. Miguel del Valle',
                    'Dra. Lorena Firenze',
                    'Dra. Miriam Carbone',
                    'Dr. Pablo Neira',
                    'Dra. Natalia Regatky',
                    'Dra. Josefina Girodo',
                    'Dra. Gabrielle Grinstein',
                    'Dra. Laura Gaete',
                    'Dr. Nicolás Vecchio',
                    'Dr. Guillermo Golfarb'
                ]}
                coordinadores={[
                    'Celeste Garreta',
                    'Micaela Salas',
                    'Nancy Guerrero'
                ]}
                imgSrc={'/imgs/cronograma/viernes.png'}
            />
        </main>
    )
}