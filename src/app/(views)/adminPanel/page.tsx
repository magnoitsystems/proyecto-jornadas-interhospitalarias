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
import Link from "next/link";

export default function AdminPanel() {
    const { data, loading, error } = useWorkFilter();
    const { users, getUsers, loading: usersLoading } = useUsers();
    const [selectedFilter, setSelectedFilter] = useState<"allWorks" | "withPrize" | "withoutPrize" | "inscripts">("allWorks");
    const [worksToShow, setWorksToShow] = useState<Work[]>([]);
    const [filterState, setFilterState] = useState<FilterState>({
        Mujeres: true,
        Varones: true,
        Estudiantes: true,
        Médicos: true,
        Enfermeros: true,
        Técnicos: true,
        Otros: true,
        NoSalud: false
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
            case "inscripts":
                getUsers();
                break;
            case "allWorks":
            default:
                setWorksToShow(data.allWorks);
                break;
        }
    }, [selectedFilter, data]);


    useEffect(() => {
        if (selectedFilter !== "inscripts") return;

        const gender: string[] = [];
        const job: string[] = [];

        if (filterState.Mujeres) gender.push("femenino");
        if (filterState.Varones) gender.push("masculino");

        if (filterState.Estudiantes) job.push("estudiante");
        if (filterState.Médicos) job.push("medico");
        if (filterState.Enfermeros) job.push("enfermero");
        if (filterState.Técnicos) job.push("técnico");
        if (filterState.Otros) job.push("otros");
        if(filterState.NoSalud) job.push("no perteneciente al área de la salud");

        getUsers({
            gender: gender.length > 0 ? gender : undefined,
            job: job.length > 0 ? job : undefined,
        });
    }, [filterState, selectedFilter]);


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
            <div className={styles.filterAndReportsButtonProperties}>
                <div className={styles.seeCards}>
                    <h1>Ver</h1>
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value as "allWorks" | "withPrize" | "withoutPrize" | "inscripts")}

                    >
                        <option value="inscripts">Inscriptos a la jornada</option>
                        <option value="allWorks">Todos los manuscritos</option>
                        <option value="withPrize">Manuscritos CON premio</option>
                        <option value="withoutPrize">Manuscritos SIN premio</option>
                    </select>
                </div>
                <div className={styles.reportsButtonProperties}>
                    <Link href={"./adminPanel/reports"}><button>Ver reportes</button></Link>
                </div>
            </div>
            <SignOutButton />
            <section className={styles.containerContent}>
                {selectedFilter === "inscripts" && (
                    <aside className={styles.aside}>
                        <GroupFilters
                            onFiltersChange={handleFiltersChange}
                            initialFilters={filterState}
                        />
                    </aside>
                )}

                <section className={styles.containerUserCard}>
                    {selectedFilter === "inscripts" ? (
                        usersLoading ? (
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
                        )
                    ) : (
                        worksToShow.map((work) => (
                            <ManuscriptCard key={work.id} work={work} />
                        ))
                    )}
                </section>

            </section>
        </main>
    );
}
