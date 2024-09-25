import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { UserToProjectEntity } from 'src/modules/user-to-project/entities/user-to-project.entity';

export class UserRoleEntity implements UserRole {
  @ApiProperty({
    description: 'The id of the user role',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;

  @ApiProperty({
    description: 'The name of the user role',
    examples: ['founder', 'editor', 'menthor'],
    default: 'founder',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: 'User role creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'User role last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'The list of users in projects for the user role' })
  usersToProjects?: UserToProjectEntity[];

  @ApiProperty({ description: 'The list of users in stages for the user role' })
  usersToStages?: any[]; // TODO: Replace with UserToStageEntity[] once it is implemented

  @ApiProperty({ description: 'The list of users in documents for the user role' })
  usersToDocuments?: any[]; // TODO: Replace with UserToDocumentEntity[] once it is implemented
}
