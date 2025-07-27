'use client'

import { useState } from "react";
import styles from "./groupFilters.module.css"
import FilterButton from "@/components/FilterButton/FilterButton/FilterButton";
import useResponsive from "@/components/FilterButton/GroupFilters/useResponsive";
import { cactus } from '@/app/(views)/ui/fonts';
import { FilterState } from "@/types/user";



interface GroupFiltersProps {
    onFiltersChange?: (filters: FilterState) => void;
    initialFilters?: FilterState;
}

export default function GroupFilters({ onFiltersChange, initialFilters = {
    Mujeres: false,
    Varones: false,
    Estudiantes: false,
    Médicos: false,
    Enfermeros: false,
    Técnicos: false,
    Otros: false,
    NoSalud: false
} }: GroupFiltersProps) {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    const handleChange = (label: keyof FilterState, isActive: boolean) => {
        const updated = { ...filters, [label]: isActive };
        setFilters(updated);
        onFiltersChange?.(updated);
    };

    const isMobile = useResponsive();
    const [isActive, setIsActive] = useState<boolean>(false);

    const toggle = () => setIsActive(!isActive);

    return (
        <div className={styles.toggleContainer}>
            {isMobile && (
                <button className={`${styles.toggle} ${cactus.className}`} onClick={toggle}>
                    Filtrar por
                </button>
            )}

            {((isMobile && isActive) || !isMobile) && (
                <div className={styles.buttonsContainer}>
                    {(Object.keys(filters) as (keyof FilterState)[]).map(label => (
                        <FilterButton
                            key={label}
                            label={label}
                            initialState={filters[label]}
                            onChange={(value) => handleChange(label, value)}
                        />
                    ))}

                </div>
            )}
        </div>
    );
}
