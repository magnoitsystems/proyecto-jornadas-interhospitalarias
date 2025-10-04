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
    const [workFileError, setWorkFileError] = useState<string>('');
    const [premioFileError, setPremioFileError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessageBanner, setErrorMessageBanner] = useState('');
    const [anonymousWarning, setAnonymousWarning] = useState<string>('');
    const [resumen, setResumen] = useState<string>('');
    const [resumenError, setResumenError] = useState<string>('');

    const { uploadWork, loading } = useUploadWork();

    const esAnonimo = (nombre: string): boolean => {
        const nombreLimpio = nombre.trim().toLowerCase();
        return ['anónimo','anonimo','anónima','anonima'].includes(nombreLimpio);
    };

    const hayAutoresAnonimos = (): boolean => autores.some(autor => esAnonimo(autor.nombre));

    const handleResumenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const valor = e.target.value;
        setResumen(valor);
        setResumenError(valor.length > 4999 ? `Se ha superado el límite de 5000 caracteres (${valor.length}/5000)` : '');
    };

    const handleGenerarFormularios = () => {
        const cantidad = parseInt(cantidadAutoresInput, 10);
        if (isNaN(cantidad) || cantidad < 1 || cantidad > 12) {
            setError('Por favor, introduce un número válido entre 1 y 12.');
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

        if (campo === 'nombre' && esAnonimo(valor) && opcionAPremio) {
            setAnonymousWarning('Los trabajos anónimos no pueden optar a premio. Se ha desactivado la opción a premio.');
            setOpcionAPremio(false);
            setPremioFile(null);
            setPremioFileError('');
            setTimeout(() => setAnonymousWarning(''), 5000);
        }
    };

    const handleRemoverAutor = (id: number) => {
        setAutores(prev => prev.filter(autor => autor.id !== id));
    };

    const handleTogglePremio = () => {
        if (!opcionAPremio && hayAutoresAnonimos()) {
            setAnonymousWarning('No se puede activar opción a premio porque hay autores anónimos en el trabajo.');
            setTimeout(() => setAnonymousWarning(''), 5000);
            return;
        }
        setOpcionAPremio(prev => !prev);
        if (opcionAPremio) {
            setPremioFile(null);
            setPremioFileError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccessMessage('');
        setErrorMessageBanner('');

        const title = (document.getElementById('titulo') as HTMLInputElement)?.value;
        const category = (document.getElementById('categoriaSelect') as HTMLSelectElement)?.value;

        if (!title || !category || !resumen || !workFile) {
            setErrorMessageBanner('Por favor, completa todos los campos y sube un archivo.');
            return;
        }

        if (resumen.length < 1 || resumen.length > 4999) {
            setErrorMessageBanner('El resumen debe tener entre 1 y 5000 caracteres.');
            return;
        }

        const autoresData = autores.map(autor => ({
            nombre: autor.nombre.trim(),
            afiliacion: autor.afiliacion.trim(),
        }));

        if (autoresData.some(a => !a.nombre)) {
            setErrorMessageBanner("Todos los autores deben tener nombre completo.");
            return;
        }

        if (opcionAPremio && autoresData.some(a => esAnonimo(a.nombre))) {
            setErrorMessageBanner('Los trabajos con autores anónimos no pueden optar a premio.');
            return;
        }

        if (workFile?.size && workFile.size > 5 * 1024 * 1024) {
            setErrorMessageBanner('El archivo principal supera el tamaño máximo permitido de 5 MB.');
            return;
        }

        if (premioFile?.size && premioFile.size > 5 * 1024 * 1024) {
            setErrorMessageBanner('El archivo de opción a premio supera el tamaño máximo permitido de 5 MB.');
            return;
        }

        const response = await uploadWork({
            title,
            category,
            description: resumen,
            file: workFile,
            autores: autoresData,
            premio: opcionAPremio,
            premioFile: premioFile || null
        });

        if (response.success) {
            setSuccessMessage('Trabajo subido exitosamente.');
            setErrorMessageBanner('');
            setTimeout(() => setSuccessMessage(''), 4000);
        } else {
            setErrorMessageBanner('No se pudo subir el trabajo: ' +  response.message);
            setTimeout(() => setErrorMessageBanner(''), 4000);
        }
    }

    return (
        <main className={`${styles.container} ${cactus.className}`}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
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

                <div className={styles.formGroup}>
                    <label htmlFor="cantidadAutores">
                        Cantidad de autores (hasta 12, cargar la cantidad de autores adicionales al que está cargando el formulario)
                    </label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="number"
                            id="cantidadAutores"
                            value={cantidadAutoresInput}
                            onChange={(e) => setCantidadAutoresInput(e.target.value)}
                            placeholder="Introduce un número y presiona ✓"
                            min="1"
                            max="12"
                            className={styles.mainInput}
                        />
                        <button type="button" onClick={handleGenerarFormularios} className={styles.checkButton}>✓</button>
                    </div>
                    {error && <p className={styles.errorText}>{error}</p>}
                </div>

                <div className={styles.autoresList}>
                    {autores.map((autor, index) => (
                        <div key={autor.id} className={styles.autorCard}>
                            <div className={styles.cardHeader}>
                                <h3>Datos del autor Nro. {index + 2}</h3>
                                <button type="button" onClick={() => handleRemoverAutor(autor.id)} className={styles.removeButton}>×</button>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`nombre-${autor.id}`}>Apellido y nombre</label>
                                <input 
                                    id={`nombre-${autor.id}`} 
                                    type="text" 
                                    placeholder="Apellido y nombre" 
                                    value={autor.nombre} 
                                    onChange={(e) => handleAutorChange(autor.id, 'nombre', e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
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

                <div className={styles.formGroup}>
                    <label htmlFor="resumen">
                        Resumen (máximo 5000 caracteres)
                        <span className={`${styles.charCounter} ${resumen.length > 4999 ? styles.charCounterError : ''}`}>
    {resumen.length}/5000
</span>

                    </label>
                    <textarea 
                        id="resumen" 
                        rows={10} 
                        placeholder="Escribe un resumen de tu trabajo..."
                        value={resumen}
                        onChange={handleResumenChange}
                        className={resumen.length > 5000 ? styles.textareaError : ''}
                    ></textarea>
                    {resumenError && <p className={styles.warningText}>{resumenError}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="archivo">Subí tu archivo PDF</label>
                    <input
                        type="file"
                        id="archivo"
                        name="archivo"
                        accept="application/pdf"
                        className={styles.fileInput}
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            if (file && file.size > 5 * 1024 * 1024) {
                                setWorkFile(null);
                                setWorkFileError('El archivo supera el tamaño máximo permitido de 5 MB.');
                            } else {
                                setWorkFile(file);
                                setWorkFileError('');
                            }
                        }}
                    />
                    {workFileError && <p className={styles.errorText}>{workFileError}</p>}
                </div>

                <div className={styles.formGroup}>
                    <button
                        type="button"
                        onClick={handleTogglePremio}
                        className={`${styles.toggleButton} ${opcionAPremio ? styles.toggleButtonActive : ''} ${hayAutoresAnonimos() ? styles.toggleButtonDisabled : ''}`}
                        disabled={hayAutoresAnonimos()}
                    >
                        Opción a premio (clickear en caso de requerir)
                        {hayAutoresAnonimos() && <span className={styles.disabledLabel}> - No disponible para trabajos anónimos</span>}
                    </button>

                    {opcionAPremio && (
                        <div className={styles.premioFileInputContainer}>
                            <label htmlFor="archivoPremio">Subí el PDF para el premio</label>
                            <input
                                type="file"
                                id="archivoPremio"
                                accept="application/pdf"
                                className={styles.fileInput}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    if (file && file.size > 5 * 1024 * 1024) {
                                        setPremioFile(null);
                                        setPremioFileError('El archivo supera el tamaño máximo permitido de 5 MB.');
                                    } else {
                                        setPremioFile(file);
                                        setPremioFileError('');
                                    }
                                }}
                            />
                            {premioFileError && <p className={styles.errorText}>{premioFileError}</p>}
                        </div>
                    )}
                </div>

                <button 
    type="submit" 
    disabled={loading || resumen.length > 4999} 
    className={`${styles.submitButton} ${(loading || resumen.length > 4999) ? styles.submitButtonDisabled : ''}`}
>
    {loading ? 'Subiendo...' : 'Enviar Formulario'}
</button>

                {successMessage && <p className={styles.successBanner}>{successMessage}</p>}
                {errorMessageBanner && <p className={styles.errorBanner}>{errorMessageBanner}</p>}
                {anonymousWarning && <p className={styles.warningBanner}>{anonymousWarning}</p>}
            </form>
        </main>
    );
};

export default FormPost;