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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const edit_comment_dto_1 = require("./dto/edit-comment.dto");
const comment_service_1 = require("./comment.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const exceptions_1 = require("./dto/utils/exceptions");
let CommentController = class CommentController {
    constructor(commentService, jwtService) {
        this.commentService = commentService;
        this.jwtService = jwtService;
    }
    async listarComentarios(mythId) {
        return this.commentService.findCommentsByMythId(mythId);
    }
    async listarMeusComentarios(req) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        return this.commentService.findOneCommentById(user._id);
    }
    async createComment(req, createCommentDto) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        try {
            return this.commentService.createComment(createCommentDto, user._id);
        }
        catch (error) {
            if (error instanceof exceptions_1.MythNotExistsException) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
    async editComment(commentId, data, req) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        try {
            return this.commentService.editCommentById(commentId, data, user._id, user.role);
        }
        catch (error) {
            if (error instanceof exceptions_1.CommentNotExistsException || exceptions_1.PermissionError) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
    async deleteComment(commentId, req) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        try {
            return this.commentService.deleteCommentById(commentId, user._id);
        }
        catch (error) {
            if (error instanceof exceptions_1.CommentNotExistsException) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Rota para listar comentários de uma lenda' }),
    (0, common_1.Get)('myth/:mythId'),
    __param(0, (0, common_1.Param)('mythId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "listarComentarios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Rota para listar meus comentários' }),
    (0, common_1.Get)('my-comments'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "listarMeusComentarios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Rota para postar um comentário na lenda' }),
    (0, common_1.Post)(':mythId/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Rota para editar um comentário' }),
    (0, common_1.Patch)(':commentId/edit'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_comment_dto_1.EditCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "editComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Rota para deletar um comentário na lenda' }),
    (0, common_1.Delete)(':commentId/delete'),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)('Comment'),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        jwt_1.JwtService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map