import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { ValidationPipe } from "@nestjs/common";
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  }));
  
  await app.listen(3500);
}
bootstrap();