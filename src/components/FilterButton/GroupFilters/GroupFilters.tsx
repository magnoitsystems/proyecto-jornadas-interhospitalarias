'use client'

import {useState} from "react";
import styles from "./groupFilters.module.css"
import FilterButton from "@/components/FilterButton/FilterButton/FilterButton";
import useResponsive from "@/components/FilterButton/GroupFilters/useResponsive";

interface FilterState {
    [key: string]: boolean;
}

interface GroupFiltersProps {
    onFiltersChange?: (filters: FilterState) => void;
    initialFilters?: FilterState;
}

export default function GroupFilters() {

    const isMobile = useResponsive();
    const [isActive, setIsActive] = useState<boolean>(false)

    const handleToggle = () => {
        setIsActive(!isActive);
    };


    return (
        <div className={styles.toggleContainer}>
            {/* Botón que activa el toggle */}
            {isMobile && <button
                className={styles.toggle}
                onClick={handleToggle}>
                Filtrar Por
            </button>}

            {/* Contenido que se muestra/oculta */}
            { ((isMobile && isActive) || !isMobile)  && (
                <div className={styles.buttonsContainer}>
                    <FilterButton label={"Field"} initialState={false}/>
                    <FilterButton label={"Field"} initialState={false}/>
                    <FilterButton label={"Field"} initialState={false}/>
                    <FilterButton label={"Field"} initialState={false}/>
                </div>
            )}
        </div>
    );
}