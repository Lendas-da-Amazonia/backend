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
exports.MythService = void 0;
const mongoose_1 = require("mongoose");
const myth_schema_1 = require("./schemas/myth.schema");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("./utils/exceptions");
let MythService = class MythService {
    constructor(mythModel) {
        this.mythModel = mythModel;
    }
    async listarMyth() {
        const myths = await this.mythModel.find({});
        const total = await this.mythModel.find({}).count();
        return { message: `${total} lendas encontradas`, myths };
    }
    async createMyth(myth, user) {
        if (!myth.titulo) {
            throw new common_1.PreconditionFailedException('Titulo não pode ser vazio');
        }
        if (!myth.texto) {
            throw new common_1.PreconditionFailedException('Texto não pode ser vazio');
        }
        const now = new Date();
        const AMT_OFFSET = -4;
        now.setHours(now.getHours() + AMT_OFFSET);
        const createdMyth = new this.mythModel({
            id_autor: user._id,
            nome_autor: user.username,
            email_autor: user.email,
            created_at: now,
            titulo: myth.titulo,
            texto: myth.texto,
            imagem: myth.imagem,
        });
        return createdMyth.save();
    }
    async findMythByID(_id) {
        return this.mythModel.findOne({ _id }).exec();
    }
    async findMythByAuthorID(id_autor) {
        try {
            const mitosDoUser = await this.mythModel.find({ id_autor });
            console.log(mitosDoUser);
            const quantidade = await this.mythModel.find({ id_autor }).count();
            return {
                message: `Foram encontrados ${quantidade} lenda(s).`,
                mitosDoUser,
            };
        }
        catch (e) {
            throw new Error('Usuário não encontrado');
        }
    }
    async editMyth(_id, myth, user) {
        if (_id.length != 24) {
            throw new exceptions_1.MythNotFound();
        }
        const mythExists = await this.mythModel.findOne({ _id: _id });
        if (!mythExists) {
            throw new exceptions_1.MythNotFound();
        }
        const permission = await this.checkPermission(mythExists.id_autor, user._id, user.role);
        if (!permission) {
            throw new exceptions_1.PermissionError();
        }
        if (myth.titulo != null) {
            mythExists.titulo = myth.titulo;
        }
        if (myth.texto != null) {
            mythExists.texto = myth.texto;
        }
        if (myth.imagem != null) {
            mythExists.imagem = myth.imagem;
        }
        mythExists.save();
        return { status: 201, message: 'Lenda editada com sucesso!' };
    }
    async deleteMyth(_id, user) {
        if (_id.length != 24) {
            throw new exceptions_1.MythNotFound();
        }
        const myth = await this.mythModel.findOne({ _id: _id });
        if (!myth) {
            throw new exceptions_1.MythNotFound();
        }
        const permission = await this.checkPermission(myth.id_autor, user._id, user.role);
        if (!permission) {
            throw new exceptions_1.PermissionError();
        }
        await this.mythModel.findOneAndDelete({ _id: _id }).exec();
        return { message: `Lenda ${myth.titulo} foi deletada.` };
    }
    async checkPermission(id, user_id, user_role) {
        if (user_role == 'admin') {
            return true;
        }
        if (user_id == id) {
            return true;
        }
        else {
            return false;
        }
    }
    async findMythByWord(word) {
        try {
            const myths = await this.mythModel.find({
                $or: [
                    { titulo: { $regex: word, $options: 'i' } },
                    { texto: { $regex: word, $options: 'i' } },
                ],
            });
            const total = await this.mythModel
                .find({
                $or: [
                    { titulo: { $regex: word, $options: 'i' } },
                    { texto: { $regex: word, $options: 'i' } },
                ],
            })
                .count();
            return { message: `${total} lendas encontradas`, myths };
        }
        catch (e) {
            throw new Error('Lenda não encontrada');
        }
    }
};
exports.MythService = MythService;
exports.MythService = MythService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(myth_schema_1.Myth.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MythService);
//# sourceMappingURL=myth.service.js.map