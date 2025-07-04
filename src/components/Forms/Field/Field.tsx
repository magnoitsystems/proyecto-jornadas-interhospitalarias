'use client';

import styles from './field.module.css';

interface FieldProps {
    label: string;
    type: 'text' | 'email' | 'date' | 'tel' | 'password';
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    name: string;
}

export default function Field({
                                  label,
                                  type,
                                  placeholder,
                                  value,
                                  onChange,
                                  required = false,
                                  name
                              }: FieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel} htmlFor={name}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required={required}
                className={styles.fieldInput}
            />
        </div>
    );
}
