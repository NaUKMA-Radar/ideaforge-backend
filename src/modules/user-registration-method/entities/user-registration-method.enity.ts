import { ApiProperty } from '@nestjs/swagger';
import { UserRegistrationMethod } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UserRegistrationMethodEntity implements UserRegistrationMethod {
  @ApiProperty({
    description: 'The id of the user registration method',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;

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

  @ApiProperty({
    description: 'User registration method creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'User registration method last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'The list of users for the user registration method' })
  users?: UserEntity[];
}
