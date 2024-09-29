import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, ValidateIf } from 'class-validator';
import { ParagraphEditionGradeEntity } from 'src/modules/paragraph-edition-grade/entities/paragraph-edition-grade.entity';

export class UpdateParagraphEditionGradeDto
  implements Pick<Partial<ParagraphEditionGradeEntity>, 'grade'>
{
  @ApiProperty({
    description: 'Paragraph edition grade',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @Max(10)
  @IsNumber()
  @ValidateIf((_, value) => value)
  grade?: number;
}
