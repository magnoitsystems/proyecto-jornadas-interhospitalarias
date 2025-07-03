import RoundedCard from "@/components/RoundedCard/RoundedCard";
import styles from './page.module.css';

export default function AdminPanel() {
    return (
        <main>
            <div className={styles.roundedCards}>
                <RoundedCard number={"0"} title={"Inscriptos"} borderColor="linear-gradient(45deg, red, blue, green, yellow)"></RoundedCard>
                <RoundedCard number={"0"} title={"Inscriptos"}></RoundedCard>
                <RoundedCard number={"0"} title={"Inscriptos"}></RoundedCard>
            </div>
        </main>
    );
}