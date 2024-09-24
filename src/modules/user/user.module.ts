import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRegistrationMethodModule } from 'src/modules/user-registration-method/user-registration-method.module';

@Module({
  imports: [UserRegistrationMethodModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
