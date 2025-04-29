import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserService from './user.service';
import UserController from './user.controller';
import UserInvitation from './userInvitation.entity';
import { Business } from '../business/business.entity';
import { MailService } from '../mail/mail.service';
import { CampaingModule } from '../campaing/campaing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInvitation, Business]),
    CampaingModule,
  ],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
