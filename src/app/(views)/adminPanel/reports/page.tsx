import CSVGenerator from "@/components/CSVGenerator/CSVGenerator";

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Panel de Reportes
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Genera reportes estadísticos de la plataforma de jornadas médicas
                    </p>
                </div>

                <CSVGenerator className="mb-8" />

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Instrucciones de Uso</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Selecciona el tipo de reporte que deseas generar</li>
                        <li>Ajusta la cantidad de usuarios simulados (para pruebas)</li>
                        <li>Haz clic en Descargar Reporte CSV para obtener el archivo</li>
                        <li>El archivo se descargará automáticamente y podrás abrirlo en Excel</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}