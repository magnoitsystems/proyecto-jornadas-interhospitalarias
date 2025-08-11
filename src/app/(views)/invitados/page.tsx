import Title from "@/components/general/SectionTitle/SectionTitle"
import ProfessionalCard from '@/components/guest/Guest';
import styles from './page.module.css';
import { Professional } from "@/types";

const profesionales: Professional[] = [
    {
        id: 1,
        nombre: 'Dra. Angela',
        apellido: 'Gentile',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 2,
        nombre: 'Dra. Florencia',
        apellido: 'Bruggesser',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 3,
        nombre: 'Dra. Angela',
        apellido: 'Sardella',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 4,
        nombre: 'Dra. Evangelina',
        apellido: 'Latazza',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 5,
        nombre: 'Dra. Gabriela',
        apellido: 'Rossi',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 6,
        nombre: 'Dra. Sol',
        apellido: 'Elorriaga',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 7,
        nombre: 'Dra. Ileana',
        apellido: 'Mastropierro',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 8,
        nombre: 'Dr. Alejandro',
        apellido: 'Fainboim',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 9,
        nombre: 'Dr. Tomás',
        apellido: 'Baliña',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 10,
        nombre: 'Dra. Carolina',
        apellido: 'Bullor',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 11,
        nombre: 'Dra. Micaela',
        apellido: 'Salas',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 12,
        nombre: 'Dra. Celeste',
        apellido: 'Garreta',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 13,
        nombre: 'Dra. Mariana',
        apellido: 'Flichman',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 14,
        nombre: 'Dra. Alejandra',
        apellido: 'Rigalli',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 15,
        nombre: 'Dra. Adriana',
        apellido: 'Bordogna',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: 'Hospital El Cruce',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 16,
        nombre: 'Dra. Gladys',
        apellido: 'Palacios',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 17,
        nombre: 'Dr. Estanislao',
        apellido: 'Diaz Pumara',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 18,
        nombre: 'Laboratorio',
        apellido: 'PFIZER',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 19,
        nombre: 'Dr. Julian',
        apellido: 'Onaindia',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 20,
        nombre: 'Dra. Carolina',
        apellido: 'Pascual',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 21,
        nombre: 'Dra. Sandra',
        apellido: 'Novas',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 22,
        nombre: 'Lic. Constanza',
        apellido: 'Funes',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 23,
        nombre: 'Dra. Alejandra',
        apellido: 'Perez Cerisola',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 24,
        nombre: 'Dra. Alejandra',
        apellido: 'Ariovich',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 25,
        nombre: 'Dra. Maria',
        apellido: 'Del Valle Carpinetta',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 26,
        nombre: 'Dr. Juan B. Dartiguelongue',
        apellido: 'Sardella',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 27,
        nombre: 'TANSIM',
        apellido: ' ',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 28,
        nombre: 'Dr. Miguel',
        apellido: 'Del Valle',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 29,
        nombre: 'Dra. Lorena',
        apellido: 'Firenze',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 30,
        nombre: 'Dra. Miriam',
        apellido: 'Carbone',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 31,
        nombre: 'Dr. Pablo',
        apellido: 'Neira',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 32,
        nombre: 'Dra. Natalia',
        apellido: 'Regatky',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 33,
        nombre: 'Dra. Josefina',
        apellido: 'Girodo',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 34,
        nombre: 'Dra. Gabrielle',
        apellido: 'Grinstein',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 35,
        nombre: 'Dra. Adriana',
        apellido: 'Roussos',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 36,
        nombre: 'TAKEDA',
        apellido: ' ',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 37,
        nombre: 'Dr. Nicolás',
        apellido: 'Vecchio',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 38,
        nombre: 'Dr. Guillermo',
        apellido: 'Golfarb',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 39,
        nombre: 'Dr. Christian Elias',
        apellido: 'Costa',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 40,
        nombre: 'Dra. Lorena',
        apellido: 'Moreno',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 41,
        nombre: 'Dr. Ruben',
        apellido: 'Bernardi',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 42,
        nombre: 'Dr. Alejandro',
        apellido: 'Yancowoski',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 43,
        nombre: 'Dra. Mariana',
        apellido: 'Ziunen',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 44,
        nombre: 'Dra. Natalia',
        apellido: 'Cuesta',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
    {
        id: 45,
        nombre: 'Dr. Pablo',
        apellido: 'Centeno',
        profesion: '-',
        especializacion: '-',
        lugarEjerce: '-',
        origen: {
            ciudad: '-',
            provincia: '-',
            pais: '-',
        },
        imagen: null
    },
];
export default function Page(){
    return (
    <main className={styles.main}>
        <Title section={"Invitados"} imgSrc={"/icons/autoridades.png"} className={"guestsTitle"}/>

        <div className={styles.cardsContainer}>
            {profesionales.map((prof) => (
                <ProfessionalCard key={prof.id} professional={prof} />
            ))}
        </div>
    </main>
    )
}