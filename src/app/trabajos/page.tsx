import FormPost from "@/components/FormOfWorks/Form";
import Title from "@/components/general/SectionTitle/SectionTitle"

export default function PostWork() {
    return (
        <main>
            <div className="container">
                <Title section={"trabajos"} imgSrc={"/icons/Vector.png"} className={"assignmentTitle"}/>
                <FormPost/>
            </div>
        </main>
    )
}