"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validations = void 0;
class Validations {
    static capitalizeName(name) {
        return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
    }
    static validateName(name) {
        const re = /^(?! )[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ',. -]+([',. -][a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)+$/gm;
        return re.test(name);
    }
    static validatePassword(password) {
        if (password.length >= 8 && password.length <= 18)
            return true;
        return false;
    }
    static validateEmail(email) {
        const re = /^([\w.]{3,20})@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
        return re.test(email);
    }
    static validateEmailContact(email) {
        const re = /^([\w.-]{3,20})@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
        return re.test(email);
    }
    static validateEnrollment(enrollment) {
        const re = /^([\d]{8})$/gm;
        return re.test(enrollment);
    }
    static validateLinkedIn(linkedin) {
        if (linkedin.length == 0)
            return true;
        const re = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm;
        return re.test(linkedin);
    }
    static validateWhatsapp(whatsapp) {
        if (whatsapp.length == 0)
            return true;
        const re = /^([1-9]{1})(\d{10})$/gm;
        return re.test(whatsapp);
    }
    static searchNameEnrollmentPasswordTeacher(password, name) {
        if (password.indexOf(name) == -1)
            return true;
        return false;
    }
    static searchNameEnrollmentPassword(password, name, enrollment) {
        if (password.indexOf(name) == -1)
            return true;
        if (password.indexOf(enrollment) == -1)
            return true;
        return false;
    }
    static validateConfirmPassword(password, confirm_password) {
        if (password == confirm_password)
            return true;
        return false;
    }
}
exports.Validations = Validations;
//# sourceMappingURL=validations.js.map