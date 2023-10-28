"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = exports.InvalidStudentParametersException = exports.WrongPasswordException = exports.OldPasswordNotProvidedException = exports.EnrollmentAlreadyExistsException = exports.InvalidWhatsAppNumberException = exports.InvalidLinkedinURLException = exports.PasswordsDoNotMatchException = exports.PersonalDataInPasswordException = exports.InvalidEnrollmentException = exports.CourseNotFoundException = exports.ContactEmailAreadyExistsException = exports.EmailAreadyExistsException = exports.InvalidContactEmailException = exports.InvalidEmailException = exports.InvalidNameException = exports.MissingFieldsException = exports.UsedCodeException = exports.ExpiredCodeException = exports.InvalidTokenException = exports.InvalidCodeException = exports.InvalidPasswordException = exports.ValidResetPasswordTokenFoundException = exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
    constructor() {
        super();
        this.message = `Usuário(a) não encontrado(a)!`;
    }
}
exports.UserNotFoundException = UserNotFoundException;
class ValidResetPasswordTokenFoundException extends Error {
    constructor() {
        super();
        this.message = `Você já possui um token de resetar a senha válido!`;
    }
}
exports.ValidResetPasswordTokenFoundException = ValidResetPasswordTokenFoundException;
class InvalidPasswordException extends Error {
    constructor() {
        super();
        this.message = `A senha não atende aos padrões de senha do sistema!`;
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
class InvalidCodeException extends Error {
    constructor() {
        super();
        this.message = `O código presente no token é invalido!`;
    }
}
exports.InvalidCodeException = InvalidCodeException;
class InvalidTokenException extends Error {
    constructor() {
        super();
        this.message = `O token não é válido!`;
    }
}
exports.InvalidTokenException = InvalidTokenException;
class ExpiredCodeException extends Error {
    constructor() {
        super();
        this.message = `O código para resetar a senha expirou! `;
    }
}
exports.ExpiredCodeException = ExpiredCodeException;
class UsedCodeException extends Error {
    constructor() {
        super();
        this.message = `O código para resetar a senha já foi usado! `;
    }
}
exports.UsedCodeException = UsedCodeException;
class MissingFieldsException extends Error {
    constructor() {
        super();
        this.message = `Preencha todos os campos.`;
    }
}
exports.MissingFieldsException = MissingFieldsException;
class InvalidNameException extends Error {
    constructor() {
        super();
        this.message = `O nome deve ter no mínimo um nome, sobrenome e no máximo 50 caracteres.`;
    }
}
exports.InvalidNameException = InvalidNameException;
class InvalidEmailException extends Error {
    constructor() {
        super();
        this.message = `E-mail não é válido!`;
    }
}
exports.InvalidEmailException = InvalidEmailException;
class InvalidContactEmailException extends Error {
    constructor() {
        super();
        this.message = `E-mail de contato não é válido!`;
    }
}
exports.InvalidContactEmailException = InvalidContactEmailException;
class EmailAreadyExistsException extends Error {
    constructor() {
        super();
        this.message = `E-mail já cadastrado.`;
    }
}
exports.EmailAreadyExistsException = EmailAreadyExistsException;
class ContactEmailAreadyExistsException extends Error {
    constructor() {
        super();
        this.message = `E-mail de contato já cadastrado.`;
    }
}
exports.ContactEmailAreadyExistsException = ContactEmailAreadyExistsException;
class CourseNotFoundException extends Error {
    constructor() {
        super();
        this.message = `Curso não encontrado!`;
    }
}
exports.CourseNotFoundException = CourseNotFoundException;
class InvalidEnrollmentException extends Error {
    constructor() {
        super();
        this.message = `Matrícula não atende aos requisitos!`;
    }
}
exports.InvalidEnrollmentException = InvalidEnrollmentException;
class PersonalDataInPasswordException extends Error {
    constructor() {
        super();
        this.message = `A senha não deve conter dados pessoais como nome ou matricula.`;
    }
}
exports.PersonalDataInPasswordException = PersonalDataInPasswordException;
class PasswordsDoNotMatchException extends Error {
    constructor() {
        super();
        this.message = `As senhas não são iguais!`;
    }
}
exports.PasswordsDoNotMatchException = PasswordsDoNotMatchException;
class InvalidLinkedinURLException extends Error {
    constructor() {
        super();
        this.message = `Link do perfil do Linkedin não é compatível.`;
    }
}
exports.InvalidLinkedinURLException = InvalidLinkedinURLException;
class InvalidWhatsAppNumberException extends Error {
    constructor() {
        super();
        this.message = `Número do WhatsApp inválido.`;
    }
}
exports.InvalidWhatsAppNumberException = InvalidWhatsAppNumberException;
class EnrollmentAlreadyExistsException extends Error {
    constructor() {
        super();
        this.message = `Matrícula já cadastrada.`;
    }
}
exports.EnrollmentAlreadyExistsException = EnrollmentAlreadyExistsException;
class OldPasswordNotProvidedException extends Error {
    constructor() {
        super();
        this.message = `Para criar uma nova senha, a senha antiga deve ser fornecida.`;
    }
}
exports.OldPasswordNotProvidedException = OldPasswordNotProvidedException;
class WrongPasswordException extends Error {
    constructor() {
        super();
        this.message = `A senha informada não confere com os dados armazenados no sistema.`;
    }
}
exports.WrongPasswordException = WrongPasswordException;
class InvalidStudentParametersException extends Error {
    constructor(paramArray) {
        super();
        this.message =
            'Os seguintes parâmetros só podem ser usados para usuários do tipo Estudante:';
        paramArray.forEach((parameter) => {
            this.message += ` ${parameter};`;
        });
    }
}
exports.InvalidStudentParametersException = InvalidStudentParametersException;
class PermissionError extends Error {
    constructor() {
        super();
        this.message = 'Você não tem permissão para deletar este usuário!';
    }
}
exports.PermissionError = PermissionError;
//# sourceMappingURL=exceptions.js.map