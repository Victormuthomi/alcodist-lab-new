import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Workplace } from './entities/workplace.entity';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';

@Injectable()
export class WorkplaceServiceService {
  constructor(
    @InjectRepository(Workplace)
    private readonly workplaceRepo: Repository<Workplace>,
    @Inject('WORKPLACE_SERVICE_BUS') private readonly client: ClientProxy,
  ) {}

  async create(createWorkplaceDto: CreateWorkplaceDto) {
    const workplace = this.workplaceRepo.create(createWorkplaceDto);
    const savedWorkplace = await this.workplaceRepo.save(workplace);

    // Broadcast to the Lab: "A new workplace exists!"
    this.client.emit('workplace_created', savedWorkplace);

    return savedWorkplace;
  }

  // --- Add this method ---
  async findAll() {
    return this.workplaceRepo.find({
      order: { name: 'ASC' },
    });
  }
}
