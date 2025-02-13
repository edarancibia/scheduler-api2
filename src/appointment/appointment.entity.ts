import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Business } from '../business/business.entity';
import { Customer } from '../customer/customer.entity';

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Business, (business) => business.appointments, { nullable: false, onDelete: 'CASCADE' })
  business: Business;

  @ManyToOne(() => Customer, (customer) => customer.appointments, { nullable: false, onDelete: 'CASCADE' })
  customer: Customer;

  @Column({ type: 'varchar', length: 255, nullable: false })
  service: string;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  status: AppointmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
