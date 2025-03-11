import { Appointment } from '../appointment/appointment.entity';
import { Campaign } from '../campaing/campaing.entity';
import { Customer } from '../customer/customer.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Service from '../business-service/businessService.entity';

@Entity({ name: 'business' })
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @OneToMany(() => User, (user) => user.business)
  users: User[];

  @OneToMany(() => Customer, (customer) => customer.business)
  customers: Customer[];

  @OneToMany(() => Campaign, (campaign) => campaign.business)
  campaigns: Campaign[];

  @OneToMany(() => Appointment, (appointment) => appointment.business)
  appointments: Appointment[];

  @OneToMany(() => Service, (service) => service.business, { cascade: true })
  services: Service[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
