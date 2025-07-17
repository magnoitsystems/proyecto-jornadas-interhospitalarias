'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { JSX, useState, useEffect } from 'react';
import { cactus } from "@/app/ui/fonts"
import { usePathname } from 'next/navigation';

export default function NavBar(): JSX.Element {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const getBackground = (pathname: string) => {
        if (
            pathname === '/' ||
            pathname === '/autoridades' ||
            pathname === '/invitados' ||
            pathname === '/programa' ||
            pathname === '/sponsors'
        ) {
            return '/backgrounds/home.png';
        } else if (pathname === '/inscripcion' || pathname === '/trabajos' || pathname === '/adminPanel' || pathname === '/login' ||
            pathname === '/redirection') {
            return '/backgrounds/form.png';
        }
        return 'none';
    };

    const isFormPage = pathname === '/inscripcion' || pathname === '/redirection' || pathname === '/login' || pathname === '/trabajos';
    const isAdminPage = pathname === '/adminPanel';

    useEffect(() => {
        if (isFormPage && !isAdminPage) {
            document.body.style.backgroundImage = `url(/backgrounds/form.png)`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.minHeight = '100vh';
        } else {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.minHeight = '';
        }

        // Cleanup al desmontar
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.minHeight = '';
        };
    }, [isFormPage, isAdminPage]);

    return (
        <section
            className={`
    ${styles.heroSection} 
    ${(isFormPage && !isAdminPage) ? styles.formHero : styles.homeHero} 
    ${isOpen ? styles.menuActive : ''}
  `}
            style={{
                backgroundImage: (!isFormPage || isAdminPage) ? `url(${getBackground(pathname)})` : 'none'
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