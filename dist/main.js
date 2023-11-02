"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(body_parser_1.default.json({ limit: '50mb' }));
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
    app.enableCors({
        origin: '*',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lendas da Amazonia')
        .setDescription('API para o projeto Lendas da Amazônia - 2023 - Projeto de Engenharia de Software - UFAM')
        .setVersion('1.0')
        .addTag('Lendas da Amazônia')
        .addBearerAuth({
        description: 'Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document, {
        customSiteTitle: 'Backend Lendas da Amazônia',
        customfavIcon: 'https://avatars.githubusercontent.com/u/143668025?s=400&u=58fdf45f5ed414145aef0a9f849d75bea139e33e&v=4',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
        ],
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map