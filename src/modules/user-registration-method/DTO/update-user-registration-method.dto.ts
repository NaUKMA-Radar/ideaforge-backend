import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, ValidateIf } from 'class-validator';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.enity';

export class UpdateUserRegistrationMethodDto
  implements Pick<Partial<UserRegistrationMethodEntity>, 'name'>
{
  @ApiProperty({
    description: 'The name of the user registration method',
    examples: ['google', 'credentials'],
    default: 'google',
  })
  @MaxLength(50)
  @IsString()
  @ValidateIf((_, value) => value)
  name?: string;
}
