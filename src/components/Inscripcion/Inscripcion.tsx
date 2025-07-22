'use client';

import styles from './Inscripcion.module.css';
import { cactus } from '../../app/(views)/ui/fonts';
import useCreateUser from '@/hooks/getUsers';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InscriptionForm() {
  const { createUser, loading } = useCreateUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    age: '',
    email: '',
    dni: '',
    job: '',
    specialty: '',
    gender: '',
    admin: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userToCreate = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        job: formData.job,
        specialty: formData.specialty,
        gender: formData.gender,
        age: parseInt(formData.age),
        admin: false
      };

      const createdUser = await createUser(userToCreate);

      if (createdUser) {
        router.push('/redirection');
      } else {
        setError("Ocurrió un error al registrarte. Revisá los datos e intentá nuevamente.");
      }
    } catch (err) {
      setError("Error inesperado. Por favor intentá más tarde.");
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className={styles.formInput}>
            <label>Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />

            <label>Apellido</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Apellido" required />

            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="birthDate"
              onChange={(e) => {
                const birthDate = new Date(e.target.value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                setFormData(prev => ({ ...prev, age: age.toString() }));
              }}
              required
            />

            <label>Correo Electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required />

            <label>Profesión</label>
            <select name="job" value={formData.job} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
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
            <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Especialización" />

            <label>Género</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Seleccionar...</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="ns">Prefiero no decirlo</option>
            </select>
          </div>

          {error && <p className={styles.formError}>{error}</p>}
          {loading && <p className={styles.formLoading}>Enviando datos...</p>}

          <div className={styles.formButton}>
            <button type="submit" className={cactus.className}>Registrarse</button>
          </div>
        </form>
      </div>
    </section>
  );
}
