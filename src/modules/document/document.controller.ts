import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import {
  ApiConflictResponse,
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

@ApiTags(RoutesApiTags[Routes.Documents])
@Controller(Routes.Documents)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

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
  @Put(':id')
  public async update(
    @Param('id') id: DocumentEntity['id'],
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    return this.documentService.update(id, updateDocumentDto);
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
}
