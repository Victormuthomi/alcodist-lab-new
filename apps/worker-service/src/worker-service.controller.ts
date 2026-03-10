import { Controller, Post, Body, Logger } from '@nestjs/common';
import { WorkerServiceService } from './worker-service.service';
import { CreateWorkerDto } from './dto/create-worker.dto';

@Controller('workers')
export class WorkerServiceController {
  private readonly logger = new Logger(WorkerServiceController.name);

  constructor(private readonly workerService: WorkerServiceService) {}

  @Post()
  async create(@Body() createWorkerDto: CreateWorkerDto) {
    this.logger.log(
      `🚀 [WORKER-SERVICE] Received POST for: ${createWorkerDto.email}`,
    );
    // CRITICAL: We MUST return the result to the client
    return await this.workerService.create(createWorkerDto);
  }
}
