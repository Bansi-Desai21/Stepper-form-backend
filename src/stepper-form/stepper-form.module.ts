import { Module } from "@nestjs/common";
import { StepperFormService } from "./stepper-form.service";
import { StepperFormController } from "./stepper-form.controller";
import { User, UserSchema } from "../../schemas/user.schema";
import {
  EducationDetails,
  EducationDetailsSchema,
} from "../../schemas/education-details.schema";
import {
  ExperienceDetails,
  ExperienceDetailsSchema,
} from "../../schemas/experience-details.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: EducationDetails.name, schema: EducationDetailsSchema },
      { name: ExperienceDetails.name, schema: ExperienceDetailsSchema },
    ]),
    CloudinaryModule,
  ],
  providers: [StepperFormService],
  controllers: [StepperFormController],
})
export class StepperFormModule {}
