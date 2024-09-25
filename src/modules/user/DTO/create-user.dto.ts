import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateUserDto
  implements
    Pick<UserEntity, 'userRegistrationMethodId' | 'email'>,
    Pick<Partial<UserEntity>, 'firstName' | 'lastName' | 'password' | 'image'>
{
  @ApiProperty({
    description: 'User registration method id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @Transform(field => Number(field.value))
  userRegistrationMethodId: number;

  @ApiProperty({
    description: 'The first name of the user',
    examples: ['Petro', 'Oleksandr', 'Illia', 'Nadiia', 'Kyrylo'],
    default: 'Petro',
  })
  @Matches(/^[\p{Letter}\p{Mark}\- ]+$/gu)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((_, value) => value)
  firstName?: string | null;

  @ApiProperty({
    description: 'The last name of the user',
    examples: ['Yaremenko', 'Igumnov', 'Biloverbenko', 'Yemets', 'Gorokhovsky'],
    default: 'Igumnov',
  })
  @Matches(/^[\p{Letter}\p{Mark}\- ]+$/gu)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((_, value) => value)
  lastName?: string | null;

  @ApiProperty({
    description: 'The email of the user',
    examples: [
      'petro.yaremenko@gmail.com',
      'oleksandr.igumnov@gmail.com',
      'illia.biloverbenko@gmail.com',
      'nadiia.yemets@gmail.com',
      'kyrylo.gorokhovsky@gmail.com',
    ],
    default: 'petro.yaremenko@gmail.com',
  })
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    examples: [
      '8c2e53731925c9addc09145a7f1ea196f753cb115e8c9dfbb8fdcbe855a3beec',
      '32c9a2ec9e0c4e3a4cc93012b2e72c04b2c395578dcc80b535e951b452eaf9a3',
    ],
    default: '8c2e53731925c9addc09145a7f1ea196f753cb115e8c9dfbb8fdcbe855a3beec',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((_, value) => value)
  password?: string | null;

  @ApiProperty({ description: 'The path to the image of the user' })
  @IsString()
  @ValidateIf((_, value) => value)
  image?: string | null;
}
