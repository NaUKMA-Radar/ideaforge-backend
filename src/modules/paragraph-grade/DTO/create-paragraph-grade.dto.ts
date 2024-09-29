import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Max, Min, ValidateIf } from 'class-validator';
import { ParagraphGradeEntity } from 'src/modules/paragraph-grade/entities/paragraph-grade.entity';

export class CreateParagraphGradeDto
  implements
    Pick<ParagraphGradeEntity, 'grade'>,
    Pick<Partial<ParagraphGradeEntity>, 'userId' | 'paragraphId'>
{
  @ApiProperty({
    description: 'The UUID of the user',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  userId?: string;

  @ApiProperty({
    description: 'The UUID of the paragraph',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  paragraphId?: string;

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
}
