import styles from './InfoCard.module.css';
type Prop = {
    info? : string;
    info2? : string;
    info3? : string;
    info4? : string;
    sede : boolean;
}
export default function InfoCard({info, info2, info3, info4, sede} : Prop) {
    return (
        <div className={`${styles.infoCardProperties} ${sede ? styles.leftInfo : styles.infoCardProperties}`}>
            <span className={styles.infoProperties} id={`${sede ? styles.info1 : styles.notBorder}`}>{info}</span>
            <span className={styles.infoProperties} id={`${sede ? styles.info1 : styles.notBorder}`}>{info2}</span>
            <span className={styles.infoProperties} id={`${sede ? styles.info1 : styles.notBorder}`}>{info3}</span>
            <span className={styles.infoProperties} id={`${sede ? styles.info1 : styles.notBorder}`}>{info4}</span>
        </div>
    );
}