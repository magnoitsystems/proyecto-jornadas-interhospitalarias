import styles from './SectionTitle.module.css';
import Image from "next/image";
import {cactus} from "@/app/ui/fonts";

type Props = {
    section: string;
    imgSrc: string;
};

export default function Title({section, imgSrc}: Props){
    return(
        <main className={`${cactus.className} ${styles.main}`}>
            <div className={styles.icon}>
                <Image
                    src={imgSrc}
                    alt={"icono acorde a la sección"}
                    width={24}
                    height={24}
                />
            </div>
            <div>
                <h1>{section}</h1>
            </div>
        </main>
    )
}