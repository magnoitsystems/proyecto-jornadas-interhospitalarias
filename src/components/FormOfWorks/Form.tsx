import React from 'react';
import styles from './Form.module.css';

const PaperclipIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
);

const FormPost: React.FC = () => {
    return (
        <main className={styles.container}>
            <form className={styles.formContainer}>
                <input
                    type="file"
                    name="archivo"
                    id="file-upload"
                    className={styles.fileInput}
                />

                <label htmlFor="file-upload" className={styles.fileLabel}>
          <span className={styles.iconContainer}>
            <PaperclipIcon />
          </span>
                    <span className={styles.text}>Trabajos</span>
                </label>

                <button type="submit" className={styles.submitButton}>
                    Enviar trabajo
                </button>
            </form>
        </main>
    );
};

export default FormPost;