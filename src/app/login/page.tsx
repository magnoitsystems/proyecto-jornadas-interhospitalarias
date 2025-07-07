'use client';

import {useState} from "react";
import styles from "./page.module.css"
import {cactus} from "@/app/ui/fonts";
import Field from "@/components/Forms/Field/Field";
import Link from "next/link";

interface LoginData {
    user: string;
    password: string;
}

export default function Login() {
    const [loginData, setLoginData] = useState<LoginData>({
        user: '',
        password: ''
    });

    const updateField = (fieldName: keyof LoginData) => (value: string) => {
        setLoginData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login data:', loginData);
    };

    return (
        <main className={`${cactus.className} ${styles.main}`}>
            <section className={`${cactus.className} ${styles.header}`}>
                <h3>Inicia Sesión</h3>
                <h5>Inicia Sesión para acceder a la entrega de trabajos</h5>
            </section>

            <section>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Field
                        label="Usuario"
                        type="text"
                        name="user"
                        placeholder="Usuario"
                        value={loginData.user}
                        onChange={updateField('user')}
                        required
                    />
                    <Field
                        label="Contraseña"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={loginData.password}
                        onChange={updateField('password')}
                        required
                    />
                    <Link href={'/adminPanel'} className={styles.linkProperties}>
                        <button className={`${cactus.className} ${styles.button}`} type="submit">Iniciar Sesión</button>
                    </Link>
                </form>
            </section>
        </main>
    );
}