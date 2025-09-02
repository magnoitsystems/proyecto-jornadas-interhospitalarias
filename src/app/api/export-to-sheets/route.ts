import { auth } from '@/auth';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Verificar autenticación (opcional: agregar verificación de permisos)
    if (!session || !session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    console.log('Iniciando exportación a Google Sheets...');

    // Obtener todos los datos de works con sus autores
    const worksWithAuthors = await prisma.works.findMany({
      include: {
        author: true, // Incluir los autores relacionados
      },
      orderBy: {
        id_work: 'desc' // Ordenar por más recientes primero
      }
    });

    // Formatear los datos para Google Sheets
    const formattedData = formatDataForSheets(worksWithAuthors);

    // Enviar a Google Apps Script
    const exportResult = await sendToGoogleSheets(formattedData);

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
    console.error('ERROR en exportación:', error);
    
    let message = 'Error desconocido en la exportación';
    if (error instanceof Error) {
      message = error.message;
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
    const response = await fetch('https://script.google.com/macros/s/AKfycbxTmXuXM__bkTnkJGB3l_yGzUGZVs-Pk8QitQBE0D1COeqhS5dkzV5x6sCVFJM-4m3KmA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'exportWorks',
        data: data,
        sheetName: `Trabajos_${new Date().toISOString().split('T')[0]}` // Nombre con fecha
      }),
    });

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error al enviar a Google Sheets:', error);
    return {
      success: false,
      message: 'Error de conexión con Google Sheets'
    };
  }
}