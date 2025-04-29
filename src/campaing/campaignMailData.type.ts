import { Campaign } from "./campaing.entity"

export type CampaingMailData = {
    emails: string[],
    campaign: Campaign,
}