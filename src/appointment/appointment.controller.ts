import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import AppointmentService from './appointment.service';
import CreateAppointmenDto from './createAppointment.dto';
import { Appointment } from './appointment.entity';
import UpdateAppointmentDto from './updateAppointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentWithCustomerName } from './appointmentWithCustomer.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('appointments')
export default class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/:id')
  async getbyId(
    @Param('id') eventId: number,
  ): Promise<AppointmentWithCustomerName> {
    return await this.appointmentService.getById(eventId);
  }

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

  @Get('by-business/:businessId')
  async getAllbyBusiness(
    @Param('businessId') businessId: number,
  ): Promise<AppointmentWithCustomerName[]> {
    return await this.appointmentService.getByBusiness(businessId);
  }
}
