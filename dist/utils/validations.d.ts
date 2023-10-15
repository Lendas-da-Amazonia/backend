export declare class Validations {
    static capitalizeName(name: string): string;
    static validateName(name: string): boolean;
    static validatePassword(password: string): boolean;
    static validateEmail(email: string): boolean;
    static validateEmailContact(email: string): boolean;
    static validateEnrollment(enrollment: string): boolean;
    static validateLinkedIn(linkedin: string): boolean;
    static validateWhatsapp(whatsapp: string): boolean;
    static searchNameEnrollmentPasswordTeacher(password: string, name: string): boolean;
    static searchNameEnrollmentPassword(password: string, name: string, enrollment: string): boolean;
    static validateConfirmPassword(password: string, confirm_password: string): boolean;
}
