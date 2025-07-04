import styles from "@/components/AuthoritiesCard/Card/AuthoritiesCard.module.css";

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
            <h5 className={`${styles.text} ${styles.marginLeft}`}>
                {authorityGroup.position}
            </h5>
            {authorityGroup.names.map((name: string, index: number) => (
                <p
                    className={`${styles.text} ${styles.marginLeft}`}
                    key={`${name}-${index}`} // Key mejorado para evitar conflicts
                >
                    {name}
                </p>
            ))}
        </div>
    );
}