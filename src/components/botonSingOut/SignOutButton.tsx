// src/components/SignOutButton.tsx
import { handleSignOut } from '@/libs/actions';
import styles from "./button.module.css";

export default function SignOutButton() {
    return (
        <form action={handleSignOut}>
            <button
                type="submit"   
                className={styles.signOutButton}
            >
                Cerrar Sesión
            </button>
        </form>
    );
}