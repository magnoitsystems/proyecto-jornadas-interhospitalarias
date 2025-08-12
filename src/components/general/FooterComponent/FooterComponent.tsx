'use client';
import Image from 'next/image';
import styles from './FooterComponent.module.css';
import Link from 'next/link';
import { cactus } from '../../../app/(views)/ui/fonts';
import { usePathname } from 'next/navigation';

export default function Footer() {

  const pathname = usePathname();

  const DotsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
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
              Leandro Alem 1300 B7000, Tandil.
            </span>
          </li>
          <li className={styles.item}>
            <a
              className={styles.link}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jornadashospitalarias@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/mail-open.png"
                alt="Email"
                width={16}
                height={16}
                style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
              />
              jornadas_pediatricas@sisptandil.gob.ar
            </a>
          </li>

          <li className={styles.item}>
            <Image src="/icons/phone.png" alt="Teléfono" width={16} height={16} />
            <span>0249 442-5749 (Int. 303/304/305)</span>
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
        </ul>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.logoWrapper}>
          <Image
            src="/imgs/logos/logo-title.png"
            alt="Logo jornadas"
            width={300}
            height={200}
            className={styles.logo}
          />
          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=magno.itsystems@gmail.com&su=Consultar%20por%20servicios%20de%20desarrollo%20de%20software"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image
    src="/imgs/magno.png"
    alt="Logo magno"
    width={100}
    height={100}
    className={styles.logoMagno}
  />
</a>



        </div>
      </div>

    </footer>
  );
}
