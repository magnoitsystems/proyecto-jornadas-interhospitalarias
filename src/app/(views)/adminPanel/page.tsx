'use client';

import { useEffect, useState } from "react";
import RoundedCard from "@/components/RoundedCard/RoundedCard";
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";
import UserCard from "@/components/UserCard/UserCard";
import SignOutButton from "@/components/botonSingOut/SignOutButton";
import useUsers from "@/hooks/useUsers";

interface FilterState {
  [key: string]: boolean;
}

export default function AdminPanel() {
  const { users, getUsers, loading } = useUsers();

  const [filterState, setFilterState] = useState<FilterState>({
    Mujeres: true,
    Varones: true,
    Estudiantes: true,
    Médicos: true,
    Enfermeros: true,
    Técnicos: true,
    Otros: true,
  });

  // 🚀 Ejecuta la búsqueda cada vez que cambia el filtro
  useEffect(() => {
    const gender: string[] = [];
    const job: string[] = [];

    if (filterState.Mujeres) gender.push("Mujer");
    if (filterState.Varones) gender.push("Varón");

    if (filterState.Estudiantes) job.push("Estudiante");
    if (filterState.Médicos) job.push("Médico");
    if (filterState.Enfermeros) job.push("Enfermero");
    if (filterState.Técnicos) job.push("Técnico");
    if (filterState.Otros) job.push("Otro");

    getUsers({
      gender: gender.length > 0 ? gender : undefined,
      job: job.length > 0 ? job : undefined,
    });
  }, [filterState]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilterState(newFilters);
  };

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

      <SignOutButton />

      <section className={styles.containerContent}>
        <aside className={styles.aside}>
          <GroupFilters
            onFiltersChange={handleFiltersChange}
            initialFilters={filterState}
          />
        </aside>

        <section className={styles.containerUserCard}>
          {loading ? (
            <p>Cargando usuarios...</p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.id}
                image={"/icons/autoridades.png"}
                name={user.name}
                surname={user.lastname}
                profession={user.job}
                age={user.age}
                gender={user.gender}
                specialty={user.specialty ?? ''}
                typeCard={"user"}
              />
            ))
          ) : (
            <p>No se encontraron usuarios con esos filtros.</p>
          )}
        </section>
      </section>
    </main>
  );
}
