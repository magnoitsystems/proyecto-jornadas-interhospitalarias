'use client';

import styles from './Inscripcion.module.css';
import { cactus } from '../../app/(views)/ui/fonts';
import Link from "next/link";

export default function InscriptionForm() {
    return (
        <section className={`${styles.formContainer} ${cactus.className}`}>
            <div className={`${styles.formIntro} ${cactus.className}`}>
                <h2>Registrate a la Jornada</h2>
                <p>
                    Completá el formulario con tus datos y nos contactaremos<br />
                    a la brevedad para darte un usuario y acceder a más información de la jornada
                </p>
            </div>

            <div className={`${styles.formCard} ${cactus.className}`}>
                <form>
                    <div className={styles.formInput}>
                        <label>Nombre</label>
                        <input type="text" placeholder="Nombre"/>

                        <label>Apellido</label>
                        <input type="text" placeholder="Apellido"/>

                        <label>Fecha de Nacimiento</label>
                        <input type="date"/>

                        <label>D.N.I</label>
                        <input type="text" placeholder="D.N.I"/>

                        <label>Correo Electrónico</label>
                        <input type="email" placeholder="Correo Electrónico"/>

                        <label>Profesión</label>
                        <select name="profesion" id="profesion">
                            <option value="medico">Médico</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="enfermero">Enfermero</option>
                            <option value="kinesiologo">Kinesiólogo</option>
                            <option value="fonoudiologo">Fonoaudiólogo</option>
                            <option value="tecnico">Técnico</option>
                            <option value="no-pertenece">No perteneciente al área de la salud</option>
                            <option value="otros">Otros</option>
                        </select>

                        <label>Especialización</label>
                        <input type="text" placeholder="Especialización"/>

                        <label>Género</label>
                        <select name="genero" id="genero">
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                            <option value="ns">Prefiero no decirlo</option>
                        </select>
                    </div>
                    <div className={styles.formButton}>
                        <Link href={'/redirection'}><button type="submit" className={cactus.className}>Registrarse</button></Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
