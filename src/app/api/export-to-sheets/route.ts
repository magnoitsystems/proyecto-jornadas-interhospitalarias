import { auth } from '@/auth';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    console.log('🚀 Iniciando exportación a Google Sheets...');
    console.log('👤 Usuario:', session.user.id, session.user.email);

    // Obtener todos los datos de works con sus autores
    const worksWithAuthors = await prisma.works.findMany({
      include: {
        author: true,
      },
      orderBy: {
        id_work: 'desc'
      }
    });

    console.log('📚 Trabajos encontrados:', worksWithAuthors.length);

    if (worksWithAuthors.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No hay trabajos para exportar'
      }, { status: 404 });
    }

    // Formatear los datos para Google Sheets
    const formattedData = formatDataForSheets(worksWithAuthors);
    console.log('✏️  Datos formateados - Filas:', formattedData.length, 'Columnas:', formattedData[0]?.length);

    // Enviar a Google Apps Script
    const exportResult = await sendToGoogleSheets(formattedData);

    console.log('📤 Resultado final de exportación:', exportResult);

    if (exportResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Datos exportados exitosamente',
        sheetUrl: exportResult.sheetUrl,
        recordCount: worksWithAuthors.length
      });
    } else {
      return NextResponse.json({
        success: false,
        message: exportResult.message || 'Error al exportar'
      }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('💥 ERROR COMPLETO en exportación:', error);
    
    let message = 'Error desconocido en la exportación';
    if (error instanceof Error) {
      message = error.message;
      console.error('📋 Stack trace:', error.stack);
    }

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

// Función para formatear los datos
function formatDataForSheets(works: any[]) {
  // Encabezados
  const headers = [
    'ID',
    'Título',
    'Categoría', 
    'Descripción',
    'Código de Trabajo',
    'Archivo Principal',
    'A Premio',
    'Texto Adicional',
    'ID Usuario',
    'Autores',
    'Afiliaciones',
    'Fecha Creación'
  ];

  // Filas de datos
  const rows = works.map(work => {
    // Concatenar autores y afiliaciones
    const autores = work.author?.map((a: any) => a.name).join('; ') || 'Sin autores';
    const afiliaciones = work.author?.map((a: any) => a.affiliation).join('; ') || 'Sin afiliaciones';
    
    return [
      work.id_work,
      work.title,
      work.category,
      work.description,
      work.work_code,
      work.file,
      work.prize ? 'Sí' : 'No',
      work.additional_text || 'No disponible',
      work.user_id,
      autores,
      afiliaciones,
      work.created_at ? new Date(work.created_at).toLocaleString('es-AR') : 'No disponible'
    ];
  });

  return [headers, ...rows];
}

// Función para enviar a Google Sheets
async function sendToGoogleSheets(data: any[][]) {
  try {
    console.log('📤 Enviando datos a Google Sheets...');
    console.log('📊 Cantidad de filas:', data.length);
    console.log('🔗 URL del script:', 'https://script.google.com/macros/s/AKfycbxTmXuXM__bkTnkJGB3l_yGzUGZVs-Pk8QitQBE0D1COeqhS5dkzV5x6sCVFJM-4m3KmA/exec');
    
    const payload = {
      action: 'exportWorks',
      data: data,
      sheetName: `Trabajos_${new Date().toISOString().split('T')[0]}`
    };
    
    console.log('📦 Payload enviado:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://script.google.com/macros/s/AKfycbxTmXuXM__bkTnkJGB3l_yGzUGZVs-Pk8QitQBE0D1COeqhS5dkzV5x6sCVFJM-4m3KmA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 Status de respuesta:', response.status);
    console.log('📡 Headers de respuesta:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error en respuesta HTTP:', errorText);
      return {
        success: false,
        message: `Error HTTP ${response.status}: ${errorText}`
      };
    }

    const result = await response.json();
    console.log('✅ Respuesta completa de Google:', result);
    return result;

  } catch (error) {
    console.error('❌ Error completo al enviar a Google Sheets:', error);
    
    // Más detalles del error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Error de red: No se pudo conectar con Google Apps Script'
      };
    }
    
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return {
        success: false,
        message: 'Error: Google Apps Script retornó una respuesta inválida'
      };
    }
    
    return {
      success: false,
      message: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
}