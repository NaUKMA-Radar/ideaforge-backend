import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { StageTypeEntity } from 'src/modules/stage-type/entities/stage-type.entity';

export class CreateStageTypeDto implements Pick<StageTypeEntity, 'name'> {
  @ApiProperty({
    description: 'The name of the stage type',
    examples: ['pitchdeck'],
    default: 'pitchdeck',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
