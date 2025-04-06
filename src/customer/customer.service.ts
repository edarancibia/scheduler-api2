import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import CreateCustomerDto from "./createCustomer.dto";
import { Business } from "../business/business.entity";
import CustomerRepository from "./customer.repository";

@Injectable()
export default class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly repo: CustomerRepository,
        @InjectRepository(Business)
        private readonly businessRepository: Repository<Business>,
    ) {}

    async create(createCustomerDto: CreateCustomerDto) : Promise<Customer> {
        try {
            const business = await this.businessRepository.findOne({ where: { id: createCustomerDto.businessId } })

            const customer = await this.customerRepository.create({
                ...createCustomerDto,
                business,
            })

            return await this.customerRepository.save(customer);
        } catch (error) {
            throw error;
        }
    }

    async findById(idCustomer: number): Promise<Customer> {
        try {
            return this.customerRepository.findOne({ where: { id: idCustomer } })
        } catch (error) {
            throw error;
        }
    }

    async search(businessId: number, query: string): Promise<Customer[]> {
        return await this.repo.searchByBusinessIdAndName(businessId, query);
    }
}
