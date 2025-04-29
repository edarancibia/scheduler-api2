import { Module } from '@nestjs/common';
import { Campaign } from './campaing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import CampaingController from './compaing.controller';
import { Business } from '../business/business.entity';
import CustomerService from '../customer/customer.service';
import { MailService } from '../mail/mail.service';
import { Customer } from '../customer/customer.entity';
import CampaingService from './campaing.service';
import { CustomerModule } from '../customer/customer.module';
import CustomerRepository from '../customer/customer.repository';
import { CampaignCronService } from './compaingCron.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Business, Customer]), CustomerModule, CommonModule],
  providers: [CampaingService, CustomerService, CustomerRepository, CampaignCronService, MailService],
  controllers: [CampaingController],
  exports: [CampaingService, TypeOrmModule, CampaignCronService],
})
export class CampaingModule { }
