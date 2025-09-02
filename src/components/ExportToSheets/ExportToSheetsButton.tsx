import React, { useState } from 'react';
import styles from './ExportToSheetsButton.module.css';

interface ExportButtonProps {
  className?: string;
}

const ExportToSheetsButton: React.FC<ExportButtonProps> = ({ className = '' }) => {
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
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  return (
    <div className={`${styles.exportContainer} ${className}`}>
      <button 
        onClick={handleExport}
        disabled={isExporting}
        className={`${styles.exportButton} ${isExporting ? styles.loading : ''}`}
      >
        <div className={styles.buttonContent}>
          {isExporting ? (
            <>
              <div className={styles.spinner}></div>
              <span className={styles.loadingText}>Exportando...</span>
            </>
          ) : (
            <>
              <span className={styles.icon}>📊</span>
              <span className={styles.buttonText}>Exportar a Google Sheets</span>
            </>
          )}
        </div>
        <div className={styles.ripple}></div>
      </button>
      
      {exportStatus && (
        <div className={`${styles.statusMessage} ${
          exportStatus.includes('Error') ? styles.error : styles.success
        } ${styles.fadeIn}`}>
          {exportStatus}
        </div>
      )}
    </div>
  );
};