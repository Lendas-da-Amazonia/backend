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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const myth_schema_1 = require("../myth/schemas/myth.schema");
const favorite_schema_1 = require("./schemas/favorite.schema");
const exception_1 = require("./utils/exception");
let FavoriteService = class FavoriteService {
    constructor(favoriteModel, mythModel) {
        this.favoriteModel = favoriteModel;
        this.mythModel = mythModel;
    }
    async favoriteOrUnfavorite(id_user, id_myth) {
        const myth = await this.mythModel.findOne({ _id: id_myth });
        if (!myth) {
            throw new exception_1.MythNotExistsException();
        }
        const favorite = await this.favoriteModel.findOne({
            user: id_user,
            myth: id_myth,
        });
        if (favorite) {
            await this.favoriteModel.deleteOne({ user: id_user, myth: id_myth });
            return { status: 200, message: 'Lenda desfavoritada com sucesso!' };
        }
        await this.favoriteModel.create({
            user: id_user,
            myth: id_myth,
        });
        return { status: 201, message: 'Lenda favoritada com sucesso!' };
    }
    async getFavorites(id_user) {
        return await this.favoriteModel.find({ user: id_user }).populate('myth');
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(favorite_schema_1.Favorite.name)),
    __param(1, (0, mongoose_1.InjectModel)(myth_schema_1.Myth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map