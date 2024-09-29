import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, ValidateIf } from 'class-validator';
import { ParagraphGradeEntity } from 'src/modules/paragraph-grade/entities/paragraph-grade.entity';

export class UpdateParagraphGradeDto implements Pick<Partial<ParagraphGradeEntity>, 'grade'> {
  @ApiProperty({
    description: 'Paragraph grade',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @Max(10)
  @IsNumber()
  @ValidateIf((_, value) => value)
  grade?: number;
}
