import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import BusinessService from "./business.service";
import CreateBusinessDto from "./createBusiness.dto";
import { Business } from "./business.entity";

@Controller('business')
export default class BusinessController {
    constructor(
        private readonly businessService: BusinessService,
    ) {}

    @Post()
    async createBusiness(@Body() createBusinessDto: CreateBusinessDto): Promise<Business> {
        return await this.businessService.create(createBusinessDto);
    }

    @Get(':id')
    async findBusinessById(@Param('id') idBusiness: number): Promise<Business> {
        return  await this.businessService.findById(idBusiness);
    }
}
