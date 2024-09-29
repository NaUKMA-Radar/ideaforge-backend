import { ApiProperty } from '@nestjs/swagger';
import { ParagraphGrade } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Max,
  MaxDate,
  Min,
} from 'class-validator';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

export class ParagraphGradeEntity implements ParagraphGrade {
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
    description: 'The UUID of the paragraph',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  paragraphId: string;

  @ApiProperty({
    description: 'Paragraph grade',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @Max(10)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  grade: number;

  @ApiProperty({
    description: 'Paragraph grade creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Paragraph grade last updated date and time',
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

  @ApiProperty({ description: 'Paragraph nested object' })
  paragraph?: ParagraphEntity | null;
}
