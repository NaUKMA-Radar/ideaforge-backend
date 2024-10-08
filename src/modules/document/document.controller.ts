import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoutesApiTags } from 'src/core/constants';
import { Auth } from 'src/core/decorators/auth.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { DocumentService } from 'src/modules/document/document.service';
import { UpdateDocumentDto } from 'src/modules/document/DTO/update-document.dto';
import { DocumentEntity } from 'src/modules/document/entities/document.entity';
import * as _ from 'lodash';
import { ParagraphService } from 'src/modules/paragraph/paragraph.service';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';
import { CreateParagraphDto } from 'src/modules/paragraph/DTO/create-paragraph.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { UpdateDocumentUploadedFiles } from 'src/modules/document/types/document.types';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

@ApiTags(RoutesApiTags[Routes.Documents])
@Controller(Routes.Documents)
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly paragraphService: ParagraphService,
  ) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The document with requested id.', type: DocumentEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The document with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the document to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: DocumentEntity['id'],
    @Query() query?: string,
  ): Promise<DocumentEntity> {
    return this.documentService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Document was successfully updated.', type: DocumentEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The document with the requested id was not found.' })
  @ApiConflictResponse({ description: 'Cannot update document. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the document to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  @Put(':id')
  public async update(
    @Param('id') id: DocumentEntity['id'],
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFiles()
    @UploadRestrictions([{ fieldname: 'file', minFileSize: 1 }])
    files: UpdateDocumentUploadedFiles,
  ): Promise<DocumentEntity> {
    return this.documentService.update(id, updateDocumentDto, files);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Document was successfully removed.', type: DocumentEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The document with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the document to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(@Param('id') id: DocumentEntity['id']): Promise<DocumentEntity> {
    return this.documentService.remove(id);
  }

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'The paragraph for the document with specified id was successfully created.',
    type: ParagraphEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The document with the requested id was not found.' })
  @ApiConflictResponse({
    description:
      'Cannot create the paragraph for the document with specified id. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the document to add new paragraph to',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Post(':id/paragraphs')
  public async createParagraph(
    @Param('id') id: DocumentEntity['id'],
    @Body() createParagraphDto: CreateParagraphDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphEntity> {
    return this.paragraphService.create({
      ...createParagraphDto,
      documentId: id,
      authorId: user.id,
    });
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of paragraphs for the document with specified id',
    type: [ParagraphEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The document with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the document to get the list of paragraphs',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id/paragraphs')
  public async findAllParagraphsByDocumentId(
    @Param('id') id: DocumentEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEntity[]> {
    return this.paragraphService.findAll(
      _.merge(deserializeQueryString(query), { where: { documentId: id } }),
    );
  }
}
