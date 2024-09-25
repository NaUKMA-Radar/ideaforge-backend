import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxDate,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { UserToProjectEntity } from 'src/modules/user-to-project/entities/user-to-project.entity';

export class ProjectEntity implements Project {
  @ApiProperty({
    description: 'The UUID of the project',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'The name of the project',
    examples: ['Project 1', 'Test project'],
    default: 'Project 1',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: 'The url of the project',
    examples: ['https://project.com'],
    default: 'https://project.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  url: string;

  @ApiProperty({
    description: 'Social media links of the project',
    examples: [['https://github.com', 'https://youtube.com']],
    default: ['https://github.com', 'https://youtube.com'],
  })
  @IsNotEmpty()
  @IsDefined()
  socialMediaLinks: JsonValue;

  @ApiProperty({
    description: 'The description of the project',
    examples: ['Project description'],
    default: 'Project description',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @ApiProperty({ description: 'The path to the image of the project' })
  @IsString()
  @ValidateIf((_, value) => value)
  image: string | null;

  @ApiProperty({
    description: 'Project creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Project last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'The list of users for the project' })
  usersToProjects?: UserToProjectEntity[];

  @ApiProperty({ description: 'The list of stages for the project' })
  stages?: StageEntity[];
}
