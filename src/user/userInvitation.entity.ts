import { Business } from "../business/business.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_invitation'})
export default class UserInvitation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.invitation, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'user_id'})
    userId: User;

    @ManyToOne(() => Business, (business) => business.invitation, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'business_id'})
    businessId: Business;

    @Column()
    destinationEmail: string;

    @Column()
    status: string;

    @Column({ nullable: true})
    createdAt: Date;

    @Column({ nullable: true})
    updatedAt: Date;
}