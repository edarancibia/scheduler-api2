import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BusinessModule } from './business/business.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { CampaingModule } from './campaing/campaing.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from './status/status.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, // ⚠️ ¡No usar en producción!
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      logging: true,
    }),
    UserModule,
    BusinessModule,
    CustomerModule,
    AppointmentModule,
    CampaingModule,
    AuthModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
