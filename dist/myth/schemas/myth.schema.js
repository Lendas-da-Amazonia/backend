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
exports.MythSchema = exports.Myth = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Myth = class Myth {
};
exports.Myth = Myth;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Myth.prototype, "id_autor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Myth.prototype, "titulo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Myth.prototype, "texto", void 0);
exports.Myth = Myth = __decorate([
    (0, mongoose_1.Schema)({ collection: 'lendas' })
], Myth);
exports.MythSchema = mongoose_1.SchemaFactory.createForClass(Myth);
//# sourceMappingURL=myth.schema.js.map