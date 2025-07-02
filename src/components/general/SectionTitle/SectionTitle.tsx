import styles from './sectionTitle.module.css';
import Image from "next/image";
import {cactus} from "@/app/ui/fonts";

type Props = {
    section: string;
    imgSrc: string;
    className: string;
};

export default function Title({section, imgSrc, className}: Props){
    return(
        <main className={`${cactus.className} ${styles[className]}  ${styles.global}`}>
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