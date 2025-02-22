import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Appointment } from "./appointment.entity";
import { Repository } from "typeorm";
import CreateAppointmenDto from "./createAppointment.dto";
import Status from "../status/status.entity";
import { Business } from "../business/business.entity";
import { Customer } from "../customer/customer.entity";

@Injectable()
export default class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Business)
        private readonly businessRepository: Repository<Business>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) {}

    async create(createAppointmetDto: CreateAppointmenDto): Promise<Appointment> {
        const { businessId, customerId, date, service, statusId } = createAppointmetDto;

        const business = await this.businessRepository.findOne({ where: { id: businessId } });
        const customer = await this.customerRepository.findOne({ where: { id: customerId } });
        const status = await this.statusRepository.findOne({ where: { id: statusId } });

        const appointment = new Appointment(); 

        appointment.business = business;
        appointment.customer = customer;
        appointment.date = new Date(date);
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
        const appointment = await this.appointmentRepository.findOne({ where: { id: appointmentId } });

        appointment.status = { id: statusId } as Status;

        return await this.appointmentRepository.save(appointment);
    }

    async getByBusinessAndStatus(businessId: number, statusId: number): Promise<Appointment[]> {
        const appointments: Appointment[] = await this.appointmentRepository.find({
            where: { business: { id: businessId }, status: { id: statusId } },
            relations: ['business', 'status'],
        });

        return appointments;
    }
}
