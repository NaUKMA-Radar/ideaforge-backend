import { ApiProperty } from '@nestjs/swagger';
import { StageType } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class StageTypeEntity implements StageType {
  @ApiProperty({
    description: 'The id of the stage type',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;

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

  @ApiProperty({
    description: 'Stage type creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Stage type last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'The list of stages for the stage type' })
  stages?: StageEntity[];
}
