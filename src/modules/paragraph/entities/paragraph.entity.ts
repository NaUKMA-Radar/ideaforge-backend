import { ApiProperty } from '@nestjs/swagger';
import { Paragraph } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxDate,
  Min,
  ValidateIf,
} from 'class-validator';

export class ParagraphEntity implements Paragraph {
  @ApiProperty({
    description: 'The UUID of the paragraph',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'The UUID of the document of the paragraph',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  documentId: string;

  @ApiProperty({
    description: 'Paragraph ordinal id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  ordinalId: number;

  @ApiProperty({
    description: 'Paragraph is approved',
    examples: [true, false],
    default: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  isApproved: boolean;

  @ApiProperty({ description: 'Paragraph rating' })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsDefined()
  @Transform(field => parseFloat(Number(field.value).toFixed(9)))
  rating: Decimal;

  @ApiProperty({ description: 'Paragraph content' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @ApiProperty({
    description: 'Paragraph creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'Paragraph last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: 'Paragraph document nested object' })
  paragraph?: ParagraphEntity | null;
}
