import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Workplace } from './entities/workplace.entity';
import { WorkplaceServiceController } from './workplace-service.controller';
import { WorkplaceServiceService } from './workplace-service.service';
import { HealthModule } from './health/health.module'; // Import your health folder

@Module({
  imports: [
    HealthModule,
    // 1. Load the .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Database Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('WORKPLACE_DB_HOST', 'localhost'),
        port: configService.get<number>('WORKPLACE_DB_PORT', 5433),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('WORKPLACE_DB_NAME'),
        entities: [Workplace],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Workplace]),

    // 3. Redis Client (Fixed to use process.env directly for simple registration)
    ClientsModule.register([
      {
        name: 'WORKPLACE_SERVICE_BUS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        },
      },
    ]),
  ],
  controllers: [WorkplaceServiceController],
  providers: [WorkplaceServiceService],
})
export class WorkplaceServiceModule {}
