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
import { ParagraphCommentService } from 'src/modules/paragraph-comment/paragraph-comment.service';
import { ParagraphCommentEntity } from 'src/modules/paragraph-comment/entities/paragraph-comment.entity';
import { UpdateParagraphCommentDto } from 'src/modules/paragraph-comment/DTO/update-paragraph-comment.dto';

@ApiTags(RoutesApiTags[Routes.ParagraphComments])
@Controller(Routes.ParagraphComments)
export class ParagraphCommentController {
  constructor(private readonly paragraphCommentService: ParagraphCommentService) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The paragraph comment with requested id.',
    type: ParagraphCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph comment with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph comment to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: ParagraphCommentEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphCommentEntity> {
    return this.paragraphCommentService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph comment was successfully updated.',
    type: ParagraphCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph comment with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update paragraph comment. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph comment to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id')
  public async update(
    @Param('id') id: ParagraphCommentEntity['id'],
    @Body() updateParagraphCommentDto: UpdateParagraphCommentDto,
  ): Promise<ParagraphCommentEntity> {
    return this.paragraphCommentService.update(id, updateParagraphCommentDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph comment was successfully removed.',
    type: ParagraphCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph comment with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph comment to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(
    @Param('id') id: ParagraphCommentEntity['id'],
  ): Promise<ParagraphCommentEntity> {
    return this.paragraphCommentService.remove(id);
  }
}
