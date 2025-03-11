import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CreateServiceDto from "./createService.dto";
import BusinessServiceService from "./businessService.service";
import Service from "./businessService.entity";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('business-service')
export default class BusinessServiceController {
    constructor(
        private readonly bsService: BusinessServiceService,
    ) {}

    @Post()
    async createService(@Body() createServiceData: CreateServiceDto): Promise<Service> {
        return await this.bsService.create(createServiceData);
    }

    @Get('/:businessId')
    async getServicesByBusinessId(@Param('businessId') businessId: number) : Promise<Service[]> {
        return await this.bsService.getByBusiness(businessId);
    }
}
