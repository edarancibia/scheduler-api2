import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export default class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsString()
  email?: string;

  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsInt()
  businessId: number;
}
