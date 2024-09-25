import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import * as _ from 'lodash';
import { RoutesApiTags } from 'src/core/constants';
import { Auth } from 'src/core/decorators/auth.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { DocumentTypeService } from 'src/modules/document-type/document-type.service';
import { CreateDocumentTypeDto } from 'src/modules/document-type/DTO/create-document-type.dto';
import { UpdateDocumentTypeDto } from 'src/modules/document-type/DTO/update-document-type.dto';
import { DocumentTypeEntity } from 'src/modules/document-type/entities/document-type.entity';

@ApiTags(RoutesApiTags[Routes.DocumentTypes])
@Controller(Routes.DocumentTypes)
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Document type was successfully created.',
    type: DocumentTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({
    description: 'Cannot create document type. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post()
  public async create(
    @Body() createDocumentTypeDto: CreateDocumentTypeDto,
  ): Promise<DocumentTypeEntity> {
    return this.documentTypeService.create(createDocumentTypeDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of document types',
    type: [DocumentTypeEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<DocumentTypeEntity[]> {
    return this.documentTypeService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The document type with requested id.',
    type: DocumentTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The document type with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the document type to be found.',
    schema: { example: 1 },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: DocumentTypeEntity['id'],
    @Query() query?: string,
  ): Promise<DocumentTypeEntity> {
    return this.documentTypeService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Document type was successfully updated.',
    type: DocumentTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The document type with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update document type. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the document type to be updated',
    schema: { example: 1 },
  })
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: DocumentTypeEntity['id'],
    @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
  ): Promise<DocumentTypeEntity> {
    return this.documentTypeService.update(id, updateDocumentTypeDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Document type was successfully removed.',
    type: DocumentTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The document type with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the document type to be deleted',
    schema: { example: 1 },
  })
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: DocumentTypeEntity['id'],
  ): Promise<DocumentTypeEntity> {
    return this.documentTypeService.remove(id);
  }
}
