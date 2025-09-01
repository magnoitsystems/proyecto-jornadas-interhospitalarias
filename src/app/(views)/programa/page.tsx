import Title from "@/components/general/SectionTitle/SectionTitle";
import styles from './page.module.css';
import ActivitiesGuide from "@/components/program/guide/activitiesGuide";
import Link from "next/link";

export default function Programa(){
    return(
        <main>
            <Title
                section={'Programa'}
                imgSrc={'/icons/programa.png'}
                className={'programTitle'}
            />

            <ActivitiesGuide/>

            <div className={styles.dayProgram} id={'wednesday'}>
                <div className={styles.date}>
                    <h1>Miércoles 05 de Noviembre</h1>
                    <Link href="https://www.canva.com/design/DAGxwT0HHpE/EzMGir8valRIxac_Vp9k8g/edit?utm_content=DAGxwT0HHpE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                          target="_blank"
                          rel="noopener noreferrer" >
                        <div className={styles.details}>
                            <h3>Click acá para ver cronograma detallado para este día</h3>
                            <h4>(Tener en cuenta los colores aclarados más arriba para diferenciar tipos de eventos)</h4>
                        </div>
                    </Link>
                </div>


            </div>

            <div className={styles.dayProgram} id={'thursday'}>
                <div className={styles.date}>
                    <h1>Jueves 06 de Noviembre</h1>
                    <Link href={"https://www.canva.com/design/DAGxw-H5JXQ/pT4ZCFdO2KrqNSG89D1DUg/edit?utm_content=DAGxw-H5JXQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"}
                          target="_blank"
                          rel="noopener noreferrer">
                        <div className={styles.details}>
                            <h3>Click acá para ver cronograma detallado para este día</h3>
                            <h4>(Tener en cuenta los colores aclarados más arriba para diferenciar tipos de
                                eventos)</h4>
                        </div>
                    </Link>
                </div>
            </div>

            <div className={styles.dayProgram} id={'friday'}>
                <div className={styles.date}>
                    <h1>Viernes 07 de Noviembre</h1>
                    <Link href={"https://www.canva.com/design/DAGxw05rg1c/_iwWdgfj6bEMZVfuvMJUGA/edit?utm_content=DAGxw05rg1c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"}
                          target="_blank"
                          rel="noopener noreferrer">
                        <div className={styles.details}>
                            <h3>Click acá para ver cronograma detallado para este día</h3>
                            <h4>(Tener en cuenta los colores aclarados más arriba para diferenciar tipos de
                                eventos)
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}