import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { StepperFormService } from './stepper-form.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/stepper-form.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { File as MulterFile } from 'multer';

interface CustomRequest extends Request {
  files?: {
    [fieldname: string]: MulterFile[];
  };
}

@ApiTags('stepper-form') 
@Controller('stepper-form')
export class StepperFormController {
  constructor(private readonly stepperFormService: StepperFormService) {}

  @Post('create-user')
  @ApiOperation({ summary: 'Create a new user with details' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({ type: CreateUserDto }) 
  @ApiConsumes('multipart/form-data')
  async createUser(@Body() data: CreateUserDto, @Req() req: CustomRequest) {

    if (typeof data.personalDetails === 'string') {
      data.personalDetails = JSON.parse(data.personalDetails);
    }
  
    if (typeof data.professionalDetails === 'string') {
      data.professionalDetails = JSON.parse(data.professionalDetails);
    }
    if (req.files) {
      if (req.files['profilePic']) {
        const profilePicUrl = `http://localhost:7001/uploads/${req.files['profilePic'][0].filename}`;
        data.personalDetails.profilePic = profilePicUrl;
      }
      if (req.files['resume']) {
        const resumeUrl = `http://localhost:7001/uploads/${req.files['resume'][0].filename}`;
        data.professionalDetails.uploadedResume = resumeUrl;
      }
    }

    return this.stepperFormService.createUserWithDetails(data);
  }

  @Get('get-user-list')
  @ApiOperation({ summary: 'Get a list of all users' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getUser() {
    return this.stepperFormService.getUserList();
  }

  @Get('get-user-details/:id')
  @ApiOperation({ summary: 'Get details of a specific user' })
  @ApiResponse({ status: 200, description: 'User details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', description: 'User ID', example: '507f1f77bcf86cd799439011' })
  async getUserDetails(@Param('id') id: string) {
    return this.stepperFormService.getUserDetails(id);
  }

  @Put('update-user-details/:id')
  @ApiOperation({ summary: 'Update details of a specific user' })
  @ApiResponse({ status: 200, description: 'User details updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', description: 'User ID', example: '507f1f77bcf86cd799439011' })
  @ApiBody({ type: CreateUserDto }) 
  @ApiConsumes('multipart/form-data') 
  async updateUserDetails(
    @Param('id') userId: string,
    @Body() data: any,
    @Req() req: CustomRequest,
  ) {
    if (typeof data.personalDetails === 'string') {
      data.personalDetails = JSON.parse(data.personalDetails);
    }
  
    if (typeof data.professionalDetails === 'string') {
      data.professionalDetails = JSON.parse(data.professionalDetails);
    }

    if (req.files) {
      if (req.files['profilePic']) {
        const profilePicUrl = `http://localhost:7001/uploads/${req.files['profilePic'][0].filename}`;
        data.personalDetails.profilePic = profilePicUrl;
      }
      if (req.files['resume']) {
        const resumeUrl = `http://localhost:7001/uploads/${req.files['resume'][0].filename}`;
        data.professionalDetails.uploadedResume = resumeUrl;
      }
    }

    return this.stepperFormService.updateUserWithDetails(data, userId);
  }

  @Delete('delete-user-details/:id')
  @ApiOperation({ summary: 'Delete a specific user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', description: 'User ID', example: '507f1f77bcf86cd799439011' })
  async deleteUserWithDetails(@Param('id') userId: string) {
    return this.stepperFormService.deleteUserWithDetails(userId);
  }
}