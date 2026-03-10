import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WorkerServiceModule } from './worker-service.module';
import { Transport } from '@nestjs/microservices'; // Add this

async function bootstrap() {
  const app = await NestFactory.create(WorkerServiceModule);

  // This connects our app to Redis so it can EMIT events
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.startAllMicroservices(); // Start the Redis listener
  await app.listen(3001);
  console.log(`Worker service is live and connected to Redis`);
}
bootstrap();
