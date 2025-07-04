import styles from "./page.module.css"
import {cactus} from "@/app/ui/fonts";
import Field from "@/components/Forms/Field/Field";

const labels = ["usuario", "contraseña"]

export default function Login(){
    return(
        <main className={cactus.className}>
            <section className={styles.header}>
                <h2>
                    Inicia Sesión
                </h2>
                <h3>
                    Inicia Sesión para acceder a la entrega de trabajos
                </h3>
            </section>

            <section>
                <form>
                   <Field
                       label={labels[0]}
                       type={"text"}
                       name={"user"}/>
                    <Field
                        label={labels[1]}
                        type={"password"}
                        name={"password"}
                    />
                </form>
            </section>
        </main>
    )
}