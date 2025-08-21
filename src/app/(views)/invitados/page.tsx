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
        id: 2,
        nombre: 'Romina',
        apellido: 'Escruela',
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
        id: 7,
        nombre: 'Vanesa',
        apellido: 'Vanesa',
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
        id: 9,
        nombre: 'Laura',
        apellido: 'Riva',
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
        id: 13,
        nombre: 'Sol',
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
        id: 14,
        nombre: 'Mabel',
        apellido: 'Brindo',
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
        nombre: 'Lucila',
        apellido: 'Heer',
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
        nombre: 'Josefina',
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
        id: 19,
        nombre: 'Carolina',
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
        id: 20,
        nombre: 'Alejandra',
        apellido: 'Pérez Cerisola',
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
        id: 25,
        nombre: 'Christian',
        apellido: 'Bernardo',
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
        id: 27,
        nombre: 'Manuel',
        apellido: 'Morán',
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
        id: 29,
        nombre: 'Nancy',
        apellido: 'Guerrero',
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
        nombre: 'Ana',
        apellido: 'Albanese',
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
        nombre: 'Manuela',
        apellido: 'Beazley',
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
        id: 34,
        nombre: 'Cynthia',
        apellido: 'Sflaeftein',
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
        nombre: 'Ileana',
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
        id: 37,
        nombre: 'Constanza',
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
        id: 38,
        nombre: 'Jose',
        apellido: 'Silva',
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
        nombre: 'Emilia',
        apellido: 'Peñalva',
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
        id: 41,
        nombre: 'Celeste',
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
        id: 42,
        nombre: 'Gonzalo',
        apellido: 'Laplace',
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
        nombre: 'Miriam',
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
        id: 44,
        nombre: 'Pablo',
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
        id: 46,
        nombre: 'Berenice',
        apellido: 'González',
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
        id: 53,
        nombre: 'Camila',
        apellido: 'Pereyra',
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
        id: 54,
        nombre: 'Cintia',
        apellido: 'Ojea',
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
        id: 55,
        nombre: 'Lorena',
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