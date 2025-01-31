import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StepperFormModule } from './stepper-form/stepper-form.module';
import { ConfigModule } from '@nestjs/config';
import { StepperFormService } from './stepper-form/stepper-form.service';
import { UploadMiddleware } from './middlewares/upload.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/stepper-form-db'),
    StepperFormModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadMiddleware)
      .forRoutes(
        'stepper-form/create-user',
        'stepper-form/update-user-details/:id'
      );
  }
}

