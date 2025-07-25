export class PasswordGenerator {
    private readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    private readonly NUMBERS = '0123456789';

     generatePassword(length: number = 12): string {
        if (length < 6 || length > 50) {
            throw new Error('Length must be between 6 and 50 characters');
        }

        const characters = this.UPPERCASE + this.LOWERCASE + this.NUMBERS;
        return this.createSecurePassword(characters, length);
    }

    private  createSecurePassword(characters: string, length: number): string {
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        let password = Array.from(array, num => characters[num % characters.length]).join('');

        return this.ensureAllTypes(password);
    }

    private  ensureAllTypes(password: string): string {
        const chars = password.split('');

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasUpper) {
            chars[0] = this.UPPERCASE[Math.floor(Math.random() * this.UPPERCASE.length)];
        }
        if (!hasLower) {
            chars[1] = this.LOWERCASE[Math.floor(Math.random() * this.LOWERCASE.length)];
        }
        if (!hasNumber) {
            chars[2] = this.NUMBERS[Math.floor(Math.random() * this.NUMBERS.length)];
        }

        return chars.join('');
    }
}

module.exports = { PasswordGenerator };