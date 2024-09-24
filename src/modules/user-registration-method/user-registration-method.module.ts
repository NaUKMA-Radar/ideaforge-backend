import { Module } from '@nestjs/common';
import { UserRegistrationMethodController } from 'src/modules/user-registration-method/user-registration-method.controller';
import { UserRegistrationMethodService } from 'src/modules/user-registration-method/user-registration-method.service';

@Module({
  controllers: [UserRegistrationMethodController],
  providers: [UserRegistrationMethodService],
})
export class UserRegistrationMethodModule {}
