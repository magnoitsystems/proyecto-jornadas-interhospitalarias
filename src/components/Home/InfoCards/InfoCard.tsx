'use client'

import styles from './InfoCard.module.css';
import { nunito } from '@/app/(views)/ui/fonts';
import Link from "next/link";

type Prop = {
    info? : string;
    info2? : string;
    info3? : string;
    info4? : string;
    sede : boolean;
    url?: string[];
}
export default function InfoCard({info, info2, info3, info4, sede, url} : Prop) {
    const urls = Array.from(new Set(url ?? [])).filter(Boolean);
    const hasUrls = urls.length > 0;
    return (
        <div className={`${styles.infoCardProperties} ${sede ? styles.sedeInfo : styles.infoCardProperties}  ${nunito.className}`}>
            {!hasUrls && (
                <div className={`${styles.infoPositionProperties}`}>
                    <span className={styles.infoProperties}>{info}</span>
                    <span className={styles.infoProperties}>{info2}</span>
                    <span className={styles.infoProperties}>{info3}</span>
                    <span className={styles.infoProperties}>{info4}</span>
                </div>
            )}
            <div className={styles.infoPositionProperties}>
                {hasUrls && Array.from(new Set(url ?? []))
                    .filter(Boolean)
                    .map((href, i) => (
                        <Link key={`${href}-${i}`} className={styles.infoSedeProperties} href={href}><span className={styles.infoProperties}>{[info, info2, info3, info4][i]}</span></Link>
                    ))}
            </div>
        </div>
    );
}