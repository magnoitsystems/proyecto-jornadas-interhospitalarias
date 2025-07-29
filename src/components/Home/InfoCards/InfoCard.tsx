import styles from './InfoCard.module.css';
import { cactus } from '@/app/(views)/ui/fonts';

type Prop = {
    info? : string;
    info2? : string;
    info3? : string;
    info4? : string;
    sede : boolean;
}
export default function InfoCard({info, info2, info3, info4, sede} : Prop) {
    const url : string = " ";
    return (
        <div className={`${styles.infoCardProperties} ${sede ? styles.sedeInfo : styles.infoCardProperties}  ${cactus.className}`}>
            <div className={styles.infoPositionProperties}>
                <span className={styles.infoProperties}>{info}</span>
                <span className={styles.infoProperties}>{info2}</span>
                <span className={styles.infoProperties}>{info3}</span>
                <span className={styles.infoProperties}>{info4}</span>
            </div>
        </div>
    );
}