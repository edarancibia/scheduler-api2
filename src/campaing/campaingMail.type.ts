import { Campaign } from "./campaing.entity"

export type CampaignMail = {
    emails: string[],
    data: Campaign,
}