import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Campaign } from "./campaing.entity";
import { Repository } from "typeorm";
import { Business } from "../business/business.entity";
import { CreateCampaignDto } from "./createCampaing.dto";
import CustomerService from "../customer/customer.service";
import { CampaingMailData } from "./campaignMailData.type";
import { CampaignCronService } from "./compaingCron.service";
import { CloudinaryService } from "../common/cloudinary.service";

@Injectable()
export default class CampaingService {
    private readonly logger = new Logger(CampaingService.name);

    constructor(
        @InjectRepository(Campaign)
        private campaignRepo: Repository<Campaign>,
        @InjectRepository(Business)
        private businessRepo: Repository<Business>,
        private readonly customerService: CustomerService,
        private readonly campaignCronService: CampaignCronService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    async create(data: CreateCampaignDto, imageUrl: string): Promise<Campaign> {
        let newCampaign = await this.campaignRepo.create(data);
        const business = await this.businessRepo.findOne({ where: { id: Number(data.businessId) } });

        newCampaign.business = business;
        newCampaign.imageUrl = imageUrl;

        const createdCampaign = await this.campaignRepo.save(newCampaign);

        const emailsData = await this.handlePromoEmailData(createdCampaign.id, data.businessId)

        this.campaignCronService.scheduleExecutionForUser(data.businessId.toString(), data.executionDate.toString(), parseInt(data.hour), parseInt(data.minute), emailsData);

        return createdCampaign;

    }

    async getAllByBusinessId(businessId: number): Promise<Campaign[]> {
        return await this.campaignRepo.find({ where: { business: { id: businessId } } });
    }

    async getById(campaingId: number): Promise<Campaign> {
        return await this.campaignRepo.findOne({ where: { id: campaingId } });
    }

    async handlePromoEmailData(campaignId: number, businessId): Promise<CampaingMailData> {
        const campaignToSend = await this.campaignRepo.findOne({
            where: { id: campaignId },
            relations: ['business'],
        });

        const customers = await this.customerService.findByBusinessAndNotEmptyEmail(businessId);
        const emails = customers.map(c => c.email);

        return {
            emails,
            campaign: campaignToSend,
        }
    }
}