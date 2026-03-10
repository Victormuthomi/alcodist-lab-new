import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftServiceController } from './shift-service.controller';
import { ShiftServiceService } from './shift-service.service';
import { HealthModule } from './health/health.module';

// Add these two imports:
import { Worker } from './entities/worker.entity';
import { Shift } from './entities/shift.entity';
import { Workplace } from './entities/workplace.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('SHIFT_DB_HOST'),
        port: config.get<number>('SHIFT_DB_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('SHIFT_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Worker, Shift, Workplace]),
    HealthModule,
  ],
  controllers: [ShiftServiceController],
  providers: [ShiftServiceService],
})
export class ShiftServiceModule {}
