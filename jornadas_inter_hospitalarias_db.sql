-- =========================================================================
-- SISTEMA DE GESTIÓN DE TRABAJOS ACADÉMICOS
-- PostgreSQL Database Schema
-- =========================================================================

-- Limpieza previa
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS works CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- =========================================================================
-- TABLA: User
-- =========================================================================
CREATE TABLE "user" (
                        id_user SERIAL PRIMARY KEY,
                        name VARCHAR(40) NOT NULL,
                        lastname VARCHAR(40) NOT NULL,
                        email VARCHAR(40) NOT NULL UNIQUE,
                        password VARCHAR(40) NOT NULL,
                        job VARCHAR(50) CHECK (job IN (
                                                       'medico',
                                                       'estudiante',
                                                       'enfermero',
                                                       'no perteneciente al área de la salud',
                                                       'kinesiólogo',
                                                       'fonoaudiólogo',
                                                       'técnico',
                                                       'otros'
                            )),
                        specialty VARCHAR(40),
                        admin BOOLEAN DEFAULT FALSE,
                        age INTEGER CHECK (age > 0 AND age < 150),
                        gender VARCHAR(40)
);

-- =========================================================================
-- TABLA: Works
-- =========================================================================
CREATE TABLE works (
                       id_work SERIAL PRIMARY KEY,
                       category VARCHAR(50) CHECK (category IN (
                                                                'investigación cualitativa',
                                                                'investigación cuantitativa',
                                                                'presentación de casos',
                                                                'relatos de experiencias'
                           )),
                       description TEXT CHECK (array_length(string_to_array(description, ' '), 1) <= 5000),
                       user_id INTEGER NOT NULL,
                       work_code VARCHAR(20) UNIQUE,
                       title VARCHAR(40),
                       file VARCHAR(255),

                       CONSTRAINT fk_works_user FOREIGN KEY (user_id)
                           REFERENCES "user"(id_user) ON DELETE CASCADE
);

-- =========================================================================
-- TABLA: Author
-- =========================================================================
CREATE TABLE author (
                        id_author SERIAL PRIMARY KEY,
                        name VARCHAR(40) NOT NULL,
                        lastname VARCHAR(40) NOT NULL,
                        affiliation VARCHAR(40),
                        id_work INTEGER NOT NULL,

                        CONSTRAINT fk_author_works FOREIGN KEY (id_work)
                            REFERENCES works(id_work) ON DELETE CASCADE
);


-- =========================================================================
-- DATOS DE PRUEBA
-- =========================================================================

-- Usuarios de prueba
INSERT INTO "user" (name, lastname, email, password, job, specialty, admin, age, gender) VALUES
                                                                                            ('Juan', 'Pérez', 'juan.perez@hospital.com', 'password123', 'medico', 'cardiología', false, 35, 'masculino'),
                                                                                            ('María', 'González', 'maria.gonzalez@universidad.edu', 'password456', 'estudiante', 'medicina', false, 22, 'femenino'),
                                                                                            ('Carlos', 'López', 'carlos.lopez@clinica.com', 'password789', 'enfermero', 'cuidados intensivos', false, 28, 'masculino'),
                                                                                            ('Ana', 'Martínez', 'ana.martinez@rehab.com', 'passwordabc', 'kinesiólogo', 'rehabilitación', false, 30, 'femenino'),
                                                                                            ('Luis', 'Rodríguez', 'luis.rodriguez@speech.com', 'passworddef', 'fonoaudiólogo', 'terapia del habla', false, 32, 'masculino');

-- Trabajos de prueba
INSERT INTO works (category, description, user_id, work_code, title, file) VALUES
                                                                               (
                                                                                   'investigación cuantitativa',
                                                                                   'Estudio sobre la efectividad de nuevos tratamientos cardiovasculares en pacientes con hipertensión arterial. Se analizaron 200 casos durante un período de 12 meses, evaluando la reducción de la presión arterial y los efectos secundarios de los medicamentos administrados.',
                                                                                   1,
                                                                                   'WK000001',
                                                                                   'Tratamientos Cardiovasculares',
                                                                                   'https://res.cloudinary.com/example/image/upload/v1234567890/cardiovascular_study.pdf'
                                                                               ),
                                                                               (
                                                                                   'presentación de casos',
                                                                                   'Presentación de un caso clínico de un paciente joven con arritmia cardíaca compleja, incluyendo el proceso diagnóstico, tratamiento aplicado y evolución del paciente durante 6 meses de seguimiento.',
                                                                                   1,
                                                                                   'WK000002',
                                                                                   'Caso Clínico: Arritmia Compleja',
                                                                                   'https://res.cloudinary.com/example/image/upload/v1234567891/case_study_arrhythmia.pdf'
                                                                               ),
                                                                               (
                                                                                   'investigación cualitativa',
                                                                                   'Análisis de las experiencias de estudiantes de medicina durante sus primeras prácticas clínicas. Se realizaron entrevistas en profundidad a 30 estudiantes para comprender sus percepciones, miedos y aprendizajes durante este período crítico de su formación.',
                                                                                   2,
                                                                                   'WK000003',
                                                                                   'Experiencias Estudiantiles en Práctica',
                                                                                   'https://res.cloudinary.com/example/image/upload/v1234567892/student_experiences.pdf'
                                                                               ),
                                                                               (
                                                                                   'relatos de experiencias',
                                                                                   'Relato de la experiencia trabajando en la unidad de cuidados intensivos durante la pandemia de COVID-19, incluyendo los desafíos enfrentados, protocolos implementados y lecciones aprendidas durante este período excepcional.',
                                                                                   3,
                                                                                   'WK000004',
                                                                                   'UCI Durante la Pandemia',
                                                                                   'https://res.cloudinary.com/example/image/upload/v1234567893/icu_pandemic_experience.pdf'
                                                                               ),
                                                                               (
                                                                                   'investigación cuantitativa',
                                                                                   'Evaluación de técnicas de rehabilitación motora en pacientes post-accidente cerebrovascular. Se compararon tres métodos diferentes de fisioterapia en 150 pacientes, midiendo la recuperación funcional a los 3, 6 y 12 meses.',
                                                                                   4,
                                                                                   'WK000005',
                                                                                   'Rehabilitación Post-ACV',
                                                                                   'https://res.cloudinary.com/example/image/upload/v1234567894/stroke_rehabilitation.pdf'
                                                                               );

-- Autores de prueba (DESPUÉS de insertar works)
INSERT INTO author (name, lastname, affiliation, id_work) VALUES
                                                              ('Juan', 'Pérez', 'Hospital Central', 1),
                                                              ('Dra. Elena', 'Vásquez', 'Universidad Nacional', 1),
                                                              ('Juan', 'Pérez', 'Hospital Central', 2),
                                                              ('María', 'González', 'Universidad de Medicina', 3),
                                                              ('Prof. Roberto', 'Silva', 'Facultad de Medicina', 3),
                                                              ('Carlos', 'López', 'Hospital San Juan', 4),
                                                              ('Enfermera Jefe Laura', 'Torres', 'Hospital San Juan', 4),
                                                              ('Ana', 'Martínez', 'Centro de Rehabilitación', 5),
                                                              ('Dr. Miguel', 'Herrera', 'Instituto Neurológico', 5),
                                                              ('Lic. Patricia', 'Morales', 'Centro de Rehabilitación', 5);