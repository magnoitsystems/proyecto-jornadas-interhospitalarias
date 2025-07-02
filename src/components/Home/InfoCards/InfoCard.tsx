import styles from './InfoCard.module.css';
type Prop = {
    info : string;
}
export default function InfoCard({info} : Prop) {
    return (
        <div className={styles.infoCardProperties}>
            <p className={styles.infoProperties}>{info}</p>
        </div>
    );
}