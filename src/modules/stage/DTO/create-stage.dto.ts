import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Min, ValidateIf } from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { CreateUserToStageDto } from 'src/modules/user-to-stage/DTO/create-user-to-stage.dto';

export class CreateStageDto
  implements Pick<Partial<StageEntity>, 'projectId'>, Pick<StageEntity, 'stageTypeId'>
{
  @ApiProperty({
    description: 'The UUID of the project of the stage',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  projectId?: string;

  @ApiProperty({
    description: 'Stage type id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  stageTypeId: number;

  @ApiProperty({ description: 'The list of users to add to the stage' })
  @Transform(field => field.value.map(item => ({ ...item, userRoleId: Number(item.userRoleId) })))
  @ValidateIf((_, value) => value)
  usersToAdd?: Omit<CreateUserToStageDto, 'stageId'>[];
}
