import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import CustomerService from './customer.service';
import CreateCustomerDto from './createCustomer.dto';
import { Customer } from './customer.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export default class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.create(createCustomerDto);
  }

  @Get('search')
  async search(
    @Query('businessId') businessId: number,
    @Query('q') query: string,
  ) {
    return this.customerService.search(businessId, query);
  }

  @Get(':id')
  async findCustomer(@Param('id') idCustomer: number): Promise<Customer> {
    return await this.customerService.findById(idCustomer);
  }
}
