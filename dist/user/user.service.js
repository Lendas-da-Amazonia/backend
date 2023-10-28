"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const validations_1 = require("../utils/validations");
const exceptions_1 = require("./utils/exceptions");
const bcrypt_1 = require("../utils/bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async listarUser() {
        try {
            const encontrados = await this.userModel.find({});
            const total = await this.userModel.find({}).count();
            return { message: `${total} user cadastrados`, encontrados };
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    async cadastrarUser(createUserDto) {
        if (!validations_1.Validations.validateEmail(createUserDto.email)) {
            throw new exceptions_1.InvalidEmailException();
        }
        if (!validations_1.Validations.validatePassword(createUserDto.senha)) {
            throw new exceptions_1.InvalidPasswordException();
        }
        if (!validations_1.Validations.validateName(createUserDto.nome)) {
            throw new exceptions_1.InvalidNameException();
        }
        const email_exists = await this.findOneByEmail(createUserDto.email);
        if (email_exists)
            throw new exceptions_1.EmailAreadyExistsException();
        await this.userModel.create({
            email: createUserDto.email,
            nome: validations_1.Validations.capitalizeName(createUserDto.nome),
            senha: await (0, bcrypt_1.hashPassword)(createUserDto.senha),
            role: 'user',
        });
        return { status: 201, message: 'Cadastrado com sucesso!' };
    }
    async encontrarUser(nome) {
        try {
            const userProcurado = await this.userModel.findOne({ nome });
            return { message: `Usuário: ${userProcurado.nome} encontrado.` };
        }
        catch (e) {
            throw new Error('Usuário não encontrado');
        }
    }
    async encontrarUserByID(_id) {
        try {
            const buscado = await this.userModel.findOne({ _id: _id });
            return { message: `Usuário foi encontrado`, buscado };
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.userModel.findOne({ email });
        }
        catch (e) {
            throw new Error('Usuário não encontrado');
        }
    }
    async deletarUser(id, user) {
        const permission = await this.checkPermission(id, user._id, user.role);
        if (!permission) {
            throw new exceptions_1.PermissionError();
        }
        const userTemp = await this.userModel.findOneAndDelete({ _id: id });
        return { message: `Usuário ${userTemp.nome} foi deletado.` };
    }
    async checkPermission(id, user_id, user_role) {
        if (user_role == 'admin') {
            return true;
        }
        if (user_id == id) {
            return true;
        }
        return false;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map