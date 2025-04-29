import { Module } from '@nestjs/common';
import { Customer } from './customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import CustomerService from './customer.service';
import { Business } from '../business/business.entity';
import CustomerController from './customer.controller';
import CustomerRepository from './customer.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Business])],
    providers: [CustomerService, CustomerRepository],
    controllers: [CustomerController],
    exports: [CustomerService, CustomerRepository],
  })
export class CustomerModule {}
