import { NestFactory } from '@nestjs/core';
import { WorkplaceServiceModule } from './workplace-service.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkplaceServiceModule);
  const logger = new Logger('WorkplaceService');

  // Ensure our DTO validation works
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3003);

  logger.log(`🚀 Workplace Service is running on: http://localhost:3003`);
  logger.log(`🏥 Health Check: http://localhost:3003/health`);
}
bootstrap();
