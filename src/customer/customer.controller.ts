import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import CustomerService from "./customer.service";
import CreateCustomerDto from "./createCustomer.dto";
import { Customer } from "./customer.entity";

@Controller('customers')
export default class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
    ) {}

    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return await this.customerService.create(createCustomerDto);
    }

    @Get(':id')
    async findCustomer(@Param('id') idCustomer: number): Promise<Customer> {
        return await this.customerService.findById(idCustomer);
    }
}
