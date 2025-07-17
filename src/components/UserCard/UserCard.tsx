// UserCard.tsx
import styles from './UserCard.module.css';

interface UserCardProps {
    image: string;
    name: string;
    surname: string;
    profession: string;
    age: number;
}

export default function UserCard({ image, name, surname, profession, age}: UserCardProps) {
    return (
        <div className={styles.userCard}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.containerAttribute}>
                <p className={styles.name}>{name}, {surname}</p>
                <p className={styles.attribute}>E: {age}</p>
                <p className={styles.attribute}>P: {profession}</p>
            </div>
        </div>
    );
}