'use client';

import RoundedCard from "@/components/RoundedCard/RoundedCard";
import styles from './page.module.css';
import GroupFilters from "@/components/FilterButton/GroupFilters/GroupFilters";
import UserCard from "@/components/UserCard/UserCard";
import SignOutButton from "@/components/botonSingOut/SignOutButton"
import {useWorkFilter} from "@/hooks/workFilterAdmin";
import {useEffect, useState} from "react";
import {Work} from "@/types";

export default function AdminPanel() {
    const { data, loading, error } = useWorkFilter();
    const [selectedFilter, setSelectedFilter] = useState<"allWorks" | "withPrize" | "withoutPrize">("allWorks");
    const [worksToShow, setWorksToShow] = useState<Work[]>([]);

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

    if (loading) return <p>Cargando trabajos...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <main>
            <div className={styles.roundedCards}>
                <RoundedCard />
            </div>
            <div className={styles.seeCards}>
                {/*<h1>Ver</h1>*/}
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
            <SignOutButton/>
            <section className={styles.containerContent}>
                <aside className={styles.aside}>
                    <GroupFilters/>
                </aside>
                <section className={styles.containerUserCard}>
                    <UserCard typeCard={"user"} filterWork={worksToShow}/>
                    <UserCard typeCard={"manuscrito"} filterWork={worksToShow}/>
                </section>
            </section>
        </main>
    );
}
