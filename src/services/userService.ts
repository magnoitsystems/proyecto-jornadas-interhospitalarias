import { CreateUserData } from '@/types/user';
import { ValidationResult } from '@/types/validation';
import { UserValidationService } from '@/utils/userValidations';
import bcrypt from 'bcryptjs';

export class UserService {
    private validator: UserValidationService;

    constructor() {
        this.validator = new UserValidationService();
    }

    public async validateUser(userData: CreateUserData): Promise<{
        success: boolean;
        user?: CreateUserData;
        errors?: string[];
    }> {
        try {
            const validationResult: ValidationResult = this.validator.validateUser(userData);

            if (!validationResult.isValid) {
                return {
                    success: false,
                    errors: validationResult.errors.map(error => `${error.field}: ${error.message}`)
                };
            }

            const emailExists = await this.checkEmailExists(userData.email);
            if (emailExists) {
                return {
                    success: false,
                    errors: ['El email ya está registrado en el sistema']
                };
            }

            const passwordgenerator = new PasswordGenerator();
            const password = passwordgenerator.generatePassword();
            const hashedPassword = await bcrypt.hash(password, 12);

            const userToInsert : CreateUserData = {
                name: userData.name.trim(),
                lastname: userData.lastname.trim(),
                email: userData.email.toLowerCase().trim(),
                password: hashedPassword,
                job: userData.job,
                specialty: userData.specialty?.trim() || null,
                admin: userData.admin || false,
                age: userData.age,
                gender: userData.gender.toLowerCase()
            };

            return {
                success: true,
                user: userToInsert
            };

        } catch (error) {
            console.error('Error creating user:', error);
            return {
                success: false,
                errors: ['Error interno del servidor al crear el usuario']
            };
        }
    }

    private async checkEmailExists(email: string): Promise<boolean> {
        // TODO: Implementar con Prisma cuando esté configurado        console.log(email)
        return false;
    }

    private generatePassword() {

    }
}