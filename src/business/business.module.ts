import { Module } from '@nestjs/common';
import { Business } from './business.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import BusinessService from './business.service';
import BusinessController from './business.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Business])],
    providers: [BusinessService, BusinessService],
    controllers: [BusinessController],
  })
export class BusinessModule {}
