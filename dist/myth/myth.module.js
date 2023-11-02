"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MythModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const myth_controller_1 = require("./myth.controller");
const myth_service_1 = require("./myth.service");
const myth_schema_1 = require("./schemas/myth.schema");
const jwt_strategy_1 = require("../auth/strategies/jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
let MythModule = class MythModule {
};
exports.MythModule = MythModule;
exports.MythModule = MythModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: myth_schema_1.Myth.name, schema: myth_schema_1.MythSchema }]),
            jwt_1.JwtModule,
        ],
        controllers: [myth_controller_1.MythController],
        providers: [myth_service_1.MythService, jwt_strategy_1.JwtStrategy],
        exports: [mongoose_1.MongooseModule],
    })
], MythModule);
//# sourceMappingURL=myth.module.js.map