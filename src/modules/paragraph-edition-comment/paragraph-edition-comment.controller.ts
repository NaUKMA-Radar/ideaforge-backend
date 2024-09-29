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
import * as _ from 'lodash';
import { ParagraphEditionCommentService } from 'src/modules/paragraph-edition-comment/paragraph-edition-comment.service';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';
import { UpdateParagraphEditionCommentDto } from 'src/modules/paragraph-edition-comment/DTO/update-paragraph-edition-comment.dto';

@ApiTags(RoutesApiTags[Routes.ParagraphEditionComments])
@Controller(Routes.ParagraphEditionComments)
export class ParagraphEditionCommentController {
  constructor(private readonly paragraphEditionCommentService: ParagraphEditionCommentService) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The paragraph edition comment with requested id.',
    type: ParagraphEditionCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition comment with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph edition comment to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: ParagraphEditionCommentEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEditionCommentEntity> {
    return this.paragraphEditionCommentService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph edition comment was successfully updated.',
    type: ParagraphEditionCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition comment with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update paragraph edition comment. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph edition comment to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id')
  public async update(
    @Param('id') id: ParagraphEditionCommentEntity['id'],
    @Body() updateParagraphEditionCommentDto: UpdateParagraphEditionCommentDto,
  ): Promise<ParagraphEditionCommentEntity> {
    return this.paragraphEditionCommentService.update(id, updateParagraphEditionCommentDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph edition comment was successfully removed.',
    type: ParagraphEditionCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition comment with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph edition comment to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(
    @Param('id') id: ParagraphEditionCommentEntity['id'],
  ): Promise<ParagraphEditionCommentEntity> {
    return this.paragraphEditionCommentService.remove(id);
  }
}
