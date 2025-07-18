import Title from "@/components/general/SectionTitle/SectionTitle"
import ProfessionalCard from '@/components/guest/Guest';
import styles from './page.module.css';
import { Professional } from '@/app/types/index'; // Importamos nuestro tipo

const profesionales: Professional[] = [
    {
        id: 1,
        nombre: 'Carlos',
        apellido: 'Santana',
        imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
        profesion: 'Cardiología',
        especializacion: 'Ecocardiografía, Arritmias',
        lugarEjerce: 'Hospital Central Metropolitano',
        origen: {
            ciudad: 'Madrid',
            provincia: 'Madrid',
            pais: 'España',
        },
    },
    {
        id: 2,
        nombre: 'Ana',
        apellido: 'Martínez',
        imagen: null, // <-- TypeScript sabe que `null` es un valor válido aquí
        profesion: 'Pediatría',
        especializacion: 'Neonatología',
        lugarEjerce: 'Clínica Infantil del Norte',
        origen: {
            ciudad: 'Bogotá',
            provincia: 'Cundinamarca',
            pais: 'Colombia',
        },
    },
    {
        id: 3,
        nombre: 'Juan',
        apellido: 'Gómez',
        imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
        profesion: 'Neurología',
        especializacion: 'Enfermedades Neurodegenerativas',
        lugarEjerce: 'Instituto de Neurociencias Avanzadas',
        origen: {
            ciudad: 'Buenos Aires',
            provincia: 'CABA',
            pais: 'Argentina',
        },
    },
];
export default function Page(){
    return (
    <main className={styles.main}>
        <Title section={"Invitados"} imgSrc={"/icons/autoridades.png"} className={"guestsTitle"}/>

        <div className={styles.cardsContainer}>
            {/* El `.map` funciona igual, pero ahora `prof` es de tipo `Professional` */}
            {profesionales.map((prof) => (
                <ProfessionalCard key={prof.id} professional={prof} />
            ))}
        </div>
    </main>
    )
}