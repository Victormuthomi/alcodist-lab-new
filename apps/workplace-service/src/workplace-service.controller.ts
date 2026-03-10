import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { WorkplaceServiceService } from './workplace-service.service';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';

@Controller('workplaces')
export class WorkplaceServiceController {
  private readonly logger = new Logger(WorkplaceServiceController.name);

  constructor(private readonly workplaceService: WorkplaceServiceService) {}

  @Post()
  async create(@Body() createWorkplaceDto: CreateWorkplaceDto) {
    this.logger.log(`🏗️ Creating new workplace: ${createWorkplaceDto.name}`);
    return this.workplaceService.create(createWorkplaceDto);
  }

  @Get()
  async findAll() {
    return this.workplaceService.findAll();
  }
}
