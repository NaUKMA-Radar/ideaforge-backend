import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, ValidateIf } from 'class-validator';
import { StageTypeEntity } from 'src/modules/stage-type/entities/stage-type.entity';

export class UpdateStageTypeDto implements Pick<Partial<StageTypeEntity>, 'name'> {
  @ApiProperty({
    description: 'The name of the stage type',
    examples: ['pitchdeck'],
    default: 'pitchdeck',
  })
  @MaxLength(50)
  @IsString()
  @ValidateIf((_, value) => value)
  name?: string;
}
