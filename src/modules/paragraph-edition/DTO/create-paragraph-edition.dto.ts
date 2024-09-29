import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';

export class CreateParagraphEditionDto
  implements
    Pick<ParagraphEditionEntity, 'content'>,
    Pick<Partial<ParagraphEditionEntity>, 'paragraphId'>
{
  @ApiProperty({
    description: 'The UUID of the paragraph of the paragraph edition',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  paragraphId?: string;

  @ApiProperty({ description: 'Paragraph edition content' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;
}
