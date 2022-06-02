import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Logger //
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Logger //
  const logger = new Logger('MAIN TS');

  // APPLICATION START
  const app = await NestFactory.create(AppModule);

  // SETUP CORS
  app.enableCors();

  app.setGlobalPrefix('api/v1');

  // SETUP SERVER PORT
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
