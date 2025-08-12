// src/utils/PasswordGenerator.ts

export class PasswordGenerator {
    private readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    private readonly NUMBERS = '0123456789';

    public generatePassword(length: number = 12): string {
        if (length < 6 || length > 50) {
            throw new Error('La longitud debe ser entre 6 y 50 caracteres');
        }

        const characters = this.UPPERCASE + this.LOWERCASE + this.NUMBERS;
        return this.createSecurePassword(characters, length);
    }

    private createSecurePassword(characters: string, length: number): string {
        // crypto.getRandomValues está disponible globalmente en Vercel (Node.js moderno) y navegadores
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        const password = Array.from(array, num => characters[num % characters.length]).join('');

        return this.ensureAllTypes(password);
    }

    private ensureAllTypes(password: string): string {
        const chars = password.split('');

        // Comprobamos si cada tipo de caracter ya está presente
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        // Si falta algún tipo, lo insertamos en una posición aleatoria para no ser predecibles
        if (!hasUpper && chars.length > 0) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            chars[randomIndex] = this.UPPERCASE[Math.floor(Math.random() * this.UPPERCASE.length)];
        }
        if (!hasLower && chars.length > 0) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            // Aseguramos no sobreescribir la mayúscula que acabamos de poner
            if(/[A-Z]/.test(chars[randomIndex])) {
                chars[(randomIndex + 1) % chars.length] = this.LOWERCASE[Math.floor(Math.random() * this.LOWERCASE.length)];
            } else {
                chars[randomIndex] = this.LOWERCASE[Math.floor(Math.random() * this.LOWERCASE.length)];
            }
        }
        if (!hasNumber && chars.length > 0) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            chars[randomIndex] = this.NUMBERS[Math.floor(Math.random() * this.NUMBERS.length)];
        }

        return chars.join('');
    }
}