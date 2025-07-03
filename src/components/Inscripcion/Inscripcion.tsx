'use client';

import styles from './Inscripcion.module.css';

export default function InscriptionForm() {
  return (
    <section className={styles.formContainer}>
      <div className={styles.formIntro}>
        <h2>Registrate a la Jornada</h2>
        <p>
          Completá el formulario con tus datos y nos contactaremos<br />
          a la brevedad para darte un usuario y acceder a más información de la jornada
        </p>
      </div>

      <div className={styles.formCard}>
        <form>
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" />

          <label>Apellido</label>
          <input type="text" placeholder="Apellido" />

          <label>Fecha de Nacimiento</label>
          <input type="date" />

          <label>D.N.I</label>
          <input type="text" placeholder="D.N.I" />

          <label>Correo Electrónico</label>
          <input type="email" placeholder="Correo Electrónico" />

          <label>Profesión</label>
          <input type="text" placeholder="Profesión" />

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </section>
  );
}
