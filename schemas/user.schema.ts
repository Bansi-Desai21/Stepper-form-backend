import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
class CurrentOrg {
  @Prop()
  joiningDate: Date;

  @Prop()
  nextAppraisalDate: Date;

  @Prop()
  currentCTC: number;
}

@Schema()
class ProfessionalDetails {
  @Prop()
  department: string;

  @Prop()
  designation: string;

  @Prop()
  years: number; 
  
  @Prop()
  months: number; 

  @Prop()
  currentLocation: string;

  @Prop({ type: [String] })
  skills: string[];

  @Prop()
  uploadedResume: string;
}

@Schema()
class BankDetails {
  @Prop()
  bankName: string;

  @Prop()
  accountNumber: string;

  @Prop()
  IFSCCode: string;

  @Prop()
  accountHolderName: string;

  @Prop()
  aadhaarNumber: string;

  @Prop()
  panNumber: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  mobileNo: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  presentAddress: string;

  @Prop({ required: true })
  permanentAddress: string;

  @Prop()
  profilePic: string;

  @Prop({ type: BankDetails })
  bankDetails: BankDetails;

  @Prop({ type: CurrentOrg })
  currentOrgDetails: CurrentOrg;

  @Prop({ type: ProfessionalDetails })
  professionalDetails: ProfessionalDetails;

  @Prop({ default: false })
  isRemoved:Boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
