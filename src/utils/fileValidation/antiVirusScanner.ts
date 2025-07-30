import { exec } from 'child_process';
import { promisify } from 'util';

interface ScanResult {
	isClean: boolean;
	result: string;
	threatFound?: string;
}

export class AntivirusScanner {
	private static readonly execAsync = promisify(exec);

	static async scanPdfFile(filePath: string): Promise<ScanResult> {
		console.log('Iniciando escaneo antivirus de:', filePath);

		try {
			const { stdout, stderr } = await this.execAsync(`clamscan "${filePath}"`);

			console.log('Resultado clamscan:', stdout);

			if (stderr) {
				console.error('Warning en clamscan:', stderr);
			}

			if (stdout.includes('FOUND')) {
				const threatMatch = stdout.match(/(.+): (.+) FOUND/);
				const threatName = threatMatch ? threatMatch[2] : 'Amenaza desconocida';

				console.log('AMENAZA DETECTADA:', threatName);
				return {
					isClean: false,
					result: stdout,
					threatFound: threatName
				};
			} else if (stdout.includes('OK')) {
				console.log('Archivo limpio');
				return {
					isClean: true,
					result: stdout
				};
			} else {
				console.log('Resultado indeterminado');
				return {
					isClean: false,
					result: stdout,
					threatFound: 'Resultado de escaneo indeterminado'
				};
			}

		} catch (error) {
			console.error('Error ejecutando antivirus:', error);
			return {
				isClean: false,
				result: 'Error técnico',
				threatFound: 'No se pudo completar el escaneo'
			};
		}
	}

	static async isAntivirusAvailable(): Promise<boolean> {
		try {
			await this.execAsync('which clamscan');
			return true;
		} catch {
			return false;
		}
	}

	static async updateVirusDatabase(): Promise<boolean> {
		try {
			console.log('Actualizando base de datos de virus...');
			await this.execAsync('freshclam');
			console.log('Base de datos actualizada');
			return true;
		} catch (error) {
			console.error('Error actualizando base de datos:', error);
			return false;
		}
	}
}