import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ShiftServiceModule } from './shift-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ShiftServiceModule);

  // 👂 This is the "Ear" that catches the worker_created event
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  });

  await app.startAllMicroservices(); // Start the Redis listener
  await app.listen(3002); // Start the HTTP API
  console.log('🚀 Shift Service is listening on Port 3002 and Redis');
}
bootstrap();
