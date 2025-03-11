import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BusinessServiceController from './businessService.controller';
import BusinessServiceService from './businessService.service';
import Service from './businessService.entity';
import { Business } from '../business/business.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Service, Business])],
    providers: [BusinessServiceService],
    controllers: [BusinessServiceController],
  })
export class BusinessServiceModule {}
