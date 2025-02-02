import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsUUID, Min, ValidateIf } from 'class-validator';
import { DocumentEntity } from 'src/modules/document/entities/document.entity';
import { CreateUserToDocumentDto } from 'src/modules/user-to-document/DTO/create-user-to-document.dto';
import { UpdateUserToDocumentDto } from 'src/modules/user-to-document/DTO/update-user-to-document.dto';
import { UserToDocumentEntity } from 'src/modules/user-to-document/entities/user-to-document.entity';

export class UpdateDocumentDto
  implements
    Pick<
      Partial<DocumentEntity>,
      'stageId' | 'documentTypeId' | 'file' | 'isFinalized' | 'initialData'
    >
{
  @ApiProperty({
    description: 'The UUID of the stage of the document',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: 'b7af9cd4-5533-4737-862b-78bce985c987',
  })
  @IsUUID()
  @ValidateIf((_, value) => value)
  stageId?: string;

  @ApiProperty({
    description: 'Document type id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ValidateIf((_, value) => value)
  documentTypeId?: number;

  @ApiProperty({ description: 'The path to the file of the document' })
  @IsString()
  @ValidateIf((_, value) => value)
  file?: string | null;

  @ApiProperty({
    description: 'Document is finalized',
    examples: [true, false],
    default: false,
  })
  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  isFinalized?: boolean;

  @ApiProperty({
    description: 'Initial data of the document',
    examples: [[{ question: 'What is your name?', answer: 'Oleksandr' }]],
    default: [{ question: 'What is your name?', answer: 'Oleksandr' }],
  })
  @Transform(({ value }) => JSON.parse(value))
  @ValidateIf((_, value) => value)
  initialData?: JsonValue;

  @ApiProperty({ description: 'The list of users to add to the document' })
  @Transform(field => field.value.map(item => ({ ...item, userRoleId: Number(item.userRoleId) })))
  @ValidateIf((_, value) => value)
  usersToAdd?: Omit<CreateUserToDocumentDto, 'documentId'>[];

  @ApiProperty({ description: 'The list of users to update in the document' })
  @Transform(field =>
    field.value.map(item => ({
      ...item,
      userRoleId: item.userRoleId ? Number(item.userRoleId) : item.userRoleId,
    })),
  )
  @ValidateIf((_, value) => value)
  usersToUpdate?: Omit<UpdateUserToDocumentDto, 'documentId'>[];

  @ApiProperty({ description: 'The list of users to remove from the document' })
  @ValidateIf((_, value) => value)
  usersToRemove?: Pick<UserToDocumentEntity, 'userId'>[];
}
