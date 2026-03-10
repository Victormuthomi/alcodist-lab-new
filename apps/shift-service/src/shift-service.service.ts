import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Shift } from './entities/shift.entity';
import { Worker } from './entities/worker.entity';
import { Workplace } from './entities/workplace.entity';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftServiceService {
  constructor(
    @InjectRepository(Shift) private readonly shiftRepo: Repository<Shift>,
    @InjectRepository(Worker) private readonly workerRepo: Repository<Worker>,
    @InjectRepository(Workplace)
    private readonly workplaceRepo: Repository<Workplace>,
  ) {}

  // --- 1. Sync Logic (Called by Controller EventPattern) ---
  async createShadowWorkplace(data: any) {
    const workplace = this.workplaceRepo.create({
      id: data.id,
      name: data.name,
      address: data.address,
    });
    return this.workplaceRepo.save(workplace);
  }

  // --- 1. Sync Logic (Called by Controller EventPattern) ---
  async createShadowWorker(data: any) {
    const worker = this.workerRepo.create({
      id: data.id,
      firstName: data.firstName, // 👈 Match the field from 3001
      lastName: data.lastName, // 👈 Match the field from 3001
      email: data.email,
    });
    return this.workerRepo.save(worker);
  }

  async createShadowWorkplace(data: any) {
    const workplace = this.workplaceRepo.create({
      id: data.id,
      name: data.name,
      address: data.address,
    });
    return this.workplaceRepo.save(workplace);
  }

  // --- 2. Shift Logic ---
  async createShift(dto: CreateShiftDto) {
    // Validate Worker
    const worker = await this.workerRepo.findOne({
      where: { id: dto.workerId },
    });
    if (!worker)
      throw new NotFoundException(`Worker ${dto.workerId} not found`);

    // Validate Workplace
    const workplace = await this.workplaceRepo.findOne({
      where: { id: dto.workplaceId },
    });
    if (!workplace)
      throw new NotFoundException(`Workplace ${dto.workplaceId} not found`);

    // Check Overlap
    const overlap = await this.shiftRepo.findOne({
      where: {
        worker: { id: dto.workerId },
        startTime: LessThanOrEqual(new Date(dto.endTime)),
        endTime: MoreThanOrEqual(new Date(dto.startTime)),
      },
    });

    if (overlap) {
      throw new ConflictException(
        'Worker is already scheduled for this time slot',
      );
    }

    const shift = this.shiftRepo.create({
      startTime: dto.startTime,
      endTime: dto.endTime,
      worker,
      workplace,
    });

    return this.shiftRepo.save(shift);
  }

  async getWorkerShifts(workerId: string) {
    return this.shiftRepo.find({
      where: { worker: { id: workerId } },
      relations: ['worker', 'workplace'],
      order: { startTime: 'ASC' },
    });
  }
}
