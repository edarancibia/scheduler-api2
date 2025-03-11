import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateAppointmenDto {
    @IsNotEmpty()
    @IsNumber()
    businessId: number;

    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    dateEnd: string;
    
    @IsNotEmpty()
    @IsString()
    service: string;

    @IsNotEmpty()
    @IsNumber()
    statusId: number;
}
