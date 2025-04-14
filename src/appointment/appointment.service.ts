import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';
import CreateAppointmenDto from './createAppointment.dto';
import Status from '../status/status.entity';
import { Business } from '../business/business.entity';
import { Customer } from '../customer/customer.entity';
import AppointmentRepository from './appointmen.repository';
import { AppointmentWithCustomerName } from './appointmentWithCustomer.interface';

@Injectable()
export default class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly repo: AppointmentRepository,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async create(createAppointmetDto: CreateAppointmenDto): Promise<Appointment> {
    const { businessId, customerId, date, dateEnd, service, statusId } =
      createAppointmetDto;

    const business = await this.businessRepository.findOne({
      where: { id: businessId },
    });
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });

    const appointment = new Appointment();

    appointment.business = business;
    appointment.customer = customer;
    appointment.date = new Date(date);
    appointment.dateEnd = new Date(dateEnd);
    appointment.service = service;
    appointment.status = status;

    try {
      const newAppointment = this.appointmentRepository.create(appointment);

      return await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      throw error;
    }
  }

  async update(appointmentId: number, statusId): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
    });

    appointment.status = { id: statusId } as Status;

    return await this.appointmentRepository.save(appointment);
  }

  async getByBusiness(
    businessId: number,
  ): Promise<AppointmentWithCustomerName[]> {
    const res = await this.repo.getByBusiness(businessId);

    return res;
  }

  async getById(eventId: number): Promise<AppointmentWithCustomerName> {
    return await this.repo.getById(eventId);
  }
}
