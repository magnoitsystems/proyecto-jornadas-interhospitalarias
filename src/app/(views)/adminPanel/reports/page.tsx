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
        </main>
    );
}