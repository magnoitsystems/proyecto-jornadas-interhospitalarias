'use client';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftSection}>
        <h3>Contactos</h3>
        <ul>
          <li>
            <Image src="/icons/location-marker.png" alt="Ubicación" width={16} height={16} />
            Av. Avellaneda<br />1234, Tandil
          </li>
          <li>
            <Image src="/icons/mail-open.png" alt="Email" width={16} height={16} />
            <a href="mailto:jornadashospitalarias@gmail.com">jornadashospitalarias@gmail.com</a>
          </li>
          <li>
            <Image src="/icons/phone.png" alt="Teléfono" width={16} height={16} />
            2494 01-2245
          </li>
          <li>
            <Image src="/icons/external-link.png" alt="Mapa" width={16} height={16} />
            <a href="#">Google Maps</a>
          </li>
        </ul>
      </div>

      <div className={styles.centerSection}>
        <h3>Links al sitio</h3>
        <ul>
          <li>⋯ Home</li>
          <li>⋯ Autoridades</li>
          <li>⋯ Invitados</li>
          <li>⋯ Programa</li>
          <li>⋯ Inscripción</li>
          <li>⋯ Trabajos</li>
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
