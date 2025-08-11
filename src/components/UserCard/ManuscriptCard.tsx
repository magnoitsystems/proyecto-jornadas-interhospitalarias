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
          {work.file && (
            <div className={styles.iconGroup}>
              <button type="button" aria-label="Abrir correo">
                <a
                  className={styles.link}
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${work.user.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#424242"
                    width={30}
                    height={30}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </a>
              </button>
              <a href={work.file} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/downloadIcon.png"
                  alt="Descargar"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
