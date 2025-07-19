import { CreateUserData, Gender, JobType } from '@/types/user';
import { ValidationError, ValidationResult } from "@/types/validation";

const minimumAge = 18;

export class UserValidationService {
    private errors: ValidationError[] = [];

    public validateUser(userData: CreateUserData): ValidationResult {
        this.errors = [];

        this.validateName(userData.name);
        this.validateLastname(userData.lastname);
        this.validateEmail(userData.email);
        this.validatePassword(userData.password);
        this.validateJob(userData.job);
        this.validateSpecialty(userData.specialty);
        this.validateAge(userData.age);
        this.validateGender(userData.gender);

        return {
            isValid: this.errors.length === 0,
            errors: this.errors
        };
    }

    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            this.addError('name', 'El nombre es obligatorio');
            return;
        }

        if (name.trim().length > 40) {
            this.addError('name', 'El nombre no puede exceder 40 caracteres');
            return;
        }

        if (name.trim().length < 2) {
            this.addError('name', 'El nombre debe tener al menos 2 caracteres');
            return;
        }

        const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;
        if (!nameRegex.test(name.trim())) {
            this.addError('name', 'El nombre solo puede contener letras y espacios');
        }
    }

    private validateLastname(lastname: string): void {
        if (!lastname || lastname.trim().length === 0) {
            this.addError('lastname', 'El apellido es obligatorio');
            return;
        }

        if (lastname.trim().length > 40) {
            this.addError('lastname', 'El apellido no puede exceder 40 caracteres');
            return;
        }

        if (lastname.trim().length < 2) {
            this.addError('lastname', 'El apellido debe tener al menos 2 caracteres');
            return;
        }

        const lastnameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;
        if (!lastnameRegex.test(lastname.trim())) {
            this.addError('lastname', 'El apellido solo puede contener letras y espacios');
        }
    }

    private validateEmail(email: string): void {
        if (!email || email.trim().length === 0) {
            this.addError('email', 'El email es obligatorio');
            return;
        }

        if (email.length > 40) {
            this.addError('email', 'El email no puede exceder 40 caracteres');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            this.addError('email', 'El formato del email no es válido');
        }
    }

    private validatePassword(password: string): void {
        if (!password || password.length === 0) {
            this.addError('password', 'La contraseña es obligatoria');
            return;
        }

        if (password.length > 40) {
            this.addError('password', 'La contraseña no puede exceder 40 caracteres');
            return;
        }

        if (password.length < 8) {
            this.addError('password', 'La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (!/[a-z]/.test(password)) {
            this.addError('password', 'La contraseña debe contener al menos una letra minúscula');
        }

        if (!/[A-Z]/.test(password)) {
            this.addError('password', 'La contraseña debe contener al menos una letra mayúscula');
        }

        if (!/\d/.test(password)) {
            this.addError('password', 'La contraseña debe contener al menos un número');
        }
    }

    private validateJob(job: string): void {

        if (!job || job.trim().length === 0) {
            this.addError('job', 'La profesión es obligatoria');
            return;
        }

        if (!Object.values(JobType).includes(job as JobType)) {
            this.addError('job', `La profesión debe ser una de: ${Object.values(JobType).join(', ')}`);
        }
    }

    private validateSpecialty(specialty: string | undefined): void {
        if (!specialty) return;

        if (specialty.trim().length === 0) {
            return;
        }

        if (specialty.length > 40) {
            this.addError('specialty', 'La especialidad no puede exceder 40 caracteres');
            return;
        }
    }

    private validateAge(age: number): void {
        if (age === undefined || age === null || isNaN(age)) {
            this.addError('age', 'La edad es obligatoria');
            return;
        }

        if (age >= 125) {
            this.addError('age', 'La edad debe ser menor a 125 años');
            return;
        }

        if (age < minimumAge) {
            this.addError('age', `La edad mínima para profesionales de la salud es ${minimumAge} años`);
        }
    }

    private validateGender(gender: string): void {
        if (!gender || gender.trim().length === 0) {
            this.addError('gender', 'El género es obligatorio');
            return;
        }


        if (!Object.values(Gender).includes(gender.toLowerCase() as Gender)) {
            this.addError('gender', `El género debe ser uno de: ${Object.values(Gender).join(', ')}`);
        }
    }

    private addError(field: string, message: string): void {
        this.errors.push({ field, message });
    }
}