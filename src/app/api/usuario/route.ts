//metodos de crear usuarios y obtenerlos
import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/libs/database/userService';
import { prisma } from '@/libs/prisma';
import {Prisma} from "@prisma/client/extension";

export async function POST(request: NextRequest) {
    try {
        const userData = await request.json();
        const userService = new UserService();

        console.log("📥 DATOS RECIBIDOS:", userData);

        const result = await userService.validateUser(userData);


        if (result.success && result.user) {

            console.log("🔍 VALIDATION RESULT:", result);
            console.log("🐛 USER OBJECT:", result.user);
            console.log("🔑 USER KEYS:", Object.keys(result.user));

             const createdUser = await prisma.user.create({
                 data:{
                    name: result.user.name,
                    lastname: result.user.lastname,
                    email: result.user.email,
                    password: result.user.password,
                    job: result.user.job,
                    specialty: result.user.specialty,
                    admin: result.user.admin,
                    age: result.user.age,
                    gender: result.user.gender
                 },
                 select: {
                     idUser: true,
                     name: true,
                     lastname: true,
                     email: true,
                     job: true,
                     specialty: true,
                     admin: true,
                     age: true,
                     gender: true,
                     // NO seleccionamos password por seguridad
                 }
            })

            return NextResponse.json(
                {
                    message: 'Usuario creado exitosamente',
                    user: createdUser,
                },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                {
                    message: 'Error de validación',
                    errors: result.errors
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('API Error:', error);
        console.error('💥 ERROR COMPLETO:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
        );
    }

}
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const genderFilters = searchParams.getAll('gender');
    const jobFilters = searchParams.getAll('job');

    const filters: Prisma.UserWhereInput={admin: false};

}