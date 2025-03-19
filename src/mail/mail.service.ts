import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mail } from './mail.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(mail: Mail): Promise<void> {
    await this.mailerService.sendMail({
      to: mail.to,
      from: 'e.daniel.arancibia@gmail.com',
      subject: mail.subject,
      text: mail.text,
      html: `<b>${mail.text}</b>`,
    });
  }
}