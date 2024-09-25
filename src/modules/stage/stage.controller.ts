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
import { UpdateStageDto } from 'src/modules/stage/DTO/update-stage.dto';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';
import { StageService } from 'src/modules/stage/stage.service';
import * as _ from 'lodash';

@ApiTags(RoutesApiTags[Routes.Stages])
@Controller(Routes.Stages)
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The stage with requested id.', type: StageEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The stage with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the stage to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: StageEntity['id'],
    @Query() query?: string,
  ): Promise<StageEntity> {
    return this.stageService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Stage was successfully updated.', type: StageEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The stage with the requested id was not found.' })
  @ApiConflictResponse({ description: 'Cannot update stage. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the stage to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Put(':id')
  public async update(
    @Param('id') id: StageEntity['id'],
    @Body() updateStageDto: UpdateStageDto,
  ): Promise<StageEntity> {
    return this.stageService.update(id, updateStageDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Stage was successfully removed.', type: StageEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The stage with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the stage to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(@Param('id') id: StageEntity['id']): Promise<StageEntity> {
    return this.stageService.remove(id);
  }
}
