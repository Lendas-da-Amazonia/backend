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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const is_public_decorator_1 = require("../auth/decorators/is-public.decorator");
const exceptions_1 = require("./utils/exceptions");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async listarUser() {
        return this.userService.listarUser();
    }
    async cadastrarUser(createUserDto) {
        try {
            return await this.userService.cadastrarUser(createUserDto);
        }
        catch (error) {
            if (error instanceof exceptions_1.InvalidEmailException ||
                error instanceof exceptions_1.InvalidPasswordException ||
                error instanceof exceptions_1.InvalidNameException ||
                error instanceof exceptions_1.EmailAreadyExistsException) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
    async encontrarUserByID(_id) {
        return this.userService.encontrarUserByID(_id);
    }
    async deletarUser(id, req) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        try {
            return await this.userService.deletarUser(id, user);
        }
        catch (error) {
            if (error instanceof exceptions_1.PermissionError) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
    async atualizarRole(id, req) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        try {
            return await this.userService.atualizarRole(id, user);
        }
        catch (error) {
            if (error instanceof exceptions_1.PermissionError) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Rota para listar todos os usuários.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listarUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Rota para criar usuário' }),
    (0, common_1.Post)('create'),
    (0, is_public_decorator_1.IsPublic)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "cadastrarUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Rota para buscar usuário por id' }),
    (0, common_1.Get)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "encontrarUserByID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deletarUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)('promote/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "atualizarRole", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map