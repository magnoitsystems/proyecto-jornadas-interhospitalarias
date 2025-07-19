// UserCard.tsx
import styles from './UserCard.module.css';
import {cactus} from "@/app/(views)/ui/fonts";

interface UserCardProps {
    image: string;
    name: string;
    surname: string;
    profession: string;
    age: number;
    gender: string
    specialty: string
}

export default function UserCard({ image, name, surname, profession, age, gender, specialty}: UserCardProps) {
    return (
        <div className={styles.userCard}>
            <div className={`${styles.image} ${cactus.className}`}>AB</div>
            {/*<img src={image} alt={name} className={styles.image} />*/}
            <div className={`${styles.containerAttribute} ${cactus.className}`}>
                <div>
                    <p className={styles.name}>{name}, {surname}</p>
                </div>
                <div className={styles.containerNameAttribute}>
                    <p className={styles.attribute}>G: {gender}</p>
                    <p className={styles.attribute}>E: {age}</p>
                    <p className={styles.attribute}>P: {profession}</p>
                    <p className={styles.attribute}>ES: {specialty}</p>
                </div>
            </div>
        </div>
    );
}