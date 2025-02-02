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
import { UpdateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/update-paragraph-edition.dto';
import { ParagraphEditionCommentService } from 'src/modules/paragraph-edition-comment/paragraph-edition-comment.service';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import { CreateParagraphEditionCommentDto } from 'src/modules/paragraph-edition-comment/DTO/create-paragraph-edition-comment.dto';
import { ParagraphEditionGradeService } from 'src/modules/paragraph-edition-grade/paragraph-edition-grade.service';
import { ParagraphEditionGradeEntity } from 'src/modules/paragraph-edition-grade/entities/paragraph-edition-grade.entity';
import { CreateParagraphEditionGradeDto } from 'src/modules/paragraph-edition-grade/DTO/create-paragraph-edition-grade.dto';
import { UpdateParagraphEditionGradeDto } from 'src/modules/paragraph-edition-grade/DTO/update-paragraph-edition-grade.dto';

@ApiTags(RoutesApiTags[Routes.ParagraphEditions])
@Controller(Routes.ParagraphEditions)
export class ParagraphEditionController {
  constructor(
    private readonly paragraphEditionService: ParagraphEditionService,
    private readonly paragraphEditionCommentService: ParagraphEditionCommentService,
    private readonly paragraphEditionGradeService: ParagraphEditionGradeService,
  ) {}

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

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description:
      'The paragraph edition comment for the paragraph edition with specified id was successfully created.',
    type: ParagraphEditionCommentEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiConflictResponse({
    description:
      'Cannot create the paragraph edition comment for the paragraph edition with specified id. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph edition to add new paragraph edition comment to',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Post(':id/comments')
  public async createParagraphEditionComment(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Body() createParagraphEditionCommentDto: CreateParagraphEditionCommentDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphEditionCommentEntity> {
    return this.paragraphEditionCommentService.create({
      ...createParagraphEditionCommentDto,
      paragraphEditionId: id,
      authorId: user.id,
    });
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description:
      'The list of paragraph edition comments for the paragraph edition with specified id',
    type: [ParagraphEditionCommentEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph edition to get the list of paragraph edition comments',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id/comments')
  public async findAllCommentsByParagraphEditionId(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEditionCommentEntity[]> {
    return this.paragraphEditionCommentService.findAll(
      _.merge(deserializeQueryString(query), { where: { paragraphEditionId: id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description:
      'The paragraph edition grade for the paragraph edition with specified id was successfully created.',
    type: ParagraphEditionGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiConflictResponse({
    description:
      'Cannot create the paragraph edition grade for the paragraph edition with specified id. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph edition to add new paragraph edition grade to',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Post(':id/grades')
  public async createParagraphEditionGrade(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Body() createParagraphEditionGradeDto: CreateParagraphEditionGradeDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphEditionGradeEntity> {
    return this.paragraphEditionGradeService.create({
      ...createParagraphEditionGradeDto,
      paragraphEditionId: id,
      userId: user.id,
    });
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of paragraph edition grades for the paragraph edition with specified id',
    type: [ParagraphEditionGradeEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the paragraph edition to get the list of paragraph edition grades',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id/grades')
  public async findAllGradesByParagraphEditionId(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEditionGradeEntity[]> {
    return this.paragraphEditionGradeService.findAll(
      _.merge(deserializeQueryString(query), { where: { paragraphEditionId: id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description:
      'The paragraph edition grade for the paragraph edition and user with specified ids',
    type: ParagraphEditionGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition or the user with the requested ids were not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'paragraphEditionId',
    description: 'The id of the paragraph edition to get the paragraph edition grade for user',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @ApiParam({
    name: 'userId',
    description: 'The id of the user to get the paragraph edition grade for paragraph edition',
    schema: { example: '48gna7ba-4kf8-401m-9984-85jg8144m18g' },
  })
  @Get(':paragraphEditionId/grades/:userId')
  public async findGradeByParagraphEditionAndUserIds(
    @Param('paragraphEditionId') paragraphEditionId: ParagraphEditionEntity['id'],
    @Param('userId') userId: UserPublicEntity['id'],
    @Query() query?: string,
  ): Promise<ParagraphEditionGradeEntity> {
    return this.paragraphEditionGradeService.findOne(
      _.merge(deserializeQueryString(query), {
        where: { paragraphEditionId_userId: { userId, paragraphEditionId } },
      }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph edition grade was successfully updated.',
    type: ParagraphEditionGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update paragraph edition grade. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description:
      'The uuid of the paragraph edition which paragraph edition grade has to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id/grades')
  public async updateGrade(
    @Param('id') id: ParagraphEditionEntity['id'],
    @Body() updateParagraphEditionGradeDto: UpdateParagraphEditionGradeDto,
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphEditionGradeEntity> {
    return this.paragraphEditionGradeService.update(id, user.id, updateParagraphEditionGradeDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paragraph edition grade was successfully removed.',
    type: ParagraphEditionGradeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The paragraph edition with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description:
      'The uuid of the paragraph edition which paragraph edition grade has to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id/grades')
  public async removeGrade(
    @Param('id') id: ParagraphEditionEntity['id'],
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<ParagraphEditionGradeEntity> {
    return this.paragraphEditionGradeService.remove(id, user.id);
  }
}
