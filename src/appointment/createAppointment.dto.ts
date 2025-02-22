import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import Status from "../status/status.entity";

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
    service: string;

    @IsNotEmpty()
    @IsNumber()
    statusId: number;
}
