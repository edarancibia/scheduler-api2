import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Business } from "./business.entity";
import { Repository } from "typeorm";
import CreateBusinessDto from "./createBusiness.dto";

@Injectable()
export default class BusinessService {
    constructor(
        @InjectRepository(Business)
        private readonly businessRepository: Repository<Business>,
    ) {}

    async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
        console.log(createBusinessDto)
        try {
            const newBusiness = this.businessRepository.create(createBusinessDto);
            const createdBusiness = await this.businessRepository.save(newBusiness);

            return createdBusiness;
        } catch (error) {
            throw error;
        }
    }

    async findById(idBusiness: number): Promise<Business> {
        try {
            return await this.businessRepository.findOne({ where: { id: idBusiness } });
        } catch (error) {
            throw error;
        }
    }
}
