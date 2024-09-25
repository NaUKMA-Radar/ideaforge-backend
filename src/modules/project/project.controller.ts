import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { Routes } from 'src/core/enums/app.enums';
import { RoutesApiTags } from 'src/core/constants';
import * as _ from 'lodash';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { Auth } from 'src/core/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProjectService } from 'src/modules/project/project.service';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { CreateProjectDto } from 'src/modules/project/DTO/create-project.dto';
import {
  CreateProjectUploadedFiles,
  UpdateProjectUploadedFiles,
} from 'src/modules/project/types/project.types';
import { UpdateProjectDto } from 'src/modules/project/DTO/update-project.dto';

@ApiTags(RoutesApiTags[Routes.Projects])
@Controller(Routes.Projects)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Project was successfully created.', type: ProjectEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({ description: 'Cannot create project. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Post()
  public async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles()
    @UploadRestrictions([{ fieldname: 'image', minFileSize: 1 }])
    files: CreateProjectUploadedFiles,
  ): Promise<ProjectEntity> {
    return this.projectService.create(createProjectDto, files);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The list of projects', type: [ProjectEntity] })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<ProjectEntity[]> {
    return this.projectService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The project with requested id.', type: ProjectEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The project with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the project to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: ProjectEntity['id'],
    @Query() query?: string,
  ): Promise<ProjectEntity> {
    return this.projectService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Project was successfully updated.', type: ProjectEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The project with the requested id was not found.' })
  @ApiConflictResponse({ description: 'Cannot update project. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the project to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Put(':id')
  public async update(
    @Param('id') id: ProjectEntity['id'],
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles()
    @UploadRestrictions([{ fieldname: 'image', minFileSize: 1 }])
    files: UpdateProjectUploadedFiles,
  ): Promise<ProjectEntity> {
    return this.projectService.update(id, updateProjectDto, files);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'Project was successfully removed.', type: ProjectEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The project with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the project to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(@Param('id') id: ProjectEntity['id']): Promise<ProjectEntity> {
    return this.projectService.remove(id);
  }
}
