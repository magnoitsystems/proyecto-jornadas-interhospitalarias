import FormPost from "@/components/FormOfWorks/Form";
import Title from "@/components/general/SectionTitle/SectionTitle"
import InstructionsToPostWorks from "@/components/InstructionsToPostWorks/instructions"
import styles from "./page.module.css";
import Rules from   "@/components/rulesToPostWork/Rules"
import { cactus } from '@/app/(views)/ui/fonts';
import { auth } from '@/auth';

export default async function PostWork() {
    const session = await auth();
    const user = session?.user;

    return (
        <main className={`${styles.mainPage} ${cactus.className}`}>

            <div className={`${styles.introduction} ${cactus.className}`}>
                <Title section={"Trabajos"} imgSrc={"/icons/Vector.png"} className={"assignmentTitle"}/>
                <div className={`${styles.presentation} ${cactus.className}`}>
                    <h1 className={`${cactus.className}`}>
                        Bienvenido/a, {user?.name ? `${user.name} ${user.lastname || ''}` : 'usuario/a'}
                    </h1>
                    <h2 className={`${cactus.className}`}>
                        Le solicitamos que, previo al envio de un trabajo libre lea el reglamento
                        que se encuentra por debajo del formulario para la presentacion del mismo
                    </h2>
                </div>
            </div>
            <div  className={styles.container}>
                <FormPost/>
                <InstructionsToPostWorks/>
            </div>
            <Rules/>
        </main>
    )
}