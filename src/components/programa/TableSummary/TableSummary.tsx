import EventTable from "@/components/programa/TableSummary/EventTable";

type prop = {
    day: string;
};

export default function TableSummary({ day }: prop) {
    const headers = ["Hora y Lugar", "Nombre del Evento", "Invitados", "Coordinador/es"];

    let rows: { content: React.ReactNode; colSpan?: number; rowSpan?: number; isHeader?: boolean }[][] = [];

    if (day === "miercoles") {
        rows = [
            [
                { content: "08:30", isHeader: false },
                { content: "Acreditación", colSpan: 3 },
            ],
            [
                { content: "09:15 - 12:15 (Teatro del Fuerte)" },
                { content: "Taller Interactivo Situaciones clínicas en Vacunas", colSpan: 3 },
            ],
            [
                { content: "09:15 - 10:15" },
                { content: "Situación epidemiológica de Sarampión: Cómo enfrentamos el brote de Sarampión" },
                { content: "Dra. Angela Gentile, Dra. Florencia Bruggesser", rowSpan: 4 },
                { content: "Dra. Carolina Bullor", rowSpan: 4 },
            ],
            [
                { content: "10:15 - 11:10" },
                { content: "Pertussis: un brote silencioso" },
            ],
            [
                { content: "11:10 - 11:30" },
                { content: "Receso" },
            ],
            [
                { content: "11:30 - 12:15" },
                { content: "Cómo completar esquemas y evitar oportunidades perdidas de vacunación" },
            ],
            [
                { content: "12:30" },
                { content: "Almuerzo", colSpan: 3 },
            ],
            [
                { content: "14:00 - 18:00" },
                { content: "Jornada de enfermería, Taller de sedoanalgesia, Taller de Neonatología", colSpan: 3 },
            ],
            [
                { content: "13:45 - 15:30" },
                {
                    content:
                        "Educar para la prevención cardiovascular: - Prevención cardiovascular y envejecimiento vascular en pediatría. - HTA - Obesidad y sm. metabólico - Prescripción de actividad física en pediatría",
                },
                {
                    content:
                        "Dra. Angela Sardella, Dra. Evangelina Latazza, Dra. Gabriela Rossi, Dra. Sol Elorriaga",
                },
                { content: "Dra. Laura Riva (Hospital de Niños Debilio Villegas de Tandil)" },
            ],
            [
                { content: "16:00 - 17:30" },
                {
                    content:
                        "Enfermedades crónicas, adecuación, transición a clínica médica: - El proceso de transición a los servicios de adultos en Tandil. - En CABA. - ¿Cuál es la mirada del clínico al recibir un adolescente con enfermedad crónica?",
                },
                { content: "Dra. Ileana Mastropierro, Dr. Alejandro Fainboim" },
                {
                    content:
                        "Dra. Carolina Bullor (Hospital de Niños Ricardo Gutierrez de Buenos Aires), Dra. Mabel Brindo (Hospital de Niños Debilio Villegas de Tandil)",
                },
            ],
            [
                { content: "17:45 - 18:45 (Salón Blanco)" },
                { content: "Novedades de calendario 2026" },
                { content: "Dra. Angela Gentile" },
                { content: " " },
            ],
            [
                { content: "19:00 (Salón Blanco)" },
                { content: "Acto inaugural", colSpan: 3 },
            ],
        ];
    } else if (day === "jueves") {
        rows = [
            [
                { content: "08:00 - 09:00 (MUMBAT - Teatro del Fuerte)", isHeader: false },
                { content: "Presentación de posters" },
                { content: "Dro. Tomás Baliña, Dra. Carolina Bullor, Dra. Micaela Salas, Dra. Celeste Garreta"},
                { content: " "}
            ],
            [
                { content: "09:15 - 10:45 (Teatro del Fuerte)" },
                { content: "Seguridad del paciente y calidad: - La importancia de la comunicación efectiva en salud. - Instaurando una cultura de " +
                        "seguridad para brindar ciudados de calidad" },
                { content: "Dra. Mariana Flichman, Lic. Alejandra Rigalli" },
                { content: "Dra. Manuela Beazley, Dra. Ana Albanese" }
            ],
            [
                { content: "11:00 - 12:30 (Teatro del Fuerte)" },
                { content: "Simulación como herramienta de formación: - Experiencia Tandil. - Emperiencia CABA" },
                { content: "Dra. Adriana Bordogna (Hospital El Cruce), Dra. Gladys Palacios (Hospital de Niños Ricardo Gutierrez), Dr. Estanislao Diaz Pumara (Hospital de Niños Ricardo Gutierrez" },
                { content: "Dra. Celeste Garreta, Equipo TANSIM" },
            ],
            [
                { content: "13:00 - 14:00 (Teatro del Fuerte)" },
                { content: "Simposio de la industria VSR y Prevenar 20" },
                { content: "Laboratorio PFIZER" },
                { content: " "}
            ],
            [
                { content: "14:00 - 14:45" },
                { content: "Almuerzo", colSpan: 3 },
            ],
            [
                { content: "16:00 - 17:25" },
                { content: "Conferencia: De Freud a la biología molecular. Actualidad del neudesarrollo 130 años después" },
                { content: "Dr. Julian Onaindia" },
                { content: " " }
            ],
            [
                { content: "16:00 - 17:25" },
                { content: "La internación por salud mental en sala pediatría: -Cuidados clínicos en pacientes internados por patología de salud mental - Seguimientos pediátrico ambulatorio de pacientes con patología"},
                { content: "Dra. Carolina Pascual, Dra. Sandra Novas, Lic. Constanza Fuente" },
                { content: "Dr. Teo Silva" }
            ],
            [
                { content: "17:30 - 18:45" },
                { content: "La internación por salud mental en sala pediatría: -Cuidados clínicos en pacientes internados por patología de salud mental - Seguimientos pediátrico ambulatorio de pacientes con patología"},
                { content: "Dra. Carolina Pascual, Dra. Sandra Novas, Lic. Constanza Fuente" },
                { content: "Dr. Teo Silva" }
            ]
        ];
    } else if (day === "viernes") {
        rows = [
            [
                { content: "08:00 - 09:30 (Hospital de Niños Debilio Villegas de Tandil)", isHeader: false },
                { content: "Talleres de Habilidades Simulación" },
                { content: "TANSIM, Hospital de Niños Debilio Villegas de Tandil"},
                { content: " "}
            ],
            [
                { content: "09:15 - 10:00 (MUMBAT)" },
                { content: "Reunión del Comité de Ética" },
                { content: "Dr. Miguel del Valle y Dra. Lorena Firenze" },
                { content: "Comité de Ética SISP" }
            ],
            [
                { content: "9:45 - 11:45" },
                { content: "Controversias en la atención del politrauma: - Trauma con víctimas múltiples, prehospital. - Registro Nacional del Trauma" },
                { content: "Dra. Miriam Carbone y Dr. Paoblo Neira" },
                { content: "Dra. Celeste Garreta" },
            ],
            [
                { content: "11:15 - 12:45" },
                { content: "Comorbilidades en los trastornos del neurodesarrollo, alimentación, crianza y sueño" },
                { content: "Dra. Natalia Regatky y Dra. Josefina Girodo" },
                { content: "Dra. Micaela Salas"}
            ],
            [
                { content: "13:00 - 14:15" },
                { content: "Mesa redonda - Obesidad: - Tratamientos obesidad con análogos GLPI. - Estrategias en intervenciones nutricionales y hábitos" },
                { content: "Dra. Gabrielle Grinstein y Dra. Adriana Roussos" },
                { content: "Dta. Cintia Ojea y Dra. Nancy Guerrero" },
            ],
            [
                { content: "14:00 - 15:00" },
                { content: "Simposio de la industria: Vacuna Dengue" },
                { content: "TAKEDA" },
                { content: " " }
            ],
            [
                { content: "14:00 - 15:30" },
                { content: "Taller de Mindfullnes"},
                { content: "Dr. Christian Elias Costa" },
                { content: "Dra. Nancy Guerrero" }
            ],
            [
                { content: "15:00 - 16:30" },
                { content: "Mesa redonda: Innovación Tecnológica"},
                { content: "Dr. Nicolás Veccio y Dr. Guillermo Golfarb" },
                { content: "" }
            ],
            [
                { content: "15:30 - 16:45" },
                { content: "Inteligencia Artificial aplicada al campo de la salud. ¿Para qué debemos prepararnos?"},
                { content: "Dr. Nicolás Vecchio y Dr.Guillermo Golfarb" },
                { content: "Dra. Camila Pereyra" }
            ],
            [
                { content: "17:00 - 18:00" },
                { content: "Conferencia de cierre: Procuración de órganos y trasplante (Abierta a la Comunidad)"},
                { content: "Dra. Lorena Moreno, Dr. Ruver Bernadi (CUCAIBA PBA), Dr. Alejandro Yancowoski (INCUCAI), Dra. Mariana Ziunen, Autora del Libro 'Psicóloga': Natalia Cuesta" },
                { content: "Equipo de Procuración" }
            ],
            [
                { content: " " },
                { content: "Actividad cerrada para el equipo de procuración"},
                { content: "Dr. Pablo Centeno y equipo" },
                { content: " " }
            ],
            [
                { content: "18:00 - 18:30" },
                { content: "CIERRE - COCKTAIL DESPEDIDA 20:30HS", colSpan: 3},
            ]
        ];
    }

    return rows.length > 0 ? <EventTable headers={headers} rows={rows} /> : null;
}
