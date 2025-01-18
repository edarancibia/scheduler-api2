import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true })
  businessId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
  customerId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['Scheduled', 'Completed', 'Cancelled'] })
  status: string;
}

export type AppointmentDocument = Appointment & Document;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
