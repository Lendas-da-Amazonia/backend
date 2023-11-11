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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteSchema = exports.Favorite = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const myth_schema_1 = require("../../myth/schemas/myth.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
let Favorite = class Favorite {
};
exports.Favorite = Favorite;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Favorite.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: myth_schema_1.Myth.name }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Favorite.prototype, "myth", void 0);
exports.Favorite = Favorite = __decorate([
    (0, mongoose_1.Schema)({ collection: 'favorite' })
], Favorite);
exports.FavoriteSchema = mongoose_1.SchemaFactory.createForClass(Favorite);
//# sourceMappingURL=favorite.schema.js.map