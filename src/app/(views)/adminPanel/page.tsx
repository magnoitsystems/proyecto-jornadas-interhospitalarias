'use client';

import { useEffect, useState } from "react";
import RoundedCard from "@/components/RoundedCard/RoundedCard";
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";
import SignOutButton from "@/components/botonSingOut/SignOutButton"
import { useWorkFilter } from "@/hooks/workFilterAdmin";
import { Work } from "@/types";
import useUsers from "@/hooks/useUsers";
import ManuscriptCard from "@/components/UserCard/ManuscriptCard";
import UserItemCard from "@/components/UserCard/UserCard";
import { FilterState } from "@/types/user";

export default function AdminPanel() {
    const { data, loading, error } = useWorkFilter();
    const { users, getUsers, loading: usersLoading } = useUsers();
    const [selectedFilter, setSelectedFilter] = useState<"allWorks" | "withPrize" | "withoutPrize">("allWorks");
    const [worksToShow, setWorksToShow] = useState<Work[]>([]);
    const [filterState, setFilterState] = useState<FilterState>({
        Mujeres: true,
        Varones: true,
        Estudiantes: true,
        Médicos: true,
        Enfermeros: true,
        Técnicos: true,
        Otros: true,
    });

    useEffect(() => {
        console.log(data)
        if (!data) return;

        switch (selectedFilter) {
            case "withPrize":
                setWorksToShow(data.withPrize);
                break;
            case "withoutPrize":
                setWorksToShow(data.withoutPrize);
                break;
            case "allWorks":
            default:
                setWorksToShow(data.allWorks);
                break;
        }
    }, [selectedFilter, data]);

    useEffect(() => {
        // Llama a getUsers con filtros vacíos (o todos) para cargar todo al inicio.
        // La función getUsers debería manejar el caso de filtros 'undefined' para traer todo.
        getUsers({});
    }, []);

    useEffect(() => {
        const gender: string[] = [];
        const job: string[] = [];

        if (filterState.Mujeres) gender.push("femenino");
        if (filterState.Varones) gender.push("masculino");

        if (filterState.Estudiantes) job.push("estudiante");
        if (filterState.Médicos) job.push("medico");
        if (filterState.Enfermeros) job.push("enfermero");
        if (filterState.Técnicos) job.push("técnico");
        if (filterState.Otros) job.push("otros");

        getUsers({
            gender: gender.length > 0 ? gender : undefined,
            job: job.length > 0 ? job : undefined,
        });
    }, [filterState]);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilterState(newFilters);
    };

    if (loading) return <p>Cargando trabajos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <div className={styles.roundedCards}>
                <RoundedCard />
            </div>
            <div className={styles.seeCards}>
                <h1>Ver</h1>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value as "allWorks" | "withPrize" | "withoutPrize")}
                    style={{ marginBottom: "1rem" }}
                >
                    <option value="allWorks">Todos los manuscritos</option>
                    <option value="withPrize">Manuscritos CON premio</option>
                    <option value="withoutPrize">Manuscritos SIN premio</option>
                </select>
            </div>
            <SignOutButton />
            <section className={styles.containerContent}>
                <aside className={styles.aside}>
                    <GroupFilters
                        onFiltersChange={handleFiltersChange}
                        initialFilters={filterState}
                    />                </aside>
                <section className={styles.containerUserCard}>
                    {worksToShow.map((work) => (
                        <ManuscriptCard work={work} />
                    ))}

                    {usersLoading ? (
                        <p>Cargando usuarios...</p>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <UserItemCard
                                key={user.id}
                                name={user.name}
                                lastname={user.lastname}
                                gender={user.gender}
                                age={user.age}
                                job={user.job}
                                specialty={user.specialty ?? ''}
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
