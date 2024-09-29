import { ApiProperty } from '@nestjs/swagger';
import { ParagraphComment } from '@prisma/client';
import { IsDate, IsDefined, IsNotEmpty, IsString, IsUUID, MaxDate } from 'class-validator';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

export class ParagraphCommentEntity implements ParagraphComment {
  @ApiProperty({
    description: 'The UUID of the paragraph comment',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'The UUID of the paragraph of the paragraph comment',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  paragraphId: string;

  @ApiProperty({
    description: 'The UUID of the author of the paragraph comment',
    examples: [
      '00ceff74-de99-4d15-a30b-cf8f28fa1a48',
      'b7af9cd4-5533-4737-862b-78bce985c987',
      '989d32c2-abd4-43d3-a420-ee175ae16b98',
    ],
    default: '00ceff74-de99-4d15-a30b-cf8f28fa1a48',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  authorId: string;

  @ApiProperty({
    description: 'The UUID of the parent paragraph comment of the paragraph comment',
    examples: [
      'd363c477-8368-46e7-93f9-f81fb9c0e6a2',
      'b7af9cd4-5533-4737-862b-78bce985c987',
      '989d32c2-abd4-43d3-a420-ee175ae16b98',
    ],
    default: 'd363c477-8368-46e7-93f9-f81fb9c0e6a2',
  })
  @IsUUID()
  @IsDefined()
  replyToParagraphCommentId: string | null;

  @ApiProperty({ description: 'Paragraph comment content' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @ApiProperty({
    description: 'Paragraph comment creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Paragraph comment last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'Paragraph comment paragraph nested object' })
  paragraph?: ParagraphEntity | null;

  @ApiProperty({ description: 'Paragraph comment author nested object' })
  author?: UserPublicEntity | null;

  @ApiProperty({ description: 'Paragraph comment parent paragraph comment nested object' })
  replyToParagraphComment?: ParagraphCommentEntity | null;

  @ApiProperty({ description: 'The list of replies for paragraph comment' })
  paragraphComments?: ParagraphCommentEntity[];
}
