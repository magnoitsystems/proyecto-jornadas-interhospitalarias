'use client';
import Image from 'next/image';
import styles from './FooterComponent.module.css';
import Link from 'next/link';
import { cactus } from '@/app/ui/fonts';
import { usePathname } from 'next/navigation';

export default function Footer() {

  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      <div className={styles.leftSection}>
        <h3 className={styles.title}>Contactos</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Image src="/icons/location-marker.png" alt="Ubicación" width={16} height={16} />
            <span>
              Av. Avellaneda<br />1234, Tandil
            </span>
          </li>
          <li className={styles.item}>
            <Image src="/icons/mail-open.png" alt="Email" width={16} height={16} />
            <a className={styles.link} href="mailto:jornadashospitalarias@gmail.com">
              jornadashospitalarias@gmail.com
            </a>
          </li>
          <li className={styles.item}>
            <Image src="/icons/phone.png" alt="Teléfono" width={16} height={16} />
            <span>2494 01-2245</span>
          </li>
          <li className={styles.item}>
            <Image src="/icons/external-link.png" alt="Mapa" width={16} height={16} />
            <a className={styles.link} href="#">Google Maps</a>
          </li>
        </ul>
      </div>

      <div className={styles.centerSection}>
        <h3 className={styles.title}>Links al sitio</h3>
        <ul className={styles.list}>

          <li className={styles.item}>
              <span className={styles.dotHome}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/"
              className={`${styles.homeLink} ${cactus.className} ${pathname === '/' ? styles.activeLink : ''}`}
            >
              Home
            </Link>
          </li>
          <li className={styles.item}>
              <span className={styles.dotAutoridades}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/autoridades"
              className={`${styles.autoridadesLink} ${cactus.className} ${pathname === '/autoridades' ? styles.activeLink : ''}`}
            >
              Autoridades
            </Link>
          </li>
          <li className={styles.item}>
              <span className={styles.dotInvitados}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/invitados"
              className={`${styles.invitadosLink} ${cactus.className} ${pathname === '/invitados' ? styles.activeLink : ''}`}
            >
              Invitados
            </Link>
          </li>
          <li className={styles.item}>
              <span className={styles.dotPrograma}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/programa"
              className={`${styles.programaLink} ${cactus.className} ${pathname === '/programa' ? styles.activeLink : ''}`}
            >
              Programa
            </Link>
          </li>
          <li className={styles.item}>
              <span className={styles.dotInscripcion}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/inscripcion"
              className={`${styles.inscripcionLink} ${cactus.className} ${pathname === '/inscripcion' ? styles.activeLink : ''}`}
            >
              Inscripción
            </Link>
          </li>
          <li className={styles.item}>
              <span className={styles.dotTrabajos}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/trabajos"
              className={`${styles.trabajosLink} ${cactus.className} ${pathname === '/trabajos' ? styles.activeLink : ''}`}
            >
              Trabajos
            </Link>
          </li>
          <li className={styles.item}>
              <span className={styles.dotSponsors}>
    <Image src="/icons/dots-horizontal.svg" alt='dots' width={16} height={16} />
  </span>
            <Link
              href="/sponsors"
              className={`${styles.sponsorsLink} ${cactus.className} ${pathname === '/sponsors' ? styles.activeLink : ''}`}
            >
              Sponsors
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.logoWrapper}>
          <Image
            src="/imgs/nav-logo.png"
            alt="Logo jornadas"
            width={200}
            height={100}
            className={styles.logo}
          />
        </div>
      </div>
    </footer>
  );
}
