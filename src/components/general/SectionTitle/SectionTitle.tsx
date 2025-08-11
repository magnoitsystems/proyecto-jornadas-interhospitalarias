'use client'

import styles from './sectionTitle.module.css';
import Image from "next/image";
import { cactus } from '../../../app/(views)/ui/fonts';
import { useEffect, useRef, useState } from 'react';

type Props = {
    section: string;
    imgSrc: string;
    className: string;
};

export default function Title({section, imgSrc, className}: Props){
    const ref = useRef<HTMLElement | null>(null);
    const [activo, setActivo] = useState(false);

    useEffect(() => {
        const refActual = ref.current;
        let timeoutId: NodeJS.Timeout;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActivo(true);
                    timeoutId = setTimeout(() => {
                        setActivo(false);
                    }, 2000);
                }
            },
            { threshold: 0.5 }
        );

        if (refActual) observer.observe(refActual);

        return () => {
            if (refActual) observer.unobserve(refActual);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <main
            ref={ref}
            className={`${cactus.className} ${styles[className]} ${activo ? styles[className + 'Hover'] : ''}`}
        >
            <div className={`${styles.icon} ${activo ? styles[className + 'IconHover'] : ''}`}>
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