import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsString, MaxLength, ValidateIf } from 'class-validator';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';

export class UpdateProjectDto
  implements
    Pick<Partial<ProjectEntity>, 'name' | 'url' | 'socialMediaLinks' | 'description' | 'image'>
{
  @ApiProperty({
    description: 'The name of the project',
    examples: ['Project 1', 'Test project'],
    default: 'Project 1',
  })
  @MaxLength(50)
  @IsString()
  @ValidateIf((_, value) => value)
  name?: string;

  @ApiProperty({
    description: 'The url of the project',
    examples: ['https://project.com'],
    default: 'https://project.com',
  })
  @IsString()
  @ValidateIf((_, value) => value)
  url?: string;

  @ApiProperty({
    description: 'Social media links of the project',
    examples: [['https://github.com', 'https://youtube.com']],
    default: ['https://github.com', 'https://youtube.com'],
  })
  @ValidateIf((_, value) => value)
  socialMediaLinks?: JsonValue;

  @ApiProperty({
    description: 'The description of the project',
    examples: ['Project description'],
    default: 'Project description',
  })
  @IsString()
  @ValidateIf((_, value) => value)
  description?: string;

  @ApiProperty({ description: 'The path to the image of the project' })
  @IsString()
  @ValidateIf((_, value) => value)
  image?: string | null;
}
