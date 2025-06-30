'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { JSX } from 'react';

export default function NavBar(): JSX.Element {
    return (
        <nav className={styles.navbar}>
            {/* Logo a la izquierda */}
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        src={'/imgs/jornadas-logo.png'}
                        alt={'interhospitalities meeting logo'}
                        width={392}
                        height={61}
                        style={{ cursor: 'pointer' }}
                    />
                </Link>
            </div>

            {/* Menú a la derecha */}
            <ul className={styles.menu}>
                <li><Link href="/" className={styles.homeLink}>Home</Link></li>
                <li><Link href="/autoridades" className={styles.autoridadesLink}>Autoridades</Link></li>
                <li><Link href="/invitados" className={styles.invitadosLink}>Invitados</Link></li>
                <li><Link href="/programa" className={styles.programaLink}>Programa</Link></li>
                <li><Link href="/inscripcion" className={styles.inscripcionLink}>Inscripción</Link></li>
                <li><Link href="/trabajos" className={styles.trabajosLink}>Trabajos</Link></li>
                <li><Link href="/sponsors" className={styles.sponsorsLink}>Sponsors</Link></li>
            </ul>
        </nav>
    );
}