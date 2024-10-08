import { ApiProperty } from '@nestjs/swagger';
import { UserRegistrationMethod } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  MaxDate,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { ParagraphCommentEntity } from 'src/modules/paragraph-comment/entities/paragraph-comment.entity';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';
import { ParagraphEditionGradeEntity } from 'src/modules/paragraph-edition-grade/entities/paragraph-edition-grade.entity';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';
import { ParagraphGradeEntity } from 'src/modules/paragraph-grade/entities/paragraph-grade.entity';
import { UserToDocumentEntity } from 'src/modules/user-to-document/entities/user-to-document.entity';
import { UserToProjectEntity } from 'src/modules/user-to-project/entities/user-to-project.entity';
import { UserToStageEntity } from 'src/modules/user-to-stage/entities/user-to-stage.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UserPublicEntity implements Omit<UserEntity, 'password' | 'refreshToken'> {
  @ApiProperty({
    description: 'The UUID of the user',
    examples: ['b7af9cd4-5533-4737-862b-78bce985c987', '989d32c2-abd4-43d3-a420-ee175ae16b98'],
    default: '989d32c2-abd4-43d3-a420-ee175ae16b98',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @ApiProperty({
    description: 'User registration method id',
    examples: [1, 2, 3, 4, 5],
    default: 1,
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  userRegistrationMethodId: number;

  @ApiProperty({
    description: 'The first name of the user',
    examples: ['Petro', 'Oleksandr', 'Illia', 'Nadiia', 'Kyrylo'],
    default: 'Petro',
  })
  @Matches(/^[\p{Letter}\p{Mark}\- ]+$/gu)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((_, value) => value)
  firstName: string | null;

  @ApiProperty({
    description: 'The last name of the user',
    examples: ['Yaremenko', 'Igumnov', 'Biloverbenko', 'Yemets', 'Gorokhovsky'],
    default: 'Igumnov',
  })
  @Matches(/^[\p{Letter}\p{Mark}\- ]+$/gu)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((_, value) => value)
  lastName: string | null;

  @ApiProperty({
    description: 'The email of the user',
    examples: [
      'petro.yaremenko@gmail.com',
      'oleksandr.igumnov@gmail.com',
      'illia.biloverbenko@gmail.com',
      'nadiia.yemets@gmail.com',
      'kyrylo.gorokhovsky@gmail.com',
    ],
    default: 'petro.yaremenko@gmail.com',
  })
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @ApiProperty({ description: 'The path to the image of the user' })
  @IsString()
  @ValidateIf((_, value) => value)
  image: string | null;

  @ApiProperty({
    description: 'User creation date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  createdAt: Date;

  @ApiProperty({
    description: 'User last updated date and time',
    examples: [new Date('2024-01-03'), new Date('2023-11-02'), new Date('2023-06-30')],
    default: new Date('2024-01-03'),
  })
  @IsDate()
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDefined()
  updatedAt: Date;

  @ApiProperty({ description: "User's registration method nested object" })
  userRegistrationMethod?: UserRegistrationMethod | null;

  @ApiProperty({ description: 'The list of projects the user is member of' })
  usersToProjects?: UserToProjectEntity[];

  @ApiProperty({ description: 'The list of stages the user is member of' })
  usersToStages?: UserToStageEntity[];

  @ApiProperty({ description: 'The list of documents the user is member of' })
  usersToDocuments?: UserToDocumentEntity[];

  @ApiProperty({ description: 'The list of paragraph comments of the user' })
  paragraphComments?: ParagraphCommentEntity[];

  @ApiProperty({ description: 'The list of paragraph editions of the user' })
  paragraphEditions?: ParagraphEditionEntity[];

  @ApiProperty({ description: 'The list of paragraph edition comments of the user' })
  paragraphEditionComments?: ParagraphEditionCommentEntity[];

  @ApiProperty({ description: 'The list of paragraph grades of the user' })
  paragraphGrades?: ParagraphGradeEntity[];

  @ApiProperty({ description: 'The list of paragraph edition grades of the user' })
  paragraphEditionGrades?: ParagraphEditionGradeEntity[];
}
