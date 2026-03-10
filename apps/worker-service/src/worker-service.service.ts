import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Worker } from './entities/worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';

@Injectable()
export class WorkerServiceService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepo: Repository<Worker>,

    @Inject('REDIS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const worker = this.workerRepo.create(createWorkerDto);
    const savedWorker = await this.workerRepo.save(worker);

    // Broadcast to the Lab (Shift Service 3002 is listening)
    this.client.emit('worker_created', savedWorker);

    return savedWorker;
  }
}
