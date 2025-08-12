import {Statistics} from "@/types";
import {prisma} from "@/libs/prisma";

export class GetStatistic{

    async getForGenderFeminine(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where: {
                gender: "femenino",
                admin: false
            }
        })
        return [{
            statistics: 'Mujeres',
            amount: result
        }]
    }

    async getForGenderMale(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where:{
                gender: "masculino",
                admin: false
            }
        })
        return [{
            statistics: "Hombres",
            amount: result
        }]
    }

    async getTotalUsers(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where: {
                admin: false
            }
        })

        return [{
            statistics: "Usuarios",
            amount: result
        }]
    }

    async getStudents(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where:{
                job: "estudiante",
                admin: false
            }
        })

        return [{
            statistics: "Estudiantes",
            amount: result
        }]
    }

    async getMedical(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where:{
                job: "medico",
                admin: false
            }
        })

        return [{
            statistics: "Médicos",
            amount: result
        }]
    }

    async getNurse(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where:{
                job: "enfermero",
                admin: false
            }
        })

        return [{
            statistics: "Enfermeros",
            amount: result
        }]
    }

    async getTechnique(): Promise<Statistics[]>{
        const result = await prisma.user.count({
            where:{
                job: "técnico",
                admin: false
            }
        })

        return [{
            statistics: "Técnicos",
            amount: result
        }]
    }

    async getAllStatistics(): Promise<Statistics[]> {
        const results = await Promise.all([
            this.getTotalUsers(),
            this.getForGenderFeminine(),
            this.getForGenderMale(),
            this.getStudents(),
            this.getMedical(),
            this.getNurse(),
            this.getTechnique()
        ]);

        return results.flat();
    }
}