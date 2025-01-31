import { IsString, IsNumber, IsArray, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty ,ApiExtraModels} from '@nestjs/swagger';
import { MulterFile } from 'multer'; 

class PersonalDetailsDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John'
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The middle name of the user',
    example: 'Michael'
  })
  @IsString()
  middleName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe'
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: "9988997766"
  })
  @IsString()
  mobileNo: string;

  @ApiProperty({
    description: 'The permanent address of the user',
    example: '1234 Elm Street, Springfield'
  })
  @IsString()
  permanentAddress: string;

  @ApiProperty({
    description: 'The present address of the user',
    example: '5678 Oak Avenue, Springfield'
  })
  @IsString()
  presentAddress: string;

  @ApiProperty({
    description: 'The date of birth of the user',
    example: '1990-01-01'
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com'
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: ''
  })
  @IsString()
  profilePic: string;
}

class BankDetailsDto {
  @ApiProperty({
    description: 'The Aadhaar number of the user',
    example: '1234 5678 9012'
  })
  @IsString()
  aadhaarNumber: string;

  @ApiProperty({
    description: 'The account holder’s name',
    example: 'John Doe'
  })
  @IsString()
  accountHolderName: string;

  @ApiProperty({
    description: 'The bank account number of the user',
    example: '9876543210123456'
  })
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description: 'The name of the bank where the account is held',
    example: 'ABC Bank'
  })
  @IsString()
  bankName: string;

  @ApiProperty({
    description: 'The IFSC code of the bank branch',
    example: 'ABC123456'
  })
  @IsString()
  IFSCCode: string;

  @ApiProperty({
    description: 'The PAN number of the user',
    example: 'ABCDE1234F'
  })
  @IsString()
  panNumber: string;
}

class ProfessionalDetailsDto {
  @ApiProperty({
    description: 'The current location of the user',
    example: 'New York'
  })
  @IsString()
  currentLocation: string;

  @ApiProperty({
    description: 'The department the user is working in',
    example: 'Software Engineering'
  })
  @IsString()
  department: string;

  @ApiProperty({
    description: 'The designation of the user',
    example: 'Senior Developer'
  })
  @IsString()
  designation: string;

  @ApiProperty({
    description: 'The number of years of experience the user has',
    example: 5
  })
  @IsNumber()
  years: number;

  @ApiProperty({
    description: 'The number of months of experience the user has',
    example: 6
  })
  @IsNumber()
  months: number;

  @ApiProperty({
    description: 'The resume URL uploaded by the user',
    example: ''
  })
  @IsString()
  uploadedResume: string;

  @ApiProperty({
    description: 'The skills of the user',
    example: ['JavaScript', 'Node.js', 'NestJS']
  })
  @IsArray()
  skills: string[];
}

class CurrentOrgDto {
  @ApiProperty({
    description: 'The next appraisal date for the user',
    example: '2025-06-15'
  })
  @IsDateString()
  nextAppraisalDate: string;

  @ApiProperty({
    description: 'The current CTC (Cost to Company) of the user',
    example: 1500000
  })
  @IsNumber()
  currentCTC: number;

  @ApiProperty({
    description: 'The joining date of the user at the current organization',
    example: '2020-01-01'
  })
  @IsDateString()
  joiningDate: string;
}

class EducationDetailsDto {
  @ApiProperty({
    description: 'The name of the degree or course',
    example: 'Bachelor of Technology'
  })
  @IsString()
  educationName: string;

  @ApiProperty({
    description: 'The name of the university or college',
    example: 'XYZ University'
  })
  @IsString()
  universityName: string;

  @ApiProperty({
    description: 'The result or grade of the user',
    example: 'First Class'
  })
  @IsString()
  result: string;

  @ApiProperty({
    description: 'The year of passing for the user',
    example: 2018
  })
  @IsNumber()
  yearOfPassing: number;
}

class ExperienceDetailsDto {
  @ApiProperty({
    description: 'The name of the company the user has worked at',
    example: 'Tech Corp'
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'The position held by the user in the company',
    example: 'Software Engineer'
  })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'The total years of experience the user has in this company',
    example: 3
  })
  @IsNumber()
  totalYears: number;

  @ApiProperty({
    description: 'The last drawn CTC in the company',
    example: 1200000
  })
  @IsNumber()
  lastCTC: number;
}
@ApiExtraModels(EducationDetailsDto, ExperienceDetailsDto)
export class CreateUserDto {
  @ApiProperty({
    description: 'Personal details of the user',
    type: PersonalDetailsDto
  })
  personalDetails: PersonalDetailsDto;

  @ApiProperty({
    description: 'Bank details of the user',
    type: BankDetailsDto
  })
  bankDetails: BankDetailsDto;

  @ApiProperty({
    description: 'Professional details of the user',
    type: ProfessionalDetailsDto
  })
  professionalDetails: ProfessionalDetailsDto;

  @ApiProperty({
    description: 'Current organization details of the user',
    type: CurrentOrgDto
  })
  currentOrg: CurrentOrgDto;

  @ApiProperty({
    description: 'Education details of the user',
    type: [EducationDetailsDto]
  })
  educationDetails: EducationDetailsDto[];

  @ApiProperty({
    description: 'Experience details of the user',
    type: [ExperienceDetailsDto]
  })
  experienceDetails: ExperienceDetailsDto[];

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  profilePic: MulterFile
 
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  resume: MulterFile
}
