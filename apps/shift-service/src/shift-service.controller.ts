import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ShiftServiceService } from './shift-service.service';
import { CreateShiftDto } from './dto/create-shift.dto';

@Controller('shifts')
export class ShiftServiceController {
  private readonly logger = new Logger(ShiftServiceController.name);

  constructor(private readonly shiftService: ShiftServiceService) {}

  @Post()
  async create(@Body() dto: CreateShiftDto) {
    return this.shiftService.createShift(dto);
  }

  @Get('worker/:workerId')
  async getShifts(@Param('workerId') workerId: string) {
    return this.shiftService.getWorkerShifts(workerId);
  }

  // --- Event Listeners (The Shadow Sync) ---

  @EventPattern('worker_created')
  async handleWorkerCreated(@Payload() data: any) {
    this.logger.log(`👤 Syncing worker: ${data.name}`);
    await this.shiftService.createShadowWorker(data);
  }

  @EventPattern('workplace_created')
  async handleWorkplaceCreated(@Payload() data: any) {
    this.logger.log(`🏗️ Syncing workplace: ${data.name}`);
    await this.shiftService.createShadowWorkplace(data);
  }
}
