'use client';
import styles from './Form.module.css';
import { cactus } from '@/app/(views)/ui/fonts';
import useUploadWork from '@/hooks/worksAdmin';
import { useState } from 'react';

interface Autor {
  id: number;
  nombre: string;
  afiliacion: string;
}

const categorias = ["investigación cualitativa", "investigación cuantitativa", "presentación de casos", "relatos de experiencias"];

const FormPost: React.FC = () => {
  const [opcionAPremio, setOpcionAPremio] = useState<boolean>(false);
  const [cantidadAutoresInput, setCantidadAutoresInput] = useState<string>('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const [error, setError] = useState<string>('');
  const [workFile, setWorkFile] = useState<File | null>(null);
  const [premioFile, setPremioFile] = useState<File | null>(null);

  const { uploadWork, loading, error: uploadError, success } = useUploadWork();

  const handleGenerarFormularios = () => {
    const cantidad = parseInt(cantidadAutoresInput, 10);
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 8) {
      setError('Por favor, introduce un número válido entre 1 y 8.');
      setAutores([]);
      return;
    }
    setError('');
    const nuevosAutores = Array.from({ length: cantidad }, (_, index) => ({
      id: Date.now() + index,
      nombre: '',
      afiliacion: '',
    }));
    setAutores(nuevosAutores);
  };

  const handleAutorChange = (id: number, campo: keyof Autor, valor: string) => {
    setAutores(prev => prev.map(autor =>
      autor.id === id ? { ...autor, [campo]: valor } : autor
    ));
  };

  const handleRemoverAutor = (id: number) => {
    setAutores(prev => prev.filter(autor => autor.id !== id));
  };

  const handleTogglePremio = () => {
    setOpcionAPremio(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = (document.getElementById('titulo') as HTMLInputElement)?.value;
    const category = (document.getElementById('categoriaSelect') as HTMLSelectElement)?.value;
    const description = (document.getElementById('resumen') as HTMLTextAreaElement)?.value;
    const userId = 1;

    if (!title || !category || !description || !workFile) {
      alert('Por favor, completa todos los campos y sube un archivo.');
      return;
    }

    const autoresData = autores.map(autor => ({
      nombre: autor.nombre.trim(),
      afiliacion: autor.afiliacion.trim(),
    }));

    if (autoresData.some(a => !a.nombre)) {
      alert("Todos los autores deben tener nombre completo.");
      return;
    }

    await uploadWork({
      title,
      category,
      description,
      userId,
      file: workFile,
      autores: autoresData,
      premio: opcionAPremio,
      premioFile: premioFile || null
    });

    if (success) {
      alert('Trabajo subido exitosamente.');
    } else if (uploadError) {
      alert(`Error: ${uploadError}`);
    }
  };

  return (
    <main className={`${styles.container} ${cactus.className}`}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Campos básicos, autores y archivo */}
        {/* ...código igual que antes... */}

        <div className={styles.formGroup}>
          <label htmlFor="archivo">Subí tu archivo PDF</label>
          <input
            type="file"
            id="archivo"
            name="archivo"
            accept="application/pdf"
            className={styles.fileInput}
            onChange={(e) => setWorkFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className={styles.formGroup}>
          <button
            type="button"
            onClick={handleTogglePremio}
            className={`${styles.toggleButton} ${opcionAPremio ? styles.toggleButtonActive : ''}`}
          >
            Opción a premio (clickear en caso de requerir)
          </button>

          {opcionAPremio && (
            <div className={styles.premioFileInputContainer}>
              <label htmlFor="archivoPremio">Subí el PDF para el premio</label>
              <input
                type="file"
                id="archivoPremio"
                accept="application/pdf"
                className={styles.fileInput}
                onChange={(e) => setPremioFile(e.target.files?.[0] || null)}
              />
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Subiendo...' : 'Enviar Formulario'}
        </button>
      </form>
    </main>
  );
};

export default FormPost;
