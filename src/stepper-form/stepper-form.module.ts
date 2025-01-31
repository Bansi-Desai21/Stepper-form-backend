import { Module } from '@nestjs/common';
import { StepperFormService } from './stepper-form.service';
import { StepperFormController } from './stepper-form.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import { EducationDetails, EducationDetailsSchema } from '../../schemas/education-details.schema';
import { ExperienceDetails, ExperienceDetailsSchema } from '../../schemas/experience-details.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: EducationDetails.name, schema: EducationDetailsSchema },
      { name: ExperienceDetails.name, schema: ExperienceDetailsSchema },
    ]),
  ],
  providers: [StepperFormService],
  controllers: [StepperFormController],
})
export class StepperFormModule {}
