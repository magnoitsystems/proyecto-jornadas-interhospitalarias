import React, { useState } from 'react';

interface ExportButtonProps {
}

const ExportToSheetsButton: React.FC<ExportButtonProps> = () => {
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState<string>('');

    const handleExport = async () => {
        setIsExporting(true);
        setExportStatus('Exportando...');

        try {
            const response = await fetch('/api/export-to-sheets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                setExportStatus('¡Exportación exitosa!');
                // Opcional: abrir el Google Sheet
                if (result.sheetUrl) {
                    window.open(result.sheetUrl, '_blank');
                }
            } else {
                setExportStatus(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error al exportar:', error);
            setExportStatus('Error de conexión');
        } finally {
            setIsExporting(false);
            setTimeout(() => setExportStatus(''), 3000);
        }
    };

    return (
        <div >
            <button
                onClick={handleExport}
                disabled={isExporting}
            >
                <div>
                    {isExporting ? (
                        <>
                            <span>Exportando...</span>
                        </>
                    ) : (
                        <>
                            <span>Exportar a Google Sheets</span>
                        </>
                    )}
                </div>
                <div ></div>
            </button>

        </div>
    );
};

export default ExportToSheetsButton;