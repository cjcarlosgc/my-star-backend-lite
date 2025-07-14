import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // 🔓 Permite todos los orígenes (¡no recomendado en producción!)
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
