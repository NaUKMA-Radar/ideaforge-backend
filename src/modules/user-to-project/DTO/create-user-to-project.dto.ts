import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { UserToProjectEntity } from 'src/modules/user-to-project/entities/user-to-project.entity';

export class CreateUserToProjectDto
  implements Pick<UserToProjectEntity, 'userId' | 'projectId' | 'userRoleId'>
{
  @ApiProperty({
    description: 'The UUID of the user',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  userId: string;

  @ApiProperty({
    description: 'The UUID of the project',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  projectId: string;

  @ApiProperty({
    description: 'User role id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  userRoleId: number;
}
