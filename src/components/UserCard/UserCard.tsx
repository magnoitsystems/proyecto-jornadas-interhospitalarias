// UserCard.tsx
import styles from './UserCard.module.css';
import {cactus} from "@/app/(views)/ui/fonts";
import Image from "next/image";

interface UserCardProps {
    image?: string;
    name: string;
    surname: string;
    profession: string;
    age: number;
    gender: string
    specialty: string
    typeCard: string;
    manuscrito?: string
}

export default function UserCard({ name, surname, profession, age, gender, specialty, image, typeCard, manuscrito }: UserCardProps) {
    return (
        <div className={styles.userCard}>
            {typeCard === "user" ? (
                <div className={`${styles.image} ${cactus.className}`}>AB</div>
            ): null}
            <div className={`${styles.containerAttribute} ${cactus.className}`}>
                {typeCard === "user" ? (
                    <div>
                        <p className={styles.name}>{name}, {surname}</p>
                    </div>
                ): typeCard === "manuscrito" ? (
                    <div>
                        <p className={styles.name}>{manuscrito}</p>
                    </div>
                ): null}
                {typeCard === "user" ? (
                    <div className={`${styles.containerNameAttribute} ${typeCard === "user"}`}>
                        <p className={styles.attribute}>G: {gender}</p>
                        <p className={styles.attribute}>E: {age}</p>
                        <p className={styles.attribute}>P: {profession}</p>
                        <p className={styles.attribute}>ES: {specialty}</p>
                    </div>
                ) : typeCard === "manuscrito" ? (
                    <div className={`${styles.containerNameAttribute} ${typeCard === "manuscrito"}`}>
                        <p className={styles.attribute}>Con opción a premio: {profession}</p>
                        <p className={styles.attribute}>E: {name} {surname}</p>
                        <button>
                            <Image src={"/icons/downloadIcon.png"} alt={"Icono de descarga"} width={30} height={30} />
                        </button>
                    </div>
                ) : null}

            </div>
        </div>
    );
}