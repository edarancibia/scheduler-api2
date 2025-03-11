import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Service from './businessService.entity';
import { Repository } from 'typeorm';
import CreateServiceDto from './createService.dto';
import { Business } from '../business/business.entity';

@Injectable()
export default class BusinessServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async create(service: CreateServiceDto): Promise<Service> {
    try {
      const { name, businessId, duration } = service;

      const business = await this.businessRepository.findOne({
        where: { id: businessId },
      });

      const newService = new Service();

      newService.name = name;
      newService.business = business;
      newService.duration = duration

      const createdService = this.serviceRepository.create(newService);

      return await this.serviceRepository.save(createdService);
    } catch (error) {
      throw error;
    }
  }

  async getByBusiness(businessId: number): Promise<Service[]> {
    const business = await this.businessRepository.findOne({
        where: { id: businessId },
      });

    return await this.serviceRepository.find({ where: { business: business } });
  }
}
