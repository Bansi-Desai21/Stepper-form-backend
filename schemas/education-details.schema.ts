import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EducationDetailsDocument = EducationDetails & Document;

@Schema({ timestamps: true })
export class EducationDetails {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  educationName: string;

  @Prop()
  universityName: string;

  @Prop()
  result: string;

  @Prop()
  yearOfPassing: number;
}

export const EducationDetailsSchema = SchemaFactory.createForClass(EducationDetails);
