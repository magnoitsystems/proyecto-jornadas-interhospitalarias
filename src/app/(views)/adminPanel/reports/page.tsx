import CSVGenerator from "@/components/CSVGenerator/CSVGenerator";
import styles from './page.module.css';
import { cactus } from '@/app/(views)/ui/fonts';

export default function ReportsPage() {
    return (
        <main className={`${styles.page} ${cactus.className}`}>
            <div className={styles.generatorInformation}>
                <h1>Panel de Reportes</h1>
                <div className={styles.aclarations}>
                    <h4>Genera reportes estadísticos de la plataforma de jornadas médicas</h4>
                    <h4>(Instrucciones de uso debajo del mismo)</h4>
                </div>
            </div>

            <CSVGenerator className="mb-8"/>

            <div className={styles.generatorInformation}>
            <h1>Instrucciones de Uso</h1>
                <ul className={styles.instructions}>
                    <li><h4>1. Selecciona el tipo de reporte que deseas generar</h4></li>
                    <li><h4>2. Ajusta la cantidad de usuarios simulados (para pruebas)</h4></li>
                    <li><h4>3. Haz clic en Descargar Reporte CSV para obtener el archivo</h4></li>
                    <li><h4>4. El archivo se descargará automáticamente y podrás abrirlo en Excel</h4></li>
                </ul>
            </div>
        </main>
    );
}