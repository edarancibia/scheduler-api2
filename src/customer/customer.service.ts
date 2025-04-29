import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { IsNull, Not, Repository } from 'typeorm';
import CreateCustomerDto from './createCustomer.dto';
import { Business } from '../business/business.entity';
import CustomerRepository from './customer.repository';

@Injectable()
export default class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private readonly customerRepository: CustomerRepository,
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const business = await this.businessRepository.findOne({
        where: { id: createCustomerDto.businessId },
      });

      const customer = await this.repository.create({
        ...createCustomerDto,
        business,
      });

      return await this.repository.save(customer);
    } catch (error) {
      throw error;
    }
  }

  async findById(idCustomer: number): Promise<Customer> {
    try {
      return this.repository.findOne({ where: { id: idCustomer } });
    } catch (error) {
      throw error;
    }
  }

  async search(businessId: number, query: string): Promise<Customer[]> {
    return await this.customerRepository.searchByBusinessIdAndName(businessId, query);
  }

  async findByBusinessAndNotEmptyEmail(businessId: number): Promise<Customer[]> {
    return await this.repository.find({ where: { business: { id: businessId }, email: Not(IsNull()) } })
      .then(customers => customers.filter(c => c.email.trim() !== ''));
  }
}
