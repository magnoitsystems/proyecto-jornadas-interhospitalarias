import SectionTitle from "@/components/general/SectionTitle/SectionTitle";
import AuthoritiesCard from "@/components/AuthoritiesCard/Card/AuthoritiesCard";
import styles from "./page.module.css";

const presidentialAuthority = {
    title: "Autoridades del Congreso",
    groups: [
        {
            position: "PRESIDENTE DEL CONGRESO",
            names: ["Apellidos, Nombres"]
        }
    ]
};

const authoritiesGroup = {
    title: "Grupo de Autoridades",
    groups: [
        {
            position: "CARGO EN EL CONGRESO",
            names: [
                "Apellidos, Nombres",
                "Apellidos, Nombres",
                "Apellidos, Nombres",
                "Apellidos, Nombres"
            ]
        },
        {
            position: "CARGO EN EL CONGRESO",
            names: ["Apellidos, Nombres", "Apellidos, Nombres"]
        },
        {
            position: "CARGO EN EL CONGRESO",
            names: ["Apellidos, Nombres", "Apellidos, Nombres", "Apellidos, Nombres"]
        },
        {
            position: "CARGO EN EL CONGRESO",
            names: ["Apellidos, Nombres"]
        }
    ]
};

export default function Authorities(){
    return(
        <main className={styles.main}>

            <SectionTitle
                section={"Autoridades"}
                className={"authoritiesTitle"}
                imgSrc={"/icons/autoridades.png"}
            />
            <section className={styles.cardsSection}>

                <div className={styles.containerLongCard}>
                    <AuthoritiesCard
                        cardData={presidentialAuthority}
                        variant="long"
                    />
                </div>

                <AuthoritiesCard cardData={authoritiesGroup} />
                <AuthoritiesCard cardData={authoritiesGroup} />
                <AuthoritiesCard cardData={authoritiesGroup} />
                <AuthoritiesCard cardData={authoritiesGroup} />
                <AuthoritiesCard cardData={authoritiesGroup} />
                <AuthoritiesCard cardData={authoritiesGroup} />
            </section>
        </main>
    )
}