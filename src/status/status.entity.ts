import { Appointment } from '../appointment/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'status'})
export default class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Appointment, (appointment) => appointment.status)
  mediaSets: Appointment[];
}
