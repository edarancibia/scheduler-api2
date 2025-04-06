import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateBusinessDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
