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
exports.MythController = void 0;
const common_1 = require("@nestjs/common");
const myth_service_1 = require("./myth.service");
const create_myth_dto_1 = require("./dto/create-myth.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MythController = class MythController {
    constructor(mythService, jwtService) {
        this.mythService = mythService;
        this.jwtService = jwtService;
    }
    async listarMyth() {
        return this.mythService.listarMyth();
    }
    async cadastrarMyth(req, createMythDto) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        return this.mythService.createMyth(createMythDto, user._id);
    }
    async encontrarMythByID(_id) {
        return this.mythService.findMythByID(_id);
    }
    async encontrarMythByAuthor(_id) {
        return this.mythService.findMythByAuthorID(_id);
    }
    async deletarMythByID(_id) {
        return this.mythService.deleteMyth(_id);
    }
};
exports.MythController = MythController;
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Rota para listar todas as lendas.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MythController.prototype, "listarMyth", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Rota para criar lenda' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_myth_dto_1.CreateMythDto]),
    __metadata("design:returntype", Promise)
], MythController.prototype, "cadastrarMyth", null);
__decorate([
    (0, common_1.Get)(':_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MythController.prototype, "encontrarMythByID", null);
__decorate([
    (0, common_1.Get)('/author/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MythController.prototype, "encontrarMythByAuthor", null);
__decorate([
    (0, common_1.Delete)('delete/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MythController.prototype, "deletarMythByID", null);
exports.MythController = MythController = __decorate([
    (0, swagger_1.ApiTags)('Myth'),
    (0, common_1.Controller)('myth'),
    __metadata("design:paramtypes", [myth_service_1.MythService,
        jwt_1.JwtService])
], MythController);
//# sourceMappingURL=myth.controller.js.map