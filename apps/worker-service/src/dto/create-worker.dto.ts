import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;
}
