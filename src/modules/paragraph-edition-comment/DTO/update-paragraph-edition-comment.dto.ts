import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';

export class UpdateParagraphEditionCommentDto
  implements Pick<Partial<ParagraphEditionCommentEntity>, 'content'>
{
  @ApiProperty({ description: 'Paragraph edition comment content' })
  @IsString()
  @ValidateIf((_, value) => value)
  content?: string;
}
