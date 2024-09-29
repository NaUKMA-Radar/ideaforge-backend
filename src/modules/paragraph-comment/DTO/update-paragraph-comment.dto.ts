import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ParagraphCommentEntity } from 'src/modules/paragraph-comment/entities/paragraph-comment.entity';

export class UpdateParagraphCommentDto implements Pick<Partial<ParagraphCommentEntity>, 'content'> {
  @ApiProperty({ description: 'Paragraph comment content' })
  @IsString()
  @ValidateIf((_, value) => value)
  content?: string;
}
