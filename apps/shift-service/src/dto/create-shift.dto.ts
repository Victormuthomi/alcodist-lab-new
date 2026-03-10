import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateShiftDto {
  @IsUUID()
  @IsNotEmpty()
  workerId: string;

  @IsUUID()
  @IsNotEmpty()
  workplaceId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
