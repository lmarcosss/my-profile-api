import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { parseCorsOrigin } from "./common/utils/cors.util";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: parseCorsOrigin(process.env.CORS_ORIGIN),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
