'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { JSX, useState, useEffect } from 'react';
import { cactus } from '@/app/(views)/ui/fonts';
import { usePathname } from 'next/navigation';
import {handleSignOut} from "@/libs/actions";
import useIsMobile from '@/hooks/useIsMobile';

export default function NavBar(): JSX.Element {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const isMobile = useIsMobile(1024);
    const isHomeLike = (p: string) =>
        p === '/' || p === '/autoridades' || p === '/invitados' || p === '/programa';

    const getBackground = (pathname: string) => {
        if (
            pathname === '/' ||
            pathname === '/autoridades' ||
            pathname === '/invitados' ||
            pathname === '/programa'
        ) {
            return '/backgrounds/homeMain.png';
        } else if (pathname === '/inscripcion' || pathname === '/trabajos' || pathname === '/adminPanel' || pathname === '/login' ||
            pathname === '/redirection' || pathname === '/adminPanel/reports') {
            return '/backgrounds/form.png';
        }
        return 'none';
    };

    const isFormPage = pathname === '/inscripcion' || pathname === '/redirection' || pathname === '/login' || pathname === '/trabajos' || pathname === '/adminPanel/reports';
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

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.minHeight = '';
        };
    }, [isFormPage, isAdminPage]);

    const bgUrl = (!isFormPage || isAdminPage)
        ? (isMobile && isHomeLike(pathname)
            ? '/backgrounds/mobileMain.png'
            : getBackground(pathname))
        : 'none';

    return (
        <section
            className={`
    ${styles.heroSection} 
    ${(isFormPage && !isAdminPage) ? styles.formHero : styles.homeHero} 
    ${isOpen ? styles.menuActive : ''}
  `}
            style={{
                backgroundImage: bgUrl === 'none' ? 'none' : `url(${bgUrl})`
            }}
        >

            <nav className={styles.navbar}>

                <div className={styles.logo}>
                    <Link href="/"
                          onClick={() => setIsOpen(false)}>
                        <Image
                            src={'/imgs/logos/navLogo.png'}
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
                        {pathname === '/adminPanel' ? (
                            <Link
                                href="/trabajos"
                                onClick={() => setIsOpen(false)}
                                className={`${styles.trabajosLink} ${cactus.className} ${pathname === '/adminPanel' ? styles.activeLink : ''}`}
                            >
                                Administración
                            </Link>
                        ) : (
                            <Link
                                href="/trabajos"
                                onClick={() => setIsOpen(false)}
                                className={`${styles.trabajosLink} ${cactus.className} ${pathname === '/trabajos' ? styles.activeLink : ''}`}
                            >
                                Trabajos
                            </Link>
                        )}
                    </li>
                    {(pathname === '/adminPanel') || (pathname === '/trabajos') ? (
                        <li>
                            <button
                                onClick={async () => {
                                    await handleSignOut();
                                    window.location.href = "/";
                                }}
                                className={`${styles.logoutButton} ${cactus.className}`}
                            >
                                <h5>Cerrar Sesión</h5>
                            </button>
                        </li>
                    ) : (
                        <li></li>
                    )}
                </ul>
            </nav>
        </section>
    );
}