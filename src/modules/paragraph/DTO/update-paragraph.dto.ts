import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, ValidateIf } from 'class-validator';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';

export class UpdateParagraphDto implements Pick<Partial<ParagraphEntity>, 'ordinalId'> {
  @ApiProperty({
    description: 'Paragraph ordinal id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @ValidateIf((_, value) => value)
  ordinalId: number;
}
