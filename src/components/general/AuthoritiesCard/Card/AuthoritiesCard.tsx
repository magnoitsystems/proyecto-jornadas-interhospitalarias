import styles from "./AuthoritiesCard.module.css"
import AuthoritiesSubSection from "@/components/general/AuthoritiesCard/Card/AuthoritiesSubSection";

export const mainTitle = "Autoridades del Congreso";

export const congressPresidentTitle = "PRESIDENTE DEL CONGRESO";
export const congressPresidentName = "Apellidos, Nombres";

export const authoritiesGroupTitle = "Grupo de Autoridades";

export const authorityGroup1 = [
    {
        position: "CARGO EN EL CONGRESO",
        names: [
            "Apellidos, Nombres",
            "Apellidos, Nombres",
            "Apellidos, Nombres",
            "Apellidos, Nombres",
        ],
    },
    {
        position: "CARGO EN EL CONGRESO",
        names: ["Apellidos, Nombres", "Apellidos, Nombres"],
    },
    {
        position: "CARGO EN EL CONGRESO",
        names: ["Apellidos, Nombres", "Apellidos, Nombres", "Apellidos, Nombres"],
    },
    {
        position: "CARGO EN EL CONGRESO",
        names: ["Apellidos, Nombres"],
    },
];

export default function AuthoritiesCard() {
    return (
        <div className={styles.card}>
            <h3 className={`${styles.title} ${styles.margin} ${styles.marginLeft}`}>
                {authoritiesGroupTitle}
            </h3>
            {/* Subsecciones con cargo y nombre auto generada */}
            {authorityGroup1.map((group, index) => (
                <AuthoritiesSubSection
                    key={index}
                    authorityGroup={group}
                />
            ))}
        </div>
    )
}