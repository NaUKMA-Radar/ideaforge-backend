import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';

export class CreateStageDto implements Pick<StageEntity, 'projectId' | 'stageTypeId'> {
  @ApiProperty({
    description: 'The UUID of the project of the stage',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  projectId: string;

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
}
