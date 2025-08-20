import SectionTitle from "@/components/general/SectionTitle/SectionTitle";
import AuthoritiesCard from "@/components/AuthoritiesCard/Card/AuthoritiesCard";
import styles from "./page.module.css";

const presidentialAuthority = {
    title: "Autoridades del Congreso",
    groups: [
        {
            position: "PRESIDENTES DEL CONGRESO",
            names: [
                "Nancy Guerrero",
                "Pablo Neira"
            ]
        },
        {
            position: "Secretaria General",
            names: [
                "Carolina Pascual"
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
                "Ileana Mastropierro",
                "Juan Dartiguelongue"
            ]
        },
        {
            position: "Miembros",
            names: [
                "Myriam Carbone",
                "Cristian Bernardo",
                "Manuel Moran",
                "Tomas Baliña",
                "Alejandra Perez Cerisola",
                "Constanza Funes",
                "Celeste Garreta",
                "Carolina Bullor",
                "Micaela Salas",
                "Camila Pereira",
                "Ezequiel Monteverde"
            ]
        }
    ]
};

const organizingGroup = {
    title: "Comité organizador",
    groups: [
        {
            position: "Secretaria",
            names: [
                "Manuela Beazley"
            ]
        },
        {
            position: "Miembros",
            names: [
                "Ana Albanese",
                "Lorena Moreno",
                "Mabel Brindo",
                "Karina Ochoa",
                "Gaston Mujica",
                "Cecilia Acosta",
                "Gabriela Osimek",
                "Antonella Juanenea",
                "Cynthia Slaifstein",
                "Laura Riva",
                "Romina Escruela"
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