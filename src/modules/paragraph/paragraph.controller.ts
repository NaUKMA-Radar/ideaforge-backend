import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
import { RoutesApiTags } from 'src/core/constants';
import { Auth } from 'src/core/decorators/auth.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import * as _ from 'lodash';
import { ParagraphService } from 'src/modules/paragraph/paragraph.service';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';
import { UpdateParagraphDto } from 'src/modules/paragraph/DTO/update-paragraph.dto';
import { CreateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/create-paragraph-edition.dto';
import { ParagraphEditionService } from 'src/modules/paragraph-edition/paragraph-edition.service';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';

@ApiTags(RoutesApiTags[Routes.Paragraphs])
@Controller(Routes.Paragraphs)
export class ParagraphController {
  constructor(
    private readonly paragraphService: ParagraphService,
    private readonly paragraphEditionService: ParagraphEditionService,
  ) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The paragraph with requested id.', type: ParagraphEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: ParagraphEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEntity> {
    return this.paragraphService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Paragraph was successfully updated.', type: ParagraphEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiConflictResponse({ description: 'Cannot update paragraph. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id')
  public async update(
    @Param('id') id: ParagraphEntity['id'],
    @Body() updateParagraphDto: UpdateParagraphDto,
  ): Promise<ParagraphEntity> {
    return this.paragraphService.update(id, updateParagraphDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Paragraph was successfully removed.', type: ParagraphEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(@Param('id') id: ParagraphEntity['id']): Promise<ParagraphEntity> {
    return this.paragraphService.remove(id);
  }

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description:
      'The paragraph edition for the paragraph with specified id was successfully created.',
    type: ParagraphEditionEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiConflictResponse({
    description:
      'Cannot create the paragraph edition for the paragraph with specified id. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to add new paragraph edition to',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Post(':id/editions')
  public async createParagraphEdition(
    @Param('id') id: ParagraphEntity['id'],
    @Body() createParagraphEditionDto: CreateParagraphEditionDto,
  ): Promise<ParagraphEditionEntity> {
    return this.paragraphEditionService.create({ ...createParagraphEditionDto, paragraphId: id });
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of paragraph editions for the paragraph with specified id',
    type: [ParagraphEditionEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to get the list of paragraph editions',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id/editions')
  public async findAllParagraphsEditionsByParagraphId(
    @Param('id') id: ParagraphEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEditionEntity[]> {
    return this.paragraphEditionService.findAll(
      _.merge(deserializeQueryString(query), { where: { paragraphId: id } }),
    );
  }
}
