import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Min, ValidateIf } from 'class-validator';
import { UserToStageEntity } from 'src/modules/user-to-stage/entities/user-to-stage.entity';

export class UpdateUserToStageDto
  implements
    Pick<UserToStageEntity, 'userId' | 'stageId'>,
    Pick<Partial<UserToStageEntity>, 'userRoleId'>
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
    description: 'The UUID of the stage',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  stageId: string;

  @ApiProperty({
    description: 'User role id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @ValidateIf((_, value) => value)
  userRoleId?: number;
}
