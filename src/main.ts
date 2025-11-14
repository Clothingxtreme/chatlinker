import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, RequestMethod } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // All routes under /api/*
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 5000);
  console.log(`🚀 Nest listening on http://localhost:${process.env.PORT || 5000}`);
  console.log(`✅ Root:   http://localhost:${process.env.PORT || 5000}/`);
  console.log(`✅ Health: http://localhost:${process.env.PORT || 5000}/api/health`);
}
bootstrap();
