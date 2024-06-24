import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('Мед компания')
    .setDescription('API Мед компания')
    .setVersion('1.0')
    .addBearerAuth()
    .build()