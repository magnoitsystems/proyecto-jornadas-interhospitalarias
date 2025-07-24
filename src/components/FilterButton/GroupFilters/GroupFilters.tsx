'use client'

import {useState} from "react";
import styles from "./groupFilters.module.css"
import FilterButton from "@/components/FilterButton/FilterButton/FilterButton";
import useResponsive from "@/components/FilterButton/GroupFilters/useResponsive";
import { cactus } from '@/app/(views)/ui/fonts';

interface FilterState {
    [key: string]: boolean;
}

interface GroupFiltersProps {
    onFiltersChange?: (filters: FilterState) => void;
    initialFilters?: FilterState;
}

export default function GroupFilters({ onFiltersChange, initialFilters = {} }: GroupFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleChange = (label: string, isActive: boolean) => {
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
          {["Mujeres", "Varones", "Estudiantes", "Médicos", "Enfermeros", "Técnicos", "Otros"].map(label => (
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
