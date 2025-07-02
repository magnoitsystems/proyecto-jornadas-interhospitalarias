'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { JSX, useState } from 'react';
import { cactus } from "@/app/ui/fonts"
import { usePathname } from 'next/navigation';
import { maxHeaderSize } from 'http';

export default function NavBar(): JSX.Element {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <section className={`${styles.heroSection}`}>
            <nav className={styles.navbar}>

                <div className={styles.logo}>
                    <Link href="/">
                        <Image
                            src={'/imgs/nav-logo.png'}
                            alt={'interhospitalities meeting logo'}
                            fill
                            style={{ objectFit: 'contain', cursor: 'pointer' }}
                        />
                    </Link>
                </div>

                <div
                    className={`${styles.btnBurgerProperties} ${isOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                >
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>


                <ul className={`${styles.menu} ${isOpen ? styles.openNav : styles.closeNav}`} >
                    <li>
                        <Link
                            href="/"
                            className={`${styles.homeLink} ${cactus.className} ${pathname === '/' ? styles.activeLink : ''}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/autoridades"
                            className={`${styles.autoridadesLink} ${cactus.className} ${pathname === '/autoridades' ? styles.activeLink : ''}`}
                        >
                            Autoridades
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/invitados"
                            className={`${styles.invitadosLink} ${cactus.className} ${pathname === '/invitados' ? styles.activeLink : ''}`}
                        >
                            Invitados
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/programa"
                            className={`${styles.programaLink} ${cactus.className} ${pathname === '/programa' ? styles.activeLink : ''}`}
                        >
                            Programa
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/inscripcion"
                            className={`${styles.inscripcionLink} ${cactus.className} ${pathname === '/inscripcion' ? styles.activeLink : ''}`}
                        >
                            Inscripción
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/trabajos"
                            className={`${styles.trabajosLink} ${cactus.className} ${pathname === '/trabajos' ? styles.activeLink : ''}`}
                        >
                            Trabajos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/sponsors"
                            className={`${styles.sponsorsLink} ${cactus.className} ${pathname === '/sponsors' ? styles.activeLink : ''}`}
                        >
                            Sponsors
                        </Link>
                    </li>
                </ul>

            </nav>
        </section>

    );
}