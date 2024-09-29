import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';

export class UpdateParagraphEditionDto implements Pick<Partial<ParagraphEditionEntity>, 'content'> {
  @ApiProperty({ description: 'Paragraph edition content' })
  @IsString()
  @ValidateIf((_, value) => value)
  content?: string;
}
