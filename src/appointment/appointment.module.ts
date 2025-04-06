import { Module } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppointmentService from './appointment.service';
import AppointmentController from './appointment.controller';
import { Business } from '../business/business.entity';
import Status from '../status/status.entity';
import { Customer } from '../customer/customer.entity';
import AppointmentRepository from './appointmen.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Business, Status, Customer])],
  providers: [AppointmentService, AppointmentRepository],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
