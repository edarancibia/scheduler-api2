import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mail } from './mail.interface';
import { CampaignMailInterface } from './campaign.mail.interface';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) { }

  async sendEmail(mail: Mail): Promise<void> {
    await this.mailerService.sendMail({
      to: mail.to,
      from: process.env.MAIL_FROM,
      subject: mail.subject,
      text: mail.text,
      html: `<b>${mail.text}</b>`,
    });
  }

  async sendCampaignTocustomers(mail: CampaignMailInterface): Promise<void> {
    await this.mailerService.sendMail({
      to: mail.to,
      from: process.env.MAIL_FROM,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  }
}