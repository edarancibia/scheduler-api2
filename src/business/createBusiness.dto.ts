import { IsNotEmpty, IsString } from "class-validator";

export default class CreateBusinessDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    adress: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
