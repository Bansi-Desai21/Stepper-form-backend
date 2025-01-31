import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExperienceDetailsDocument = ExperienceDetails & Document;

@Schema({ timestamps: true })
export class ExperienceDetails {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  companyName: string;

  @Prop()
  position: string;

  @Prop()
  totalYears: number;

  @Prop()
  lastCTC: number;
}

export const ExperienceDetailsSchema = SchemaFactory.createForClass(ExperienceDetails);
