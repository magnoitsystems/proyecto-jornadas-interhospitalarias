import styles from "@/components/AuthoritiesCard/Card/AuthoritiesCard.module.css";
import { cactus } from "@/app/ui/fonts";

interface AuthorityGroup {
    position: string;  // cargo en inglés
    names: string[];
}

interface AuthoritiesSubSectionProps {
    authorityGroup: AuthorityGroup;
}

export default function AuthoritiesSubSection({ authorityGroup }: AuthoritiesSubSectionProps) {
    return (
        <div className={styles.subSection}>
            <h5 className={`${styles.text} ${styles.marginLeft} ${styles.position} ${cactus.className}`}>
                {authorityGroup.position}
            </h5>
            {authorityGroup.names.map((name: string, index: number) => (
                <p
                    className={`${styles.text} ${styles.marginLeft} ${cactus.className}`}
                    key={`${name}-${index}`} // Key mejorado para evitar conflicts
                >
                    {name}
                </p>
            ))}
        </div>
    );
}