'use client'

import React, { useState } from 'react';
import styles from './CSVGenerator.module.css';
import { cactus } from '@/app/(views)/ui/fonts';

interface CSVGeneratorProps {
    className?: string;
}

interface GenerateReportRequest {
    userCount: number;
    includeGender: boolean;
    includeSpecialty: boolean;
    includeProfession: boolean;
    healthOnly: boolean;
    format: 'readable' | 'compact';
}

const CSVGenerator: React.FC<CSVGeneratorProps> = ({ className = '' }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastGenerated, setLastGenerated] = useState<string | null>(null);

    const [formData, setFormData] = useState<GenerateReportRequest>({
        userCount: 150,
        includeGender: true,
        includeSpecialty: true,
        includeProfession: true,
        healthOnly: false,
        format: 'readable'
    });

    const formatOptions = [
        {
            value: 'readable',
            label: 'Formato Legible',
            description: 'Reporte estructurado fácil de leer con secciones separadas'
        },
        {
            value: 'compact',
            label: 'Formato Compacto',
            description: 'Datos en CSV tradicional optimizado para Excel/análisis'
        }
    ];

    const handleInputChange = (field: keyof GenerateReportRequest, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null);
    };

    const validateForm = (): boolean => {
        if (!formData.includeGender && !formData.includeSpecialty && !formData.includeProfession) {
            setError('Debes seleccionar al menos una categoría de datos para incluir');
            return false;
        }

        if (formData.userCount < 10 || formData.userCount > 1000) {
            setError('La cantidad de usuarios debe estar entre 10 y 1000');
            return false;
        }

        return true;
    };

    const generateReport = async () => {
        if (isGenerating) return;

        if (!validateForm()) return;

        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('/api/estadistica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                const errorText = await response.text();

                if (contentType?.includes('application/json')) {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || `Error ${response.status}`);
                }
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            // Obtener el filename del header
            const contentDisposition = response.headers.get('content-disposition');
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
                : `estadisticas-medicas-${formData.format}-${Date.now()}.csv`;

            // Crear blob y disparar descarga
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Limpiar URL object
            window.URL.revokeObjectURL(url);

            setLastGenerated(new Date().toLocaleString());

        } catch (error) {
            console.error('Error generando reporte:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido generando el reporte');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`${styles.container} ${className} ${cactus.className}`}>
            <h2 className={styles.title}>
                Generador de Reportes Médicos
            </h2>

            {error && (
                <div className={`${styles.errorAlert} ${cactus.className}`}>
                    <p className={styles.errorTitle}>Error generando reporte:</p>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            )}

            <div className={`${styles.formContent} ${cactus.className}`}>
                {/* Formato de Reporte */}
                <div className={styles.section}>
                    <label className={styles.sectionLabel}>
                        Formato de Reporte
                    </label>
                    <div className={styles.radioGrid}>
                        {formatOptions.map((option) => (
                            <label
                                key={option.value}
                                className={`
                                    ${styles.radioOption}
                                    ${formData.format === option.value ? styles.radioOptionSelected : ''}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="format"
                                    value={option.value}
                                    checked={formData.format === option.value}
                                    onChange={(e) => handleInputChange('format', e.target.value as 'readable' | 'compact')}
                                    className={styles.radioInput}
                                />
                                <div className={styles.radioContent}>
                                    <div className={styles.radioLabel}>
                                        {option.label}
                                    </div>
                                    <div className={styles.radioDescription}>
                                        {option.description}
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categorías de Datos */}
                <div className={styles.section}>
                    <label className={styles.sectionLabel}>
                        Categorías de Datos a Incluir
                    </label>
                    <div className={styles.checkboxGrid}>
                        <div className={styles.checkboxContainer}>
                            <input
                                id="includeProfession"
                                type="checkbox"
                                checked={formData.includeProfession}
                                onChange={(e) => handleInputChange('includeProfession', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="includeProfession" className={styles.checkboxLabel}>
                                Estadísticas por Profesión
                            </label>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <input
                                id="includeSpecialty"
                                type="checkbox"
                                checked={formData.includeSpecialty}
                                onChange={(e) => handleInputChange('includeSpecialty', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="includeSpecialty" className={styles.checkboxLabel}>
                                Estadísticas por Especialidad Médica
                            </label>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <input
                                id="includeGender"
                                type="checkbox"
                                checked={formData.includeGender}
                                onChange={(e) => handleInputChange('includeGender', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="includeGender" className={styles.checkboxLabel}>
                                Estadísticas por Género
                            </label>
                        </div>
                    </div>
                </div>

                {/* Filtros Adicionales */}
                <div className={styles.section}>
                    <label className={styles.sectionLabel}>
                        Filtros Adicionales
                    </label>
                    <div className={styles.checkboxContainer}>
                        <input
                            id="healthOnly"
                            type="checkbox"
                            checked={formData.healthOnly}
                            onChange={(e) => handleInputChange('healthOnly', e.target.checked)}
                            className={styles.checkbox}
                        />
                        <label htmlFor="healthOnly" className={styles.checkboxLabel}>
                            Solo profesionales del área de la salud
                        </label>
                    </div>
                </div>

                {/* Cantidad de usuarios */}
                <div className={styles.inputGroup}>
                    <label htmlFor="userCount" className={styles.inputLabel}>
                        Cantidad de Usuarios Simulados
                    </label>
                    <input
                        type="number"
                        id="userCount"
                        min="10"
                        max="1000"
                        step="10"
                        value={formData.userCount}
                        onChange={(e) => handleInputChange('userCount', parseInt(e.target.value) || 150)}
                        className={styles.numberInput}
                    />
                    <p className={styles.inputHint}>
                        Entre 10 y 1000 usuarios (recomendado: 150-300 para análisis realista)
                    </p>
                </div>

                <button
                    onClick={generateReport}
                    disabled={isGenerating}
                    className={styles.generateButton}
                >
                    {isGenerating ? (
                        <>
                            <svg className={styles.loadingSpinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generando Reporte...
                        </>
                    ) : (
                        'Descargar Reporte CSV'
                    )}
                </button>

                {lastGenerated && (
                    <div className={styles.successAlert}>
                        <p className={styles.successMessage}>
                            Último reporte generado: {lastGenerated}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CSVGenerator;