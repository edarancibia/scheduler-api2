import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { CampaingModule } from './campaing/campaing.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [BusinessModule, AuthModule, UserModule, CustomerModule, CampaingModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
