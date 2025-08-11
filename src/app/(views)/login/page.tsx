'use client';

import { useActionState } from 'react';
import styles from "./page.module.css";
import { cactus } from '../../../app/(views)/ui/fonts';
import Field from "@/components/Forms/Field/Field";
import { authenticate } from '@/libs/actions'; 

export default function Login() {

    const [state, formAction, isPending] = useActionState(authenticate, undefined);


    return (
        <main className={`${cactus.className} ${styles.main}`}>
            <section className={`${cactus.className} ${styles.header}`}>
                <h3>Inicia Sesión</h3>
                <h5>Inicia Sesión para acceder a la entrega de trabajos</h5>
            </section>

            <section>
                <form className={styles.form} action={formAction}>
                    <Field
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <Field
                        label="Contraseña"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                    />

                    <button
                        className={`${cactus.className} ${styles.button}`}
                        type="submit"
                        aria-disabled={isPending}
                    >
                        {isPending ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                    </button>


                    <div className={styles.errorContainer}>
                        {state && (
                            <p className={styles.errorMessage}>{state}</p>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}