import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, ValidateIf } from 'class-validator';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { CreateUserToProjectDto } from 'src/modules/user-to-project/DTO/create-user-to-project.dto';
import { UpdateUserToProjectDto } from 'src/modules/user-to-project/DTO/update-user-to-project.dto';
import { UserToProjectEntity } from 'src/modules/user-to-project/entities/user-to-project.entity';

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

  @ApiProperty({ description: 'The list of users to add to the project' })
  @Transform(field => field.value.map(item => ({ ...item, userRoleId: Number(item.userRoleId) })))
  @ValidateIf((_, value) => value)
  usersToAdd?: Omit<CreateUserToProjectDto, 'projectId'>[];

  @ApiProperty({ description: 'The list of users to update in the project' })
  @Transform(field =>
    field.value.map(item => ({
      ...item,
      userRoleId: item.userRoleId ? Number(item.userRoleId) : item.userRoleId,
    })),
  )
  @ValidateIf((_, value) => value)
  usersToUpdate?: Omit<UpdateUserToProjectDto, 'projectId'>[];

  @ApiProperty({ description: 'The list of users to remove from the project' })
  @ValidateIf((_, value) => value)
  usersToRemove?: Pick<UserToProjectEntity, 'userId'>[];
}
