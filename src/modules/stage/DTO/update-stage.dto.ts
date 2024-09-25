import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min, ValidateIf } from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { CreateUserToStageDto } from 'src/modules/user-to-stage/DTO/create-user-to-stage.dto';
import { UpdateUserToStageDto } from 'src/modules/user-to-stage/DTO/update-user-to-stage.entity';
import { UserToStageEntity } from 'src/modules/user-to-stage/entities/user-to-stage.entity';

export class UpdateStageDto implements Pick<Partial<StageEntity>, 'stageTypeId'> {
  @ApiProperty({
    description: 'Stage type id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @ValidateIf((_, value) => value)
  stageTypeId?: number;

  @ApiProperty({ description: 'The list of users to add to the stage' })
  @Transform(field => field.value.map(item => ({ ...item, userRoleId: Number(item.userRoleId) })))
  @ValidateIf((_, value) => value)
  usersToAdd?: Omit<CreateUserToStageDto, 'stageId'>[];

  @ApiProperty({ description: 'The list of users to update in the stage' })
  @Transform(field =>
    field.value.map(item => ({
      ...item,
      userRoleId: item.userRoleId ? Number(item.userRoleId) : item.userRoleId,
    })),
  )
  @ValidateIf((_, value) => value)
  usersToUpdate?: Omit<UpdateUserToStageDto, 'stageId'>[];

  @ApiProperty({ description: 'The list of users to remove from the stage' })
  @ValidateIf((_, value) => value)
  usersToRemove?: Pick<UserToStageEntity, 'userId'>[];
}
