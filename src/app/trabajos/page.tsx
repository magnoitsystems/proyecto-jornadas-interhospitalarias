import FormPost from "@/components/FormOfWorks/Form";
import Title from "@/components/general/SectionTitle/SectionTitle"
import InstructionsToPostWorks from "@/components/instructionsToPostWorks/instructions"
import styles from "./page.module.css";
import Rules from   "@/components/rulesToPostWork/Rules"

export default function PostWork() {
    return (
        <main>

                <Title section={"trabajos"} imgSrc={"/icons/Vector.png"} className={"assignmentTitle"}/>
               <div  className={styles.container}>
                    <FormPost/>
                    <InstructionsToPostWorks/>
                </div>
            <Rules/>

        </main>
    )
}