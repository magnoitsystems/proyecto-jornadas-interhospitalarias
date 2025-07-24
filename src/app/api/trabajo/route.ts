import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/libs/cloudinary';
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import {GetWorkForFilter} from "@/services/workFilterService";
import { supabase } from '@/libs/supabase';

const userService = new GetWorkForFilter();

export async function POST(request: NextRequest) {
    console.log("fuckin post");
    try {
        console.log("HOLA POST");
        
        // Obtener la sesión del usuario
        const session = await auth();
        
        // Verificar si el usuario está autenticado
        if (!session || !session?.user?.id) {
            return NextResponse.json(
                { message: 'Usuario no autenticado' }, 
                { status: 401 }
            );
        }
        
        const userId = session.user.id;
        console.log(userId);
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const autoresRaw = formData.get('autores') as string;
        const premioRaw = formData.get('premio') as string;
        const premioFile = formData.get('premioFile');
        const premio = premioRaw === 'true';

        if (!autoresRaw) return NextResponse.json({ message: 'Faltan autores' }, { status: 400 });
        const autoresParsed = JSON.parse(autoresRaw);

        const file = formData.get('file');
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ message: 'Archivo inválido' }, { status: 400 });
        }

        // Subir archivo principal
        const normalUploadResult = await subirASupabase(file, title);
        const workCode = uuidv4();

        // Crear trabajo principal con userId
        const normalWork = await prisma.works.create({
            data: {
                title,
                category,
                description,
                work_code: workCode,
                file: normalUploadResult,
                prize: false,
                user_id: Number(userId),
            },
        });

        // Si hay premio y archivo de premio
        if (premio && premioFile && premioFile instanceof Blob) {
            const premioUploadUrl = await subirASupabase(premioFile, `${title}-premio`);
            await prisma.works.create({
                data: {
                    title,
                    category,
                    description,
                    work_code: uuidv4(),
                    file: premioUploadUrl,
                    prize: true,
                    user_id: Number(userId)
                },
            });
        }

        await prisma.author.createMany({
            data: autoresParsed.map((a: any) => ({
                name: a.nombre,
                affiliation: a.afiliacion,
                work_id: normalWork.id_work,
            })),
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('ERROR EN /api/trabajo:', error);
        return NextResponse.json(
            { success: false, message: (error as any)?.message ?? 'Error desconocido' },
            { status: 500 }
        );
    }
}

async function subirASupabase(fileBlob: Blob, filename: string): Promise<string> {
    const buffer = Buffer.from(await fileBlob.arrayBuffer());

    const { data, error } = await supabase.storage
        .from('trabajos') // este es el nombre de tu bucket
        .upload(`${filename}-${Date.now()}.pdf`, buffer, {
            contentType: 'application/pdf',
            upsert: true,
        });

    if (error) {
        console.error("Error al subir a Supabase:", error.message);
        throw new Error("No se pudo subir el archivo");
    }

    const { data: publicUrlData } = supabase
        .storage
        .from('trabajos')
        .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
}

export async function GET(){
    const usersFilter = await userService.getAllStatistics();

    try {
        if(!usersFilter){
            return NextResponse.json(
                {message: "Error al filtrar"},
                {status: 400}
            )
        }

        return NextResponse.json(usersFilter);
    }
    catch (e){
        return NextResponse.json(
            { message: "Error del servidor" },
            { status: 500 }
        )
    }
}