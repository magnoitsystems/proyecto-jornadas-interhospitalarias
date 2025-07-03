import NavBar from "@/components/general/NavBarComponent/NavBar";
import SectionTitle from "@/components/general/SectionTitle/SectionTitle";
import AuthoritiesCard from "@/components/general/AuthoritiesCard/Card/AuthoritiesCard";
import styles from "./page.module.css";


export default function Authorities(){
    return(
        <>
            <main>
                <SectionTitle section={"autoridades"} className={"authoritiesTitle"} imgSrc={"/icons/autoridad.png"} />
                <section className={styles.cardsSection}>
                    <AuthoritiesCard/>
                    <AuthoritiesCard/>
                    <AuthoritiesCard/>
                    <AuthoritiesCard/>
                </section>
            </main>
        </>
    )
}