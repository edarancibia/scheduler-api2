import { Business } from '../business/business.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum ScheduledTaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('scheduled_tasks')
export class ScheduledTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Business, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @Column({ type: 'timestamp' })
  executionTime: Date;

  @Column({ type: 'enum', enum: ScheduledTaskStatus, default: ScheduledTaskStatus.PENDING })
  status: ScheduledTaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
