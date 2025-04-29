import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  businessId: number;

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsString()
  minute: string;
}
