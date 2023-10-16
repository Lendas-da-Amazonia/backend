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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const mongoose_2 = require("mongoose");
const exceptions_1 = require("./dto/utils/exceptions");
const myth_schema_1 = require("../myth/schemas/myth.schema");
let CommentService = class CommentService {
    constructor(commentModel, mythModel) {
        this.commentModel = commentModel;
        this.mythModel = mythModel;
    }
    async findAll() {
        return await this.commentModel.find();
    }
    async createComment(comment, user_id) {
        if (!comment.text) {
            throw new Error('Texto não pode ser vazio');
        }
        if (!comment.mythId) {
            throw new Error('ID da lenda não pode ser vazio');
        }
        const mythIdExists = await this.findOneByTitle(comment.mythId);
        console.log(mythIdExists);
        if (!mythIdExists) {
            throw new exceptions_1.MythNotExistsException();
        }
        await this.commentModel.create({
            id_user: user_id,
            id_myth: comment.mythId,
            text: comment.text,
        });
        return { status: 201, message: 'Comentário criado com sucesso!' };
    }
    async findOneByTitle(title) {
        console.log(title);
        try {
            return await this.mythModel.findOne({ title });
        }
        catch (e) {
            throw new Error('Lenda não encontrada aqui');
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(myth_schema_1.Myth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentService);
//# sourceMappingURL=comment.service.js.map