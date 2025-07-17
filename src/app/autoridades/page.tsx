import SectionTitle from "@/components/general/SectionTitle/SectionTitle";
import AuthoritiesCard from "@/components/AuthoritiesCard/Card/AuthoritiesCard";
import styles from "./page.module.css";

const presidentialAuthority = {
    title: "Autoridades del Congreso",
    groups: [
        {
            position: "PRESIDENTES DEL CONGRESO",
            names: [
                "Dr. Pablo Neira",
                "Dra. Nancy Guerrero"
            ]
        },
        {
            position: "Secretaria General",
            names: [
                "Dra. Carolina Pascual"
            ]
        }
    ]
};

const scientificGroup = {
    title: "Comité Científico",
    groups: [
        {
            position: "Secretarios",
            names: [
                "Dra. Ileana Mastropierro",
                "Dr. Juan Dartiguelongue"
            ]
        },
        {
            position: "Miembros",
            names: [
                "Dra. Myriam Carbone",
                "Dr. Christian Bernardo",
                "Dr. Manuel Moran",
                "Dr. Tomas Baliña",
                "Dra. Alejandra Perez Cerisola",
                "Lic. Constanza Funes",
                "Dra. Celeste Garreta",
                "Dra. Carolina Bullor",
                "Dra. Micaela Salas",
                "Dra. Camila Pereira"
            ]
        }
    ]
};

const organizingGroup = {
    title: "Cómite organizador",
    groups: [
        {
            position: "Comité Organizador - Secretaria",
            names: [
            "Dra. Manuela Beazley"
            ]
        },
        {
            position: "Comité Organizador - Miembros",
                names: [
            "Dra. Ana Albanese",
            "Dra. Lorena Moreno",
            "Dra. Mabel Brindo",
            "Lorena San Martin",
            "Karina Ochoa",
            "Gaston Mujica",
            "Lic. Cecilia Acosta",
            "Lic. Gabriela Osimek"
        ]
        }
    ]
}

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

                <AuthoritiesCard cardData={scientificGroup} />
                <AuthoritiesCard cardData={organizingGroup} />
            </section>
        </main>
    )
}