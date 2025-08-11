'use client';

import { useState } from 'react';
import styles from './GeneradorAutores.module.css';

interface Autor {
    id: number;
    nombre: string;
    afiliacion: string;
}

export default function GeneradorAutores() {
    const [numAutoresInput, setNumAutoresInput] = useState<string>('');

    const [autores, setAutores] = useState<Autor[]>([]);

    const [error, setError] = useState<string>('');

    const handleGenerarFormularios = () => {
        const cantidad = parseInt(numAutoresInput, 10);

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
        setAutores(prevAutores =>
            prevAutores.map(autor =>
                autor.id === id ? { ...autor, [campo]: valor } : autor
            )
        );
    };

    const handleRemoverAutor = (id: number) => {
        setAutores(prevAutores => prevAutores.filter(autor => autor.id !== id));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
                <label htmlFor="cantidadAutores">Cantidad de autores (hasta 8)</label>
                <div className={styles.inputWithButton}>
                    <input
                        id="cantidadAutores"
                        type="number"
                        min="1"
                        max="8"
                        placeholder="Cantidad de autores"
                        value={numAutoresInput}
                        onChange={(e) => setNumAutoresInput(e.target.value)}
                        className={styles.mainInput}
                    />
                    <button onClick={handleGenerarFormularios} className={styles.checkButton} aria-label="Confirmar cantidad">
                        ✓
                    </button>
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
            </div>

            <div className={styles.autoresList}>
                {autores.map((autor, index) => (
                    <div key={autor.id} className={styles.autorCard}>
                        <div className={styles.cardHeader}>
                            <h3>Datos del autor Nro. {index + 1}</h3>
                            <button onClick={() => handleRemoverAutor(autor.id)} className={styles.removeButton} aria-label={`Eliminar autor ${index + 1}`}>
                                ×
                            </button>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor={`nombre-${autor.id}`}>Apellido y nombre</label>
                            <input
                                id={`nombre-${autor.id}`}
                                type="text"
                                placeholder="Apellido y nombre"
                                value={autor.nombre}
                                onChange={(e) => handleAutorChange(autor.id, 'nombre', e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor={`afiliacion-${autor.id}`}>Afiliación laboral o académica</label>
                            <input
                                id={`afiliacion-${autor.id}`}
                                type="text"
                                placeholder="Afiliación laboral o académica"
                                value={autor.afiliacion}
                                onChange={(e) => handleAutorChange(autor.id, 'afiliacion', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}