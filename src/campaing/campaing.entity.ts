import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Business } from '../business/business.entity';

@Entity({ name: 'campaigns' })
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Business, (business) => business.campaigns, { nullable: false, onDelete: 'CASCADE' })
  business: Business;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  imageUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
