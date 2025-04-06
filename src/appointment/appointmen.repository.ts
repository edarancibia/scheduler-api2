import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentWithCustomerName } from './appointmentWithCustomer.interface';

@Injectable()
export default class AppointmentRepository extends Repository<Appointment> {
    constructor(
        @InjectRepository(Appointment)
        private readonly repo: Repository<Appointment>,
    ) {
      super(repo.target, repo.manager, repo.queryRunner);
    }

  async getByBusiness(businessId: number): Promise<AppointmentWithCustomerName[]> {
    const appointments = await this.find({
        where: { business: { id: businessId }, status: { id: In([1, 2]) } },
        relations: ['business', 'status', 'customer'],
      });
    
      return appointments.map((appointment) => ({
        id: appointment.id,
        service: appointment.service,
        date: appointment.date,
        dateEnd: appointment.dateEnd,
        status: appointment.status,
        business: appointment.business,
        customer: appointment.customer,
      }));
    
  }
}
