import styles from './InfoCard.module.css';
type Prop = {
    info : string;
    fecha1 : string;
    fecha2 : string;

}
export default function InfoCard({info, fecha1, fecha2} : Prop) {
    return (
        <div className={styles.infoCardProperties}>
            <span className={styles.infoProperties}>{info}</span>
            <span className={styles.infoProperties}>{fecha1}</span>
            <span className={styles.infoProperties}>{fecha2}</span>
        </div>
    );
}