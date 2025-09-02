'use client';
import React, { useState } from 'react';

const ExportToSheetsButton: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await fetch('/api/export-to-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success && result.sheetUrl) {
        window.open(result.sheetUrl, '_blank');
      }

    } catch (error) {
      console.error('Error al exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport} 
      disabled={isExporting}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
    >
      {isExporting ? 'Exportando...' : 'Exportar a Google Sheets'}
    </button>
  );
};

export default ExportToSheetsButton;
