// src/components/SignOutButton.tsx
import { handleSignOut } from '@/libs/actions';
import styles from "./button.module.css";
import Image from 'next/image';

export default function SignOutButton() {
    return (
        <form action={handleSignOut}>
            <button
                type="submit"
                className={styles.signOutButton}
            >

                <span>Cerrar Sesión</span>
            </button>
        </form>
    );
}