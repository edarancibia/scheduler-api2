import { IsNotEmpty, IsNumber } from "class-validator";

export default class UpdateAppointmentDto {
    @IsNotEmpty()
    @IsNumber()
    statusId: number;
}
