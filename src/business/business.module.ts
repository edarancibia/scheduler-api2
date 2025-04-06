import { Module } from '@nestjs/common';
import { Business } from './business.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import BusinessService from './business.service';
import BusinessController from './business.controller';
import { User } from '../user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Business, User])],
    providers: [BusinessService, BusinessService],
    controllers: [BusinessController],
  })
export class BusinessModule {}
