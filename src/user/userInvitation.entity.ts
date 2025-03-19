import { Business } from "src/business/business.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'user_invitation'})
export default class UserInvitation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.invitation, { onDelete: "CASCADE" })
    userId: User;

    @ManyToOne(() => Business, (business) => business.invitation, { nullable: true, onDelete: 'SET NULL' })
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