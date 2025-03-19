import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateInvitationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEmail()
  @IsNotEmpty()
  destinationEmail: string;

  @IsNumber()
  @IsNotEmpty()
  businessId: number;
}
