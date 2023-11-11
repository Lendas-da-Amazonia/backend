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
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const favorite_service_1 = require("./favorite.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const favorite_myth_dto_1 = require("./dto/favorite-myth.dto");
const exception_1 = require("./utils/exception");
let FavoriteController = class FavoriteController {
    constructor(favoriteService, jwtService) {
        this.favoriteService = favoriteService;
        this.jwtService = jwtService;
    }
    async getFavorites(req) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        return await this.favoriteService.getFavorites(user._id);
    }
    async favoriteOrUnfavorite(req, favoriteMythDto) {
        const token = req.headers.authorization.toString().replace('Bearer ', '');
        const user = this.jwtService.decode(token);
        try {
            return await this.favoriteService.favoriteOrUnfavorite(user._id, favoriteMythDto.mythId);
        }
        catch (error) {
            if (error instanceof exception_1.MythNotExistsException) {
                throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Rota para listar todas as lendas favoritadas' }),
    (0, common_1.Get)('my-favorites'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Rota recebe Id para favoritar ou desfavoritar',
    }),
    (0, common_1.Post)('favorite-or-unfavorite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, favorite_myth_dto_1.FavoriteMythDto]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "favoriteOrUnfavorite", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, swagger_1.ApiTags)('Favorite'),
    (0, common_1.Controller)('favorite'),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService,
        jwt_1.JwtService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map