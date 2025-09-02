'use client';
import React, { useState } from 'react';

const ExportToSheetsButton: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

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
    <div>
      <button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Exportando...' : 'Exportar a Google Sheets'}
      </button>

      {exportStatus && (
        <p>{exportStatus}</p>
      )}
    </div>
  );
};

export default ExportToSheetsButton;
