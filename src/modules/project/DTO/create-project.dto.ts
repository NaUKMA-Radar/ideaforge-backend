import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsDefined, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';

export class CreateProjectDto
  implements
    Pick<ProjectEntity, 'name' | 'url' | 'socialMediaLinks' | 'description'>,
    Pick<Partial<ProjectEntity>, 'image'>
{
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
  image?: string | null;
}
