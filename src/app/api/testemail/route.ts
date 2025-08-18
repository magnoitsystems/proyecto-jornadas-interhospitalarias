// Crea un archivo: app/api/test-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function GET(request: NextRequest) {
    try {
        console.log('🧪 Iniciando test de email...');

        const result = await EmailService.sendPasswordEmail(
            'anabellinzona@gmail.com', // Cambia por tu email
            'Usuario Test',
            'password123'
        );

        return NextResponse.json({
            success: result,
            message: result ? 'Email enviado correctamente' : 'Error al enviar email'
        });

    } catch (error) {
        console.error('Error en test:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}