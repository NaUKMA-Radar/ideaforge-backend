import { ApiProperty } from '@nestjs/swagger';
import { UserToStage } from '@prisma/client';
import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsUUID, MaxDate, Min } from 'class-validator';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { UserRoleEntity } from 'src/modules/user-role/entities/user-role.entity';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

export class UserToStageEntity implements UserToStage {
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
  @IsNotEmpty()
  @IsDefined()
  userRoleId: number;

  @ApiProperty({
    description: 'User to stage creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'User to stage last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'User nested object' })
  user?: UserPublicEntity | null;

  @ApiProperty({ description: 'Stage nested object' })
  stage?: StageEntity | null;

  @ApiProperty({ description: 'User role nested object' })
  userRole?: UserRoleEntity | null;
}
