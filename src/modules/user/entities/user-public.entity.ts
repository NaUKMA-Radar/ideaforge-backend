import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  MaxDate,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UserPublicEntity implements Omit<UserEntity, 'password' | 'refreshToken'> {
  @ApiProperty({
    description: 'The UUID of the user',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'User registration method id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
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
  firstName: string | null;

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
  lastName: string | null;

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

  @ApiProperty({ description: 'The path to the image of the user' })
  @IsString()
  @ValidateIf((_, value) => value)
  image: string | null;

  @ApiProperty({
    description: 'User creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'User last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;
}
