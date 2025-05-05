import { IsNotEmpty, IsString } from "class-validator";

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  businessId: number;

  @IsNotEmpty()
  executionDate: Date; 

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsString()
  minute: string;
}
