import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateServiceDto {
   @IsNotEmpty()
   @IsString()
   name: string;
   
   @IsNotEmpty()
   @IsNumber()
   businessId: number;

   @IsOptional()
   @IsString()
   duration: string;
}
