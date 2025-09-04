'use client'

import React, { useState } from 'react';
import styles from './CSVGenerator.module.css';
import { cactus } from '@/app/(views)/ui/fonts';

interface CSVGeneratorProps {
    className?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    job: string;
    specialty: string | null;
}

interface FilterOptions {
    includeGender: boolean;
    includeSpecialty: boolean;
    includeProfession: boolean;
    healthOnly: boolean;
}

const CSVGenerator: React.FC<CSVGeneratorProps> = ({ className = '' }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastGenerated, setLastGenerated] = useState<string | null>(null);

    const [filters, setFilters] = useState<FilterOptions>({
        includeGender: true,
        includeSpecialty: true,
        includeProfession: true,
        healthOnly: false
    });

    const handleFilterChange = (field: keyof FilterOptions, value: boolean) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null);
    };

    // Función para escapar valores CSV
    const escapeCSVValue = (value: unknown): string => {
        if (value === null || value === undefined) {
            return '';
        }
        
        const stringValue = String(value);
        
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
    };

    // Función para convertir usuarios a CSV
    const usersToCSV = (users: User[]): string => {
        if (users.length === 0) {
            return 'Sin usuarios encontrados';
        }

        // Definir columnas base
        const columns = [
            { key: 'id' as keyof User, label: 'ID' },
            { key: 'name' as keyof User, label: 'Nombre' },
            { key: 'email' as keyof User, label: 'Email' },
            { key: 'age' as keyof User, label: 'Edad' }
        ];

        // Agregar columnas según filtros
        if (filters.includeProfession) {
            columns.push({ key: 'job' as keyof User, label: 'Profesión' });
        }
        
        if (filters.includeGender) {
            columns.push({ key: 'gender' as keyof User, label: 'Género' });
        }
        
        if (filters.includeSpecialty) {
            columns.push({ key: 'specialty' as keyof User, label: 'Especialidad' });
        }

        // Crear header
        const header = columns.map(col => escapeCSVValue(col.label)).join(',');

        // Crear filas
        const rows = users.map(user => {
            return columns.map(col => {
                let value = user[col.key];
                if (col.key === 'specialty' && !value) {
                    value = 'Sin especialidad';
                }
                return escapeCSVValue(value);
            }).join(',');
        });

        return header + '\n' + rows.join('\n');
    };

    const validateForm = (): boolean => {
        if (!filters.includeGender && !filters.includeSpecialty && !filters.includeProfession) {
            setError('Debes seleccionar al menos una columna adicional para incluir');
            return false;
        }
        return true;
    };

    const generateCSV = async () => {
        if (isGenerating) return;
        if (!validateForm()) return;

        setIsGenerating(true);
        setError(null);

        try {
            // Construir parámetros de filtro
            const params = new URLSearchParams();
            
            if (filters.healthOnly) {
                // Agregar filtros específicos si es necesario
                params.append('job', 'medico'); // Ajusta según tus datos
            }

            const response = await fetch(`/api/usuario?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const users: User[] = data.responseUser;

            // Filtrar usuarios de salud si es necesario
            let filteredUsers = users;
            if (filters.healthOnly) {
                filteredUsers = users.filter(user => 
                    user.job !== 'no perteneciente al área de la salud'
                );
            }

            // Generar CSV
            const csvContent = usersToCSV(filteredUsers);
            
            // Crear y descargar archivo
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `usuarios-${Date.now()}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(url);
            
            setLastGenerated(new Date().toLocaleString());

        } catch (error) {
            console.error('Error generando CSV:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`${styles.container} ${className} ${cactus.className}`}>
            <h2 className={styles.title}>
                Generar CSV de Usuarios
            </h2>

            {error && (
                <div className={`${styles.errorAlert} ${cactus.className}`}>
                    <p className={styles.errorTitle}>Error:</p>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            )}

            <div className={`${styles.formContent} ${cactus.className}`}>
                <div className={styles.section}>
                    <label className={styles.sectionLabel}>
                        Columnas a Incluir en el CSV
                    </label>
                    <p style={{fontSize: '14px', color: '#666', marginBottom: '16px'}}>
                        Las columnas ID, Nombre, Email y Edad siempre se incluyen
                    </p>
                    
                    <div className={styles.checkboxGrid}>
                        <div className={styles.checkboxContainer}>
                            <input
                                id="includeProfession"
                                type="checkbox"
                                checked={filters.includeProfession}
                                onChange={(e) => handleFilterChange('includeProfession', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="includeProfession" className={styles.checkboxLabel}>
                                Profesión
                            </label>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <input
                                id="includeGender"
                                type="checkbox"
                                checked={filters.includeGender}
                                onChange={(e) => handleFilterChange('includeGender', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="includeGender" className={styles.checkboxLabel}>
                                Género
                            </label>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <input
                                id="includeSpecialty"
                                type="checkbox"
                                checked={filters.includeSpecialty}
                                onChange={(e) => handleFilterChange('includeSpecialty', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="includeSpecialty" className={styles.checkboxLabel}>
                                Especialidad
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <label className={styles.sectionLabel}>
                        Filtros
                    </label>
                    <div className={styles.checkboxContainer}>
                        <input
                            id="healthOnly"
                            type="checkbox"
                            checked={filters.healthOnly}
                            onChange={(e) => handleFilterChange('healthOnly', e.target.checked)}
                            className={styles.checkbox}
                        />
                        <label htmlFor="healthOnly" className={styles.checkboxLabel}>
                            Solo profesionales del área de la salud
                        </label>
                    </div>
                </div>

                <button
                    onClick={generateCSV}
                    disabled={isGenerating}
                    className={styles.generateButton}
                >
                    {isGenerating ? (
                        <>
                            <svg className={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generando CSV...
                        </>
                    ) : (
                        'Descargar CSV de Usuarios'
                    )}
                </button>

                {lastGenerated && (
                    <div className={styles.successAlert}>
                        <p className={styles.successMessage}>
                            Último CSV generado: {lastGenerated}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CSVGenerator;