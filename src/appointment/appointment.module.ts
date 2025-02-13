import { Module } from '@nestjs/common';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [],
  controllers: [],
})
export class AppointmentModule {}
