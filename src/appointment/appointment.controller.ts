import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import AppointmentService from './appointment.service';
import CreateAppointmenDto from './createAppointment.dto';
import { Appointment } from './appointment.entity';
import UpdateAppointmentDto from './updateAppointment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('appointments')
export default class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(
    @Body() data: CreateAppointmenDto,
  ): Promise<Appointment> {
    return await this.appointmentService.create(data);
  }

  @Put(':id')
  async updateAppointment(
    @Param('id') appointmentId: number,
    @Body() data: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.update(appointmentId, data.statusId);
  }

  @Get(':businessId/:statusId')
  async getAllbyBusinessAndStatus(
    @Param('businessId') businessId: number,
    @Param('statusId') statusId: number,
  ): Promise<Appointment[]> {
    return await this.appointmentService.getByBusinessAndStatus(
      businessId,
      statusId,
    );
  }
}
