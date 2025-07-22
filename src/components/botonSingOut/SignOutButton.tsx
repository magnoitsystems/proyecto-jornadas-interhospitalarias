// src/components/SignOutButton.tsx

import { handleSignOut } from '@/libs/actions'; // 1. Importa la acción del servidor
import styles from "./button.module.css"

// Este es un componente simple que solo renderiza un formulario con un botón.
export default function SignOutButton() {
    return (
        // 2. Usamos un <form> porque las Server Actions se invocan a través de formularios.
        // Al hacer clic en el botón, el formulario se "envía" y ejecuta la acción.
        <form action={handleSignOut}>
            <button
                type="submit"
                className={styles.signOutButton} // Puedes cambiar los estilos
            >
                Cerrar Sesión
            </button>
        </form>
    );
}