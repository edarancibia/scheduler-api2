import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CampaingMailData } from './campaignMailData.type';
import { CampaignMailInterface } from '../mail/campaign.mail.interface';

@Injectable()
export class CampaignCronService {
    private readonly logger = new Logger(CampaignCronService.name);
    private userTimeouts = new Map<string, NodeJS.Timeout>();

    constructor(
        private readonly mailService: MailService,
    ) { }

    scheduleExecutionForUser(businessId: string, executionDate: string, hour: number, minute: number, emailsData: CampaingMailData): void {
        if (this.userTimeouts.has(businessId)) {
            clearTimeout(this.userTimeouts.get(businessId));
            this.logger.log(`Previous task for user ${businessId} cleared.`);
        }

        const [day, month, year] = executionDate.split('/').map(Number);
        const scheduledTime = new Date(year, month - 1, day, hour, minute, 0, 0);

        scheduledTime.setHours(hour, minute, 0, 0);

        const now = new Date();

        if (isNaN(scheduledTime.getTime())) {
            this.logger.error(`Invalid execution date provided: ${executionDate}`);
            return;
          }

        if (scheduledTime <= now) {
            this.logger.warn(`Scheduled time for user ${businessId} is in the past. Aborting.`);
            return;
        }

        const delay = scheduledTime.getTime() - now.getTime();
        scheduledTime.setHours(hour, minute, 0, 0);

        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const timeout = setTimeout(() => {
            this.logger.log(`Executing scheduled task for user ${businessId}...`);
            this.handleExecution(businessId, emailsData);
            //enviar mail de confirmacion al business al terminar la tarea
        }, delay);

        this.userTimeouts.set(businessId, timeout);

        this.logger.log(`Task scheduled for user ${businessId} at ${scheduledTime.toLocaleString()}`);
    }

    private handleExecution(businessId: string, emailsData: CampaingMailData): void {
        const { emails, campaign } = emailsData;

        for (const email of emails) {
            const mail: CampaignMailInterface = {
                subject: 'Promo',
                to: email,
                text: '',
                html:
                    `<div>
                    <p>${campaign.description}</p>
                    <img src="${campaign.imageUrl}" style="max-width: 100%; height: auto;" />
                </div>`,
            };

            this.logger.log(`[MailService] Sending mail: ${JSON.stringify(mail)}`);

            this.mailService.sendCampaignTocustomers(mail);
        }

        this.userTimeouts.delete(businessId);
    }

    cancelScheduledExecutionForUser(userId: string): void {
        if (this.userTimeouts.has(userId)) {
            clearTimeout(this.userTimeouts.get(userId));
            this.userTimeouts.delete(userId);
            this.logger.log(`Scheduled execution manually canceled for user ${userId}.`);
        }
    }
}
