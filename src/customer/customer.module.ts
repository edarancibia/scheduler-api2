import { Module } from '@nestjs/common';
import { Customer } from './customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import CustomerService from './customer.service';
import { Business } from 'src/business/business.entity';
import CustomerController from './customer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Business])],
    providers: [CustomerService],
    controllers: [CustomerController],
  })
export class CustomerModule {}
