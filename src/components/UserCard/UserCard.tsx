// UserCard.tsx
import styles from './UserCard.module.css';
import {cactus} from "@/app/(views)/ui/fonts";
import Image from "next/image";
import {Work} from "@/types";

interface UserCardProps {
    typeCard: string;
    filterWork: Work[];
}

export default function UserCard({ typeCard, filterWork }: UserCardProps) {
    return (
        filterWork.map((filter) => (
        <div className={styles.userCard}>
            {typeCard === "user" ? (
                <div className={`${styles.image} ${cactus.className}`}>AB</div>
            ): null}
            <div className={`${styles.containerAttribute} ${cactus.className}`}>
                {typeCard === "user" ? (
                    <div>
                        <p className={styles.name}>{filter.user.name}, {filter.user.lastname}</p>
                    </div>
                ): typeCard === "manuscrito" ? (
                    <div>
                        <p className={styles.name}>{filter.title}</p>
                    </div>
                ): null}
                {typeCard === "user" ? (

                    <div className={`${styles.containerNameAttribute} ${typeCard === "user"}`}>
                        <p className={styles.attribute}>G: {filter.user.gender}</p>
                        <p className={styles.attribute}>E: {filter.user.age}</p>
                        <p className={styles.attribute}>P: {filter.user.job}</p>
                        <p className={styles.attribute}>ES: {filter.user.specialty}</p>
                    </div>

                ) : typeCard === "manuscrito"  && Array.isArray(filterWork) ? (

                    <div key={filter.id} className={`${styles.containerNameAttribute} ${typeCard === "manuscrito"}`}>
                        <p className={styles.attribute}>Con opción a premio: {filter.prize ? "Sí" : "No"}</p>
                        <p className={styles.attribute}>E: {filter.user.name} {filter.user.lastname}</p>
                        <button>
                            <Image src={"/icons/downloadIcon.png"} alt={"Icono de descarga"} width={30} height={30} />
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
        ))
    );
}