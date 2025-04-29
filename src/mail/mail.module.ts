import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import CampaingService from '../campaing/campaing.service';
import { CampaingModule } from '../campaing/campaing.module';
import { CustomerModule } from '../customer/customer.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'e.daniel.arancibia@gmail.com',
          pass: 'tvhk tugb uimq kxjs',
        },
      },
    }),
    CampaingModule,
    CustomerModule,
    CommonModule,
  ],
  providers: [MailService, CampaingService],
  exports: [MailService],
})
export class MailModule {}