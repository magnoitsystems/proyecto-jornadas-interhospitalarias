'use client';

import React, { useState } from 'react';
import styles from './Form.module.css';
import { cactus } from '@/app/(views)/ui/fonts';

interface Autor {
    id: number;
    nombre: string;
    afiliacion: string;
}

const categorias = ["Investigación cualitativa o cuantitativa", "Presentación de casos", "Relato de experiencias"];

const FormPost: React.FC = () => {
    // --- ESTADO PARA LA OPCIÓN A PREMIO ---
    const [opcionAPremio, setOpcionAPremio] = useState<boolean>(false);

    // Estados para autores
    const [cantidadAutoresInput, setCantidadAutoresInput] = useState<string>('');
    const [autores, setAutores] = useState<Autor[]>([]);
    const [error, setError] = useState<string>('');


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

    // --- FUNCIÓN PARA EL BOTÓN DE PREMIO ---
    const handleTogglePremio = () => {
        setOpcionAPremio(prev => !prev); // Invierte el estado actual
    };

    return (
        <main className={`${styles.container} ${cactus.className}`}>
            <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>

                <div className={styles.formGroup}>
                    <label htmlFor="titulo">Título (máximo 100 caracteres)</label>
                    <input type="text" id="titulo" maxLength={100} placeholder="Escribe el título de tu trabajo" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="categoriaSelect">Categoría del trabajo</label>
                    <select name="categorias" id="categoriaSelect">
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* --- SECCIÓN DINÁMICA DE AUTORES --- */}
                <div className={styles.formGroup}>
                    <label htmlFor="cantidadAutores">Cantidad de autores (hasta 8)</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="number"
                            id="cantidadAutores"
                            value={cantidadAutoresInput}
                            onChange={(e) => setCantidadAutoresInput(e.target.value)}
                            placeholder="Introduce un número y presiona ✓"
                            min="1"
                            max="8"
                            className={styles.mainInput}
                        />
                        <button type="button" onClick={handleGenerarFormularios} className={styles.checkButton}>✓</button>
                    </div>
                    {error && <p className={styles.errorText}>{error}</p>}
                </div>
                <div className={styles.autoresList}>
                    {autores.map((autor, index) => (
                        <div key={autor.id} className={styles.autorCard}>
                            {/* ...contenido de la tarjeta de autor... */}
                            <div className={styles.cardHeader}>
                                <h3>Datos del autor Nro. {index + 1}</h3>
                                <button type="button" onClick={() => handleRemoverAutor(autor.id)} className={styles.removeButton}>×</button>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`nombre-${autor.id}`}>Apellido y nombre</label>
                                <input id={`nombre-${autor.id}`} type="text" placeholder="Apellido y nombre" value={autor.nombre} onChange={(e) => handleAutorChange(autor.id, 'nombre', e.target.value)} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`afiliacion-${autor.id}`}>Afiliación laboral o académica</label>
                                <input id={`afiliacion-${autor.id}`} type="text" placeholder="Afiliación laboral o académica" value={autor.afiliacion} onChange={(e) => handleAutorChange(autor.id, 'afiliacion', e.target.value)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="resumen">Resumen (máximo 5000 caracteres)</label>
                    <textarea id="resumen" maxLength={5000} rows={10} placeholder="Escribe un resumen de tu trabajo..."></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="archivo">Subí tu archivo PDF</label>
                    <input type="file" id="archivo" name="archivo" accept="application/pdf" className={styles.fileInput} />
                </div>


                <div className={styles.formGroup}>
                    {/* El estilo del botón cambia según el estado 'opcionAPremio' */}
                    <button
                        type="button"
                        onClick={handleTogglePremio}
                        className={`${styles.toggleButton} ${opcionAPremio ? styles.toggleButtonActive : ''}`}
                    >
                        Opción a premio (clickear en caso de requerir)
                    </button>

                    {/* El input solo se muestra si 'opcionAPremio' es true */}
                    {opcionAPremio && (
                        <div className={styles.premioFileInputContainer}>
                            <label htmlFor="archivoPremio">Subí el PDF para el premio</label>
                            <input
                                type="file"
                                id="archivoPremio"
                                accept="application/pdf"
                                className={styles.fileInput}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>Enviar Formulario</button>
            </form>
        </main>
    );
};

export default FormPost;