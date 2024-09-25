import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, ValidateIf } from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';

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
}
