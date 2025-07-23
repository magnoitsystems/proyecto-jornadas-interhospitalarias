import { CSVConfig } from "@/types/csv";

export class CSVConfigBuilder {

    private config : CSVConfig = {
        includeGender: false,
        includeSpecialty: false,
        includeProfession: false,
        healthOnly: false,
        format: 'readable'
    }

    constructor() {}

    public  includeGender(include : boolean) {
        this.config.includeGender = include;
        return this;
    }

    public  includeSpecialty(include : boolean) {
        this.config.includeSpecialty = include;
        return this;
    }

    public includeHealthOnly(include : boolean) {
        this.config.healthOnly = include;
        return this;
    }

    public includeProfesion(include : boolean) {
        this.config.includeProfession = include;
        return this;
    }

    public includeAll() {
        this.config.includeGender = true;
        this.config.includeSpecialty = true;
        this.config.includeProfession = true;
        this.config.healthOnly = false;
        return this;
    }

    public setFormat(format: 'readable' | 'compact') {
        this.config.format = format;
        return this;
    }

    public build() : CSVConfig {
        return {...this.config}; // Retorna una copia
    }
}