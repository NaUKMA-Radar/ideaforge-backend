import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
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
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.enity';
import { UserToProjectEntity } from 'src/modules/user-to-project/entities/user-to-project.entity';
import { UserToStageEntity } from 'src/modules/user-to-stage/entities/user-to-stage.entity';

export class UserEntity implements User {
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
  password: string | null;

  @ApiProperty({ description: 'The path to the image of the user' })
  @IsString()
  @ValidateIf((_, value) => value)
  image: string | null;

  @ApiProperty({
    description: 'The refresh token of the user',
    examples: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSWd1bW5vdiIsImlhdCI6MTUxNjIzOTAyMn0.fhRab81aDGeIyrQPsQDk5-EoFmX93_ImE4szjSFZE08',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhlbGVuIFNtaXRoIiwiaWF0IjoxNTE2MjM5MDIyfQ.gpUgoLzilOQcnkgQZIZRd1TGlcT6_A0RMz30OwB8z4A',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    ],
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSWd1bW5vdiIsImlhdCI6MTUxNjIzOTAyMn0.fhRab81aDGeIyrQPsQDk5-EoFmX93_ImE4szjSFZE08',
  })
  @IsString()
  @ValidateIf((_, value) => value)
  refreshToken: string | null;

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

  @ApiProperty({ description: "User's registration method nested object" })
  userRegistrationMethod?: UserRegistrationMethodEntity | null;

  @ApiProperty({ description: 'The list of projects the user is member of' })
  usersToProjects?: UserToProjectEntity[];

  @ApiProperty({ description: 'The list of stages the user is member of' })
  usersToStages?: UserToStageEntity[];
}
