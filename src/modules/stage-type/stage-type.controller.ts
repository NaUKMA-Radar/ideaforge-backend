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
import { CreateStageTypeDto } from 'src/modules/stage-type/DTO/create-stage.dto';
import { UpdateStageTypeDto } from 'src/modules/stage-type/DTO/update-stage.dto';
import { StageTypeEntity } from 'src/modules/stage-type/entities/stage-type.entity';
import { StageTypeService } from 'src/modules/stage-type/stage-type.service';

@ApiTags(RoutesApiTags[Routes.StageTypes])
@Controller(Routes.StageTypes)
export class StageTypeController {
  constructor(private readonly stageTypeService: StageTypeService) {}

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Stage type was successfully created.',
    type: StageTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({
    description: 'Cannot create stage type. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post()
  public async create(@Body() createStageTypeDto: CreateStageTypeDto): Promise<StageTypeEntity> {
    return this.stageTypeService.create(createStageTypeDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of stage types',
    type: [StageTypeEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<StageTypeEntity[]> {
    return this.stageTypeService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The stage type with requested id.',
    type: StageTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The stage type with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the stage type to be found.',
    schema: { example: 1 },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: StageTypeEntity['id'],
    @Query() query?: string,
  ): Promise<StageTypeEntity> {
    return this.stageTypeService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Stage type was successfully updated.',
    type: StageTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The stage type with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update stage type. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the stage type to be updated',
    schema: { example: 1 },
  })
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: StageTypeEntity['id'],
    @Body() updateStageTypeDto: UpdateStageTypeDto,
  ): Promise<StageTypeEntity> {
    return this.stageTypeService.update(id, updateStageTypeDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Stage type was successfully removed.',
    type: StageTypeEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The stage type with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the stage type to be deleted',
    schema: { example: 1 },
  })
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: StageTypeEntity['id'],
  ): Promise<StageTypeEntity> {
    return this.stageTypeService.remove(id);
  }
}
