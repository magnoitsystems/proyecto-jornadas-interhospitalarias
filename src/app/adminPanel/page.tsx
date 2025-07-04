import RoundedCard from "@/components/RoundedCard/RoundedCard";
import styles from './page.module.css';

// /adminPanel

export default function AdminPanel() {
    return (
        <main>
            <div className={styles.roundedCards}>
                <RoundedCard number={"0"} title={"Inscriptos"} borderColor="linear-gradient(45deg, red, blue, green, yellow)"></RoundedCard>
                <RoundedCard number={"0"} title={"Edad +50"}></RoundedCard>
                <RoundedCard number={"0"} title={"Edad -50"}></RoundedCard>
                <RoundedCard number={"0"} title={"Mujeres"}></RoundedCard>
                <RoundedCard number={"0"} title={"Hombres"}></RoundedCard>
            </div>
        </main>
    );
}