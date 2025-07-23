'use client';

import RoundedCard from "@/components/RoundedCard/RoundedCard";
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";
import UserCard from "@/components/UserCard/UserCard";
import SignOutButton from "@/components/botonSingOut/SignOutButton"

const userCardData = [
    {
        id: 1,
        image: "/icons/autoridades.png",
        name: "María",
        surname: "González",
        profession: "Médica",
        age: 34,
        genero: "Femenino",
        specialty: "Pediatra",
        typeCard: "user",
    },
    {
        id: 2,
        image: "/icons/autoridades.png",
        name: "Carlos",
        surname: "Mendoza",
        profession: "No",
        age: 45,
        genero: "Masculino",
        specialty: "Cardiólogo",
        typeCard: "manuscrito",
        manuscrito: "Archivo.jpg"
    },
    {
        id: 3,
        image: "/icons/autoridades.png",
        name: "Ana",
        surname: "Pérez",
        profession: "Médica",
        age: 38,
        genero: "Femenino",
        specialty: "Neuróloga",
        typeCard: "user"
    },
    {
        id: 4,
        image: "/icons/autoridades.png",
        name: "Luis",
        surname: "Rodríguez",
        profession: "No",
        age: 42,
        genero: "Masculino",
        specialty: "Ginecólogo",
        typeCard: "manuscrito",
        manuscrito: "Archivo.tsx"
    },
    {
        id: 5,
        image: "/icons/autoridades.png",
        name: "Carmen",
        surname: "Silva",
        profession: "Sí",
        age: 29,
        genero: "Femenino",
        specialty: "Dermatóloga",
        typeCard: "manuscrito",
        manuscrito: "Archivo.png"
    },
    {
        id: 6,
        image: "/icons/autoridades.png",
        name: "Roberto",
        surname: "Morales",
        profession: "Médico",
        age: 51,
        genero: "Masculino",
        specialty: "Traumatólogo",
        typeCard: "user"
    },
    {
        id: 7,
        image: "/icons/autoridades.png",
        name: "Isabel",
        surname: "Vargas",
        profession: "Sí",
        age: 39,
        genero: "Femenino",
        specialty: "Psiquiatra",
        typeCard: "manuscrito",
        manuscrito: "Archivo.tsx"
    },
    {
        id: 8,
        image: "/icons/autoridades.png",
        name: "Fernando",
        surname: "Castro",
        profession: "Médico",
        age: 47,
        genero: "Masculino",
        specialty: "Oftalmólogo",
        typeCard: "manuscrito",
        manuscrito: "Archivo.jpg"
    },
    {
        id: 9,
        image: "/icons/autoridades.png",
        name: "Patricia",
        surname: "Ramos",
        profession: "Médica",
        age: 36,
        genero: "Femenino",
        specialty: "Endocrinóloga",
        typeCard: "user"
    },
    {
        id: 10,
        image: "/icons/autoridades.png",
        name: "Miguel",
        surname: "Torres",
        profession: "Médico",
        age: 44,
        genero: "Masculino",
        specialty: "Urólogo",
        typeCard: "user"
    }
];

export default function AdminPanel() {
    return (
        <main>
            <div className={styles.roundedCards}>
                <RoundedCard />
            </div>
            <div className={`${styles.seeCards} ${cactus.className}`}>
                <h1>Ver</h1>
                <select name="cards" id="cards">
                    <option value="registro">Registro de inscriptos</option>
                    <option value="sin">Manuscritos SIN opción a premio</option>
                    <option value="con">Manuscritos CON opción a premio</option>
                </select>
            </div>
            <SignOutButton/>
            <section className={styles.containerContent}>
                <aside className={styles.aside}>
                    <GroupFilters/>
                </aside>
                <section className={styles.containerUserCard}>
                    {userCardData.map((user) => (
                        <UserCard
                            key={user.id}
                            image={user.image}
                            name={user.name}
                            surname={user.surname}
                            profession={user.profession}
                            age={user.age}
                            gender={user.genero}
                            specialty={user.specialty}
                            typeCard={user.typeCard}
                            manuscrito={user.manuscrito}
                        />
                    ))}
                </section>
            </section>
        </main>
    );
}
