import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';

export class CreateParagraphEditionCommentDto
  implements
    Pick<ParagraphEditionCommentEntity, 'content'>,
    Pick<
      Partial<ParagraphEditionCommentEntity>,
      'replyToParagraphEditionCommentId' | 'paragraphEditionId' | 'authorId'
    >
{
  @ApiProperty({
    description: 'The UUID of the paragraph edition of the paragraph edition comment',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  paragraphEditionId?: string;

  @ApiProperty({
    description: 'The UUID of the author of the paragraph edition comment',
    examples: [
      '00ceff74-de99-4d15-a30b-cf8f28fa1a48',
      'b7af9cd4-5533-4737-862b-78bce985c987',
      '989d32c2-abd4-43d3-a420-ee175ae16b98',
    ],
    default: '00ceff74-de99-4d15-a30b-cf8f28fa1a48',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  authorId?: string;

  @ApiProperty({
    description: 'The UUID of the parent paragraph edition comment of the paragraph edition comment',
    examples: [
      'd363c477-8368-46e7-93f9-f81fb9c0e6a2',
      'b7af9cd4-5533-4737-862b-78bce985c987',
      '989d32c2-abd4-43d3-a420-ee175ae16b98',
    ],
    default: 'd363c477-8368-46e7-93f9-f81fb9c0e6a2',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  replyToParagraphEditionCommentId?: string | null;

  @ApiProperty({ description: 'Paragraph edition comment content' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;
}
