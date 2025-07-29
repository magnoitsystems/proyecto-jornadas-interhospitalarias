'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { JSX, useState, useEffect } from 'react';
import { cactus } from '@/app/(views)/ui/fonts';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";


export default function NavBar(): JSX.Element {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const { data: session } = useSession();
    console.log(session);
    const isAdmin = session?.user?.admin === true;

    const getBackground = (pathname: string) => {
        if (
            pathname === '/' ||
            pathname === '/autoridades' ||
            pathname === '/invitados' ||
            pathname === '/programa'
        ) {
            return '/backgrounds/home.png';
        } else if (pathname === '/inscripcion' || pathname === '/trabajos' ||  pathname === '/adminPanel' || pathname === '/login' ||
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
          ` }
            style={{
                backgroundImage: (!isFormPage || isAdminPage) ? `url(${getBackground(pathname)})` : 'none'
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
                        <Link
                            href={isAdmin ? "/adminPanel" : "/trabajos"}
                            onClick={() => setIsOpen(false)}
                            className={`${styles.trabajosLink} ${cactus.className} ${pathname === (isAdmin ? '/adminPanel' : '/trabajos') ? styles.activeLink : ''}`}
                        >
                            {isAdmin ? "Administración" : "Trabajos"}
                        </Link>
                    </li>
                    {session && (
                        <li>
                            <button
                                onClick={() => signOut()}
                                className={`${styles.trabajosLink} ${cactus.className}`}
                                aria-label="Cerrar sesión"
                            >
                                <Image
                                    src="/icons/autoridades.png"
                                    alt="Cerrar sesión"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </section>
    );
}