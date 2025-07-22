'use client'

import React, { useState } from 'react';
import styles from './CSVGenerator.module.css';

interface CSVGeneratorProps {
    className?: string;
}

type ReportType = 'profession' | 'gender' | 'specialty' | 'complete';

interface GenerateReportRequest {
    reportType: ReportType;
    userCount: number;
    includeHeaders: boolean;
}

const CSVGenerator: React.FC<CSVGeneratorProps> = ({ className = '' }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastGenerated, setLastGenerated] = useState<string | null>(null);

    const [formData, setFormData] = useState<GenerateReportRequest>({
        reportType: 'complete',
        userCount: 150,
        includeHeaders: true
    });

    const reportOptions = [
        { value: 'complete', label: 'Reporte Completo', description: 'Todas las estadísticas en un archivo' },
        { value: 'profession', label: 'Por Profesión', description: 'Estadísticas agrupadas por profesión' },
        { value: 'gender', label: 'Por Género', description: 'Distribución y estadísticas por género' },
        { value: 'specialty', label: 'Por Especialidad', description: 'Análisis por especialidades médicas' }
    ];

    const handleInputChange = (field: keyof GenerateReportRequest, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setError(null);
    };

    const generateReport = async () => {
        if (isGenerating) return;

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
                console.error(errorText);
            }

            // Obtener el filename del header
            const contentDisposition = response.headers.get('content-disposition');
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
                : `reporte-${formData.reportType}-${Date.now()}.csv`;

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
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <h2 className={styles.title}>
                Generador de Reportes Médicos
            </h2>

            {error && (
                <div className={styles.errorAlert}>
                    <p className={styles.errorTitle}>Error generando reporte:</p>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            )}

            <div className={styles.formContent}>
                <div className={styles.section}>
                    <label className={styles.sectionLabel}>
                        Tipo de Reporte
                    </label>
                    <div className={styles.radioGrid}>
                        {reportOptions.map((option) => (
                            <label
                                key={option.value}
                                className={`
                                    ${styles.radioOption}
                                    ${formData.reportType === option.value ? styles.radioOptionSelected : ''}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="reportType"
                                    value={option.value}
                                    checked={formData.reportType === option.value}
                                    onChange={(e) => handleInputChange('reportType', e.target.value)}
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
                        Entre 10 y 1000 usuarios (recomendado: 150-300)
                    </p>
                </div>

                <div className={styles.checkboxContainer}>
                    <input
                        id="includeHeaders"
                        type="checkbox"
                        checked={formData.includeHeaders}
                        onChange={(e) => handleInputChange('includeHeaders', e.target.checked)}
                        className={styles.checkbox}
                    />
                    <label htmlFor="includeHeaders" className={styles.checkboxLabel}>
                        Incluir encabezados en el archivo CSV
                    </label>
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
                        <p className={styles.successMessage}>Último reporte generado: {lastGenerated}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CSVGenerator;