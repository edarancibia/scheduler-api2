import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Business } from "./business.entity";
import { Repository } from "typeorm";
import CreateBusinessDto from "./createBusiness.dto";
import { User } from "../user/user.entity";

@Injectable()
export default class BusinessService {
    constructor(
        @InjectRepository(Business)
        private readonly businessRepository: Repository<Business>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
        try {
            let newBusiness = this.businessRepository.create(createBusinessDto);

            const user = await this.userRepository.findOne({ where: { id: createBusinessDto.userId} });
            const createdBusiness = await this.businessRepository.save(newBusiness);
            
            user.business = createdBusiness;
            await this.userRepository.save(user);

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
