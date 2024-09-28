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
import { ParagraphEditionService } from 'src/modules/paragraph-edition/paragraph-edition.service';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';
import { UpdateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/update-entity-edition.dto';

@ApiTags(RoutesApiTags[Routes.ParagraphEditions])
@Controller(Routes.ParagraphEditions)
export class ParagraphEditionController {
  constructor(private readonly paragraphEditionService: ParagraphEditionService) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The paragraph edition with requested id.',
    type: ParagraphEditionEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph edition to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEditionEntity> {
    return this.paragraphEditionService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph edition was successfully updated.',
    type: ParagraphEditionEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update paragraph edition. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph edition to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id')
  public async update(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Body() updateParagraphEditionDto: UpdateParagraphEditionDto,
  ): Promise<ParagraphEditionEntity> {
    return this.paragraphEditionService.update(id, updateParagraphEditionDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph edition was successfully removed.',
    type: ParagraphEditionEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph edition to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(
    @Param('id') id: ParagraphEditionEntity['id'],
  ): Promise<ParagraphEditionEntity> {
    return this.paragraphEditionService.remove(id);
  }
}
