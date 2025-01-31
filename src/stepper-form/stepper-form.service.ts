import { Injectable, NotFoundException ,InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { EducationDetails } from '../../schemas/education-details.schema';
import { ExperienceDetails } from '../../schemas/experience-details.schema';
import { Types } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StepperFormService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(EducationDetails.name)
    private educationModel: Model<EducationDetails>,
    @InjectModel(ExperienceDetails.name)
    private experienceModel: Model<ExperienceDetails>,
  ) {}

  async createUserWithDetails(data: any) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        presentAddress,
        permanentAddress,
        profilePic,
        dateOfBirth,
      } = data.personalDetails;

      const user = await this.userModel.create({
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        presentAddress,
        permanentAddress,
        profilePic,
        dateOfBirth,
        bankDetails: this.parseJson(data.bankDetails),
        professionalDetails: data.professionalDetails,
        currentOrgDetails: this.parseJson(data.currentOrg),
      });

      const userId = user._id as Types.ObjectId;
      await Promise.all([
        ...this.saveDetails(this.educationModel, data.educationDetails, userId),
        ...this.saveDetails(this.experienceModel, data.experienceDetails, userId),
      ]);
      return user;
    } catch (error) {
      console.error('Error creating user with details:', error);
      throw new Error('Failed to create user. Please try again later.');
    }
  }

  private parseJson(data: string): any {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }

  private saveDetails(model: any, details: string, userId: Types.ObjectId) {
    const parsedDetails = this.parseJson(details);
    console.log('parsedDetails', parsedDetails);
    return parsedDetails.map((detail: any) => new model({ ...detail, userId }).save());
  }

  async getUserList() {
    try {
      const user = await this.userModel.aggregate([
        {
          $lookup: {
            from: 'educationdetails',
            localField: '_id',
            foreignField: 'userId',
            as: 'educationDetails',
          },
        },
        {
          $lookup: {
            from: 'experiencedetails',
            localField: '_id',
            foreignField: 'userId',
            as: 'experienceDetails',
          },
        },
      ]);
      return { user };
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw new Error('Failed to fetch user list');
    }
  }

  async getUserDetails(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new NotFoundException('Invalid user ID format');
      }
  
      const user = await this.userModel.findOne({ _id: new Types.ObjectId(userId) }).lean();
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const [educationDetails, experienceDetails] = await Promise.all([
        this.educationModel.find({ userId: user._id }).lean(),
        this.experienceModel.find({ userId: user._id }).lean(),
      ]);

      return {
        ...user,
        educationDetails,
        experienceDetails,
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error('Failed to fetch user details');
    }
  }

  async updateUserWithDetails(data: any, userId: string): Promise<User> {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        presentAddress,
        permanentAddress,
        profilePic,
        dateOfBirth,
      } = data.personalDetails;
      const existingUser = await this.userModel.findById(userId);
      if (!existingUser) {
        throw new Error('User not found');
      }

      if (
        profilePic &&
        existingUser.profilePic &&
        existingUser.profilePic !== profilePic
      ) {
        this.deleteFile(existingUser.profilePic);
      }

      if (
        data.resume &&
        existingUser.professionalDetails.uploadedResume != '' &&
        existingUser.professionalDetails.uploadedResume !== data.resume
      ) {
        this.deleteFile(existingUser.professionalDetails.uploadedResume);
      }

      const user = (await this.userModel.findByIdAndUpdate(
        userId,
        {
          firstName,
          middleName,
          lastName,
          email,
          mobileNo,
          presentAddress,
          permanentAddress,
          profilePic,
          dateOfBirth,
          bankDetails: this.parseJson(data.bankDetails),
          professionalDetails: data.professionalDetails,
          currentOrgDetails: this.parseJson(data.currentOrg),
        },
        { new: true },
      )) as UserDocument;

      if (!user) {
        throw new Error('User not found');
      }

      const userObjectId = new Types.ObjectId(userId);

      await this.educationModel.deleteMany({ userId: userObjectId });
      await this.experienceModel.deleteMany({ userId: userObjectId });

      const userObjId = user._id as Types.ObjectId;
      await Promise.all([
        ...this.saveDetails(this.educationModel, data.educationDetails, userObjId),
        ...this.saveDetails(this.experienceModel, data.experienceDetails, userObjId),
      ]);

      return user;
    } catch (error) {
      console.error('Error updating user with details:', error);
      throw new Error('Failed to update user details. Please try again later.');
    }
  }

  private deleteFile(fileUrl: string): void {
    try {
      const filePath = path.join(
        __dirname,
        '../../uploads/',
        path.basename(fileUrl),
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old file: ${filePath}`);
      }
    } catch (err) {
      console.error(`Error deleting file: ${fileUrl}`, err);
    }
  }

  async deleteUserWithDetails(userId: string): Promise<User> {
    try{
      const user = await this.userModel.findById(userId);

      if (!user) throw new NotFoundException('User not found');
  
      await this.educationModel.deleteMany({ userId });
      await this.experienceModel.deleteMany({ userId });
  
      return this.userModel.findByIdAndDelete(userId);
    }catch(error){
      console.error('Error deleting user with details:', error);
      throw new Error('Failed to delete user. Please try again later.');
    }
   
  }
}
