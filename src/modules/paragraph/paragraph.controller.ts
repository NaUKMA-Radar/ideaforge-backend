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
import { ParagraphCommentEntity } from 'src/modules/paragraph-comment/entities/paragraph-comment.entity';
import { ParagraphCommentService } from 'src/modules/paragraph-comment/paragraph-comment.service';
import { CreateParagraphCommentDto } from 'src/modules/paragraph-comment/DTO/create-paragraph-comment.dto';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import { CreateParagraphGradeDto } from 'src/modules/paragraph-grade/DTO/create-paragraph-grade.dto';
import { ParagraphGradeService } from 'src/modules/paragraph-grade/paragraph-grade.service';
import { ParagraphGradeEntity } from 'src/modules/paragraph-grade/entities/paragraph-grade.entity';
import { UpdateParagraphGradeDto } from 'src/modules/paragraph-grade/DTO/update-paragraph-grade.dto';

@ApiTags(RoutesApiTags[Routes.Paragraphs])
@Controller(Routes.Paragraphs)
export class ParagraphController {
  constructor(
    private readonly paragraphService: ParagraphService,
    private readonly paragraphEditionService: ParagraphEditionService,
    private readonly paragraphCommentService: ParagraphCommentService,
    private readonly paragraphGradeService: ParagraphGradeService,
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

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description:
      'The paragraph comment for the paragraph with specified id was successfully created.',
    type: ParagraphCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiConflictResponse({
    description:
      'Cannot create the paragraph comment for the paragraph with specified id. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to add new paragraph comment to',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Post(':id/comments')
  public async createParagraphComment(
    @Param('id') id: ParagraphEntity['id'],
    @Body() createParagraphCommentDto: CreateParagraphCommentDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphCommentEntity> {
    return this.paragraphCommentService.create({
      ...createParagraphCommentDto,
      paragraphId: id,
      authorId: user.id,
    });
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of paragraph comments for the paragraph with specified id',
    type: [ParagraphCommentEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to get the list of paragraph comments',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id/comments')
  public async findAllCommentsByParagraphId(
    @Param('id') id: ParagraphEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphCommentEntity[]> {
    return this.paragraphCommentService.findAll(
      _.merge(deserializeQueryString(query), { where: { paragraphId: id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description:
      'The paragraph grade for the paragraph with specified id was successfully created.',
    type: ParagraphGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiConflictResponse({
    description:
      'Cannot create the paragraph grade for the paragraph with specified id. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to add new paragraph grade to',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Post(':id/grades')
  public async createParagraphGrade(
    @Param('id') id: ParagraphEntity['id'],
    @Body() createParagraphGradeDto: CreateParagraphGradeDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphGradeEntity> {
    return this.paragraphGradeService.create({
      ...createParagraphGradeDto,
      paragraphId: id,
      userId: user.id,
    });
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of paragraph grades for the paragraph with specified id',
    type: [ParagraphGradeEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph to get the list of paragraph grades',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id/grades')
  public async findAllGradesByParagraphId(
    @Param('id') id: ParagraphEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphGradeEntity[]> {
    return this.paragraphGradeService.findAll(
      _.merge(deserializeQueryString(query), { where: { paragraphId: id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The paragraph grade for the paragraph and user with specified ids',
    type: ParagraphGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph or the user with the requested ids were not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'paragraphId',
    description: 'The id of the paragraph to get the paragraph grade for user',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @ApiParam({
    name: 'userId',
    description: 'The id of the user to get the paragraph grade for paragraph',
    schema: { example: '48gna7ba-4kf8-401m-9984-85jg8144m18g' },
  })
  @Get(':paragraphId/grades/:userId')
  public async findGradeByParagraphAndUserIds(
    @Param('paragraphId') paragraphId: ParagraphEntity['id'],
    @Param('userId') userId: UserPublicEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphGradeEntity> {
    return this.paragraphGradeService.findOne(
      _.merge(deserializeQueryString(query), {
        where: { paragraphId_userId: { userId, paragraphId } },
      }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph grade was successfully updated.',
    type: ParagraphGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiConflictResponse({ description: 'Cannot update paragraph grade. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph which paragraph grade has to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id/grades')
  public async updateGrade(
    @Param('id') id: ParagraphEntity['id'],
    @Body() updateParagraphGradeDto: UpdateParagraphGradeDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphGradeEntity> {
    return this.paragraphGradeService.update(id, user.id, updateParagraphGradeDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph grade was successfully removed.',
    type: ParagraphGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The paragraph with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the paragraph which paragraph grade has to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id/grades')
  public async removeGrade(
    @Param('id') id: ParagraphEntity['id'],
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphGradeEntity> {
    return this.paragraphGradeService.remove(id, user.id);
  }
}
