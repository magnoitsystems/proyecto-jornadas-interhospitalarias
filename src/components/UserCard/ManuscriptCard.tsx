import styles from './UserCard.module.css';
import Image from "next/image";
import { cactus } from "@/app/(views)/ui/fonts";
import { Work } from "@/types";

interface Props {
  work: Work;
}

export default function ManuscriptCard({ work }: Props) {
  return (
    <div className={styles.userCard}>
      <div className={`${styles.containerAttribute} ${cactus.className}`}>
        <p className={styles.name}>{work.title}</p>
        <div className={styles.containerNameAttribute}>
          <p className={styles.attribute}>Con premio: {work.prize ? "Sí" : "No"}</p>
          <p className={styles.attribute}>Autor: {work.user.name} {work.user.lastname}</p>
          <button>
            <Image src="/icons/downloadIcon.png" alt="Descargar" width={30} height={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
