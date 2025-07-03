'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { JSX, useState } from 'react';
import { cactus } from "@/app/ui/fonts"
import { usePathname } from 'next/navigation';
import { maxHeaderSize } from 'http';
import path from 'path';

export default function NavBar(): JSX.Element {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <section
            className={styles.heroSection}
            style={{
                backgroundImage:
                    pathname === '/' ? "url('/backgrounds/home.png')" :
                        pathname === '/autoridades' ? "url('/backgrounds/home.png')" :
                            pathname === '/invitados' ? "url('/backgrounds/home.png')" :
                                pathname === '/programa' ? "url('/backgrounds/home.png')" :
                                    pathname === '/inscripcion' ? "url('/backgrounds/form.png')" :
                                        pathname === '/trabajos' ? "url('/backgrounds/form.png')" :
                                            pathname === '/sponsors' ? "url('/backgrounds/home.png')" :
                                                "none",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height:
                    pathname === '/inscripcion' || pathname === '/trabajos'
                        ? '100vh'
                        : undefined,
                marginBottom:
                    pathname === '/inscripcion' || pathname === '/trabajos'
                        ? '0'
                        : undefined,
            }}
        >



            <nav className={styles.navbar}>

                <div className={styles.logo}>
                    <Link href="/"
                    onClick={() => setIsOpen(false)}>
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
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/autoridades"
                            onClick={() => setIsOpen(false)}
                            className={`${styles.autoridadesLink} ${cactus.className} ${pathname === '/autoridades' ? styles.activeLink : ''}`}
                        >
                            Autoridades
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/invitados"
                            onClick={() => setIsOpen(false)}
                            className={`${styles.invitadosLink} ${cactus.className} ${pathname === '/invitados' ? styles.activeLink : ''}`}
                        >
                            Invitados
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/programa"
                            onClick={() => setIsOpen(false)}
                            className={`${styles.programaLink} ${cactus.className} ${pathname === '/programa' ? styles.activeLink : ''}`}
                        >
                            Programa
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/inscripcion"
                            onClick={() => setIsOpen(false)}
                            className={`${styles.inscripcionLink} ${cactus.className} ${pathname === '/inscripcion' ? styles.activeLink : ''}`}
                        >
                            Inscripción
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/trabajos"
                            onClick={() => setIsOpen(false)}
                            className={`${styles.trabajosLink} ${cactus.className} ${pathname === '/trabajos' ? styles.activeLink : ''}`}
                        >
                            Trabajos
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/sponsors"
                            onClick={() => setIsOpen(false)}
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