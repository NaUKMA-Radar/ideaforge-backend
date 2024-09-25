import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.enity';

export class CreateUserRegistrationMethodDto implements Pick<UserRegistrationMethodEntity, 'name'> {
  @ApiProperty({
    description: 'The name of the user registration method',
    examples: ['google', 'credentials'],
    default: 'google',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
