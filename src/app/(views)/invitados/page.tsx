import Title from "@/components/general/SectionTitle/SectionTitle"
import ProfessionalCard from '@/components/guest/Guest';
import styles from './page.module.css';
import { Professional } from "@/types";

const profesionales: Professional[] = [
    {
        id: 1,
        nombre: 'Carolina',
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
        id: 3,
        nombre: 'Angela',
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
        id: 4,
        nombre: 'María',
        apellido: 'del Valle Juárez',
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
        nombre: 'Natalia',
        apellido: 'Pejito',
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
        nombre: 'Florencia',
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
        id: 8,
        nombre: 'Vanesa',
        apellido: 'Bazan',
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
        nombre: 'Claudio',
        apellido: 'Moros',
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
        nombre: 'Gabriela',
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
        id: 17,
        nombre: 'Alejandro',
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
        id: 18,
        nombre: 'Laura',
        apellido: 'Lewin',
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
        nombre: 'Alejandra',
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
        id: 22,
        nombre: 'Juan B.',
        apellido: 'Dartiguelongue',
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
        nombre: 'Adriana',
        apellido: 'Bordogna',
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
        nombre: 'Gladys',
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
        id: 26,
        nombre: 'Estanislao',
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
        id: 28,
        nombre: 'Julian',
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
        id: 32,
        nombre: 'Alejandra',
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
        id: 33,
        nombre: 'Mariana',
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
        id: 36,
        nombre: 'Sandra',
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
        id: 40,
        nombre: 'Miguel',
        apellido: 'del Valle',
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
        nombre: 'Natalia',
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
        id: 47,
        nombre: 'Juliana',
        apellido: 'Mehring',
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
        id: 47,
        nombre: 'Florencia',
        apellido: 'Migliano',
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
        id: 48,
        nombre: 'Gabriela',
        apellido: 'Nuni Grinstein',
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
        id: 49,
        nombre: 'Adriana',
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
        id: 50,
        nombre: 'Christian Elias',
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
        id: 51,
        nombre: 'Nicolás',
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
        id: 52,
        nombre: 'Guillermo',
        apellido: 'Goldfarb',
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
        id: 56,
        nombre: 'Mariana',
        apellido: 'Cyunell',
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
        id: 57,
        nombre: 'Laura',
        apellido: 'Alladro',
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
        id: 58,
        nombre: 'Ona',
        apellido: 'Sujoy',
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
        id: 59,
        nombre: 'María',
        apellido: 'Zanetti',
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
        id: 60,
        nombre: 'Cecilia',
        apellido: 'Trangoni',
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
        id: 61,
        nombre: 'Marisol',
        apellido: 'Lazarte',
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
        id: 62,
        nombre: 'Daniela',
        apellido: 'Satragno',
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
        id: 63,
        nombre: 'María Luisa',
        apellido: 'Videla Balaguer',
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