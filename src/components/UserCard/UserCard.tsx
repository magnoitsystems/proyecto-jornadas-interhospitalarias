import styles from './UserCard.module.css';
import { cactus } from "@/app/(views)/ui/fonts";

interface Props {
  name: string;
  lastname: string;
  age: number;
  gender: string;
  job: string;
  specialty: string;
}

export default function UserItemCard({ name, lastname, age, gender, job, specialty }: Props) {
  return (
    <div className={styles.userCard}>
      <div className={`${styles.image} ${cactus.className}`}>AB</div>
      <div className={`${styles.containerAttribute} ${cactus.className}`}>
        <p className={styles.name}>{name}, {lastname}</p>
        <div className={styles.containerNameAttribute}>
          <p className={styles.attribute}>G: {gender}</p>
          <p className={styles.attribute}>E: {age}</p>
          <p className={styles.attribute}>P: {job}</p>
          <p className={styles.attribute}>ES: {specialty}</p>
        </div>
      </div>
    </div>
  );
}
