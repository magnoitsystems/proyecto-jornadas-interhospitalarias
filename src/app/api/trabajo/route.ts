import { NextRequest, NextResponse } from 'next/server';
import { isValidMedicalPdf } from "@/services/pdfValidationService";
import { prisma } from '@/libs/prisma';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';
import { GetWorkForFilter } from "@/services/workFilterService";
import { EmailService } from "@/services/emailService"

const userService = new GetWorkForFilter();

export async function POST(request: NextRequest) {
	try {
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

		const validationPDF = await isValidMedicalPdf(file);

		if(!validationPDF.accept){
			return NextResponse.json(
				{ message: validationPDF.message },
				{ status: 400 }
			);
	    }

		if (validationPDF.details?.length !== undefined){
			console.warn('PDF subido con advertencias', validationPDF.details);
		}

        // Subir archivo principal
        console.log("antes de subir el normal a drive");
        const workCodeWithouthPrize = uuidv4();
        const normalUploadResult = await subirAGoogleDrive(file, `${title}-${workCodeWithouthPrize}-premio`, false);
        console.log("workcode: "+ workCodeWithouthPrize);
        console.log("url normal: "+normalUploadResult);

        // Crear trabajo principal con userId
        const normalWork = await prisma.works.create({
            data: {
                title,
                category,
                description,
                work_code: workCodeWithouthPrize,
                file: normalUploadResult,
                prize: false,
                user_id: Number(userId),
            },
        });
        console.log("subido trabajo normal a db");

        const workCode= uuidv4();
        // Si hay premio y archivo de premio
        console.log("antes de subir a drive");
        if (premio && premioFile && premioFile instanceof Blob) {
            const premioUploadUrl = await subirAGoogleDrive(premioFile, `${title}-${workCode}-premio`, true);
            console.log("subido a drive");
            console.log(premioUploadUrl);
            await prisma.works.create({
                data: {
                    title,
                    category,
                    description,
                    work_code: workCode,
                    file: premioUploadUrl,
                    prize: true,
                    user_id: Number(userId)
                },
            });
        }

        console.log("por crear los autores");
        await prisma.author.createMany({
            data: autoresParsed.map((a: any) => ({
                name: a.nombre,
                affiliation: a.afiliacion,
                id_work: normalWork.id_work
            })),
        });
        console.log("autores creados");

		const name = session.user.name
		const email  = session.user.email

		if(!email)
			return NextResponse.json({ message: 'sesión sin un mail' }, { status: 400 });

		console.log("email: "+email);
		const send = await EmailService.sendWorkSubmissionConfirmation(
			email,
			name,
			title,
			category,
			premio
		)
		console.log("Resultado de enviar mail: "+send);

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error: unknown) {
    console.error('ERROR EN /api/trabajo:', error);

    let message = 'Error desconocido';

    if (error instanceof Error) {
        message = error.message;
    }

    return NextResponse.json(
        { success: false, message },
        { status: 500 }
    );
}

}

async function subirAGoogleDrive(fileBlob: Blob, filename: string, isPremio: boolean): Promise<string> {
    const arrayBuffer = await fileBlob.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString('base64');
    const response = await fetch('https://script.google.com/macros/s/AKfycbxcSNjmgBq8m5SiL3R4CdqeWOQFgFUm_-TVc_QNrYxKTtvsWqViOYHgVq0WgRanzmXFZw/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileName: filename,
            fileContent: base64File,
            isPremio: isPremio
        }),
    });

    const result = await response.json();

    if (!result.success) {
        console.error('Error al subir a Google Drive:', result.message);
        throw new Error('No se pudo subir el archivo a Google Drive');
    }

    return result.url; // La URL pública
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
    catch (error: unknown) {
    console.error('ERROR EN /api/trabajo:', error);

    let message = 'Error desconocido';

    // Verificamos que sea un Error válido
    if (error instanceof Error) {
        message = error.message;
    }

    return NextResponse.json(
        { success: false, message },
        { status: 500 }
    );
}
}