import { Module } from '@nestjs/common';
import { Campaign } from './campaing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Campaign])],
    providers: [],
    controllers: [],
  })
export class CampaingModule {}
