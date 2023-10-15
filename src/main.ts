import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Lendas da Amazonia')
    .setDescription(
      'API para o projeto Lendas da Amazônia - 2023 - Projeto de Engenharia de Software - UFAM',
    )
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      customJs:
        '[6](https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.0.0/swagger-ui-bundle.js)',
    },
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
