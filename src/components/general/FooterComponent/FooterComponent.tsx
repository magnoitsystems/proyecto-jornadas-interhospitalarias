'use client';
import Image from 'next/image';
import styles from './FooterComponent.module.css';
import Link from 'next/link';
import { cactus } from '@/app/ui/fonts';
import { usePathname } from 'next/navigation';

export default function Footer() {

  const pathname = usePathname();

  // Al inicio de tu archivo, después de los imports
const DotsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="5" cy="12" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="19" cy="12" r="2"/>
  </svg>
);

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
      <span className={`${styles.dotHome} ${pathname === '/' ? styles.activeLink : ''}`}>
        <DotsIcon></DotsIcon>
  </span>
      <Link
        href="/"
        className={`${styles.homeLink} ${cactus.className} ${pathname === '/' ? styles.activeLink : ''}`}
      >
        Home
      </Link>
    </li>
    <li className={styles.item}>
      <span className={`${styles.dotAutoridades} ${pathname === '/autoridades' ? styles.activeLink : ''}`}>
        <DotsIcon></DotsIcon>
      </span>
      <Link
        href="/autoridades"
        className={`${styles.autoridadesLink} ${cactus.className} ${pathname === '/autoridades' ? styles.activeLink : ''}`}
      >
        Autoridades
      </Link>
    </li>
    <li className={styles.item}>
      <span className={`${styles.dotInvitados} ${pathname === '/invitados' ? styles.activeLink : ''}`}>
        <DotsIcon></DotsIcon>
      </span>
      <Link
        href="/invitados"
        className={`${styles.invitadosLink} ${cactus.className} ${pathname === '/invitados' ? styles.activeLink : ''}`}
      >
        Invitados
      </Link>
    </li>
    <li className={styles.item}>
      <span className={`${styles.dotPrograma} ${pathname === '/programa' ? styles.activeLink : ''}`}>
        <DotsIcon></DotsIcon>
      </span>
      <Link
        href="/programa"
        className={`${styles.programaLink} ${cactus.className} ${pathname === '/programa' ? styles.activeLink : ''}`}
      >
        Programa
      </Link>
    </li>
    <li className={styles.item}>
      <span className={`${styles.dotInscripcion} ${pathname === '/inscripcion' ? styles.activeLink : ''}`}>
        <DotsIcon></DotsIcon>
      </span>
      <Link
        href="/inscripcion"
        className={`${styles.inscripcionLink} ${cactus.className} ${pathname === '/inscripcion' ? styles.activeLink : ''}`}
      >
        Inscripción
      </Link>
    </li>
    <li className={styles.item}>
      <span className={`${styles.dotTrabajos} ${pathname === '/trabajos' ? styles.activeLink : ''}`}>
     <DotsIcon></DotsIcon>
      </span>
      <Link
        href="/trabajos"
        className={`${styles.trabajosLink} ${cactus.className} ${pathname === '/trabajos' ? styles.activeLink : ''}`}
      >
        Trabajos
      </Link>
    </li>
    <li className={styles.item}>
      <span className={`${styles.dotSponsors} ${pathname === '/sponsors' ? styles.activeLink : ''}`}>
       <DotsIcon></DotsIcon>
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
          src="/imgs/logo-title.png"
          alt="Logo jornadas"
          width={300}
          height={200}
          className={styles.logo}
        />
      </div>
      </div>
    </footer>
  );
}
