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
import { UserService } from './user.service';
import { UserPublicEntity } from './entities/user-public.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/modules/user/DTO/create-user.dto';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { UpdateUserDto } from 'src/modules/user/DTO/update-user.dto';
import { Routes } from 'src/core/enums/app.enums';
import { RoutesApiTags } from 'src/core/constants';
import {
  CreateUserUploadedFiles,
  UpdateUserUploadedFiles,
} from 'src/modules/user/types/user.types';
import * as _ from 'lodash';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { Request } from 'express';

@ApiTags(RoutesApiTags[Routes.Users])
@Controller(Routes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'User was successfully created.', type: UserPublicEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({ description: 'Cannot create user. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles()
    @UploadRestrictions([{ fieldname: 'image', minFileSize: 1 }])
    files: CreateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    return this.userService.create(createUserDto, files);
  }

  @ApiOkResponse({ description: 'The list of users', type: [UserPublicEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<UserPublicEntity[]> {
    return this.userService.findAll(deserializeQueryString(query));
  }

  @ApiOkResponse({ description: 'The user with requested id.', type: UserPublicEntity })
  @ApiNotFoundResponse({ description: 'The user with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the user to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: string,
    @Query() query?: string,
  ): Promise<UserPublicEntity> {
    return this.userService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @ApiOkResponse({ description: 'User was successfully updated.', type: UserPublicEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The user with the requested id was not found.' })
  @ApiConflictResponse({ description: 'Cannot update user. Invalid data was provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the user to be updated',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @ApiConsumes('application/json', 'multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    @UploadRestrictions([{ fieldname: 'image', minFileSize: 1 }])
    files: UpdateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    return this.userService.update(id, updateUserDto, files);
  }

  @ApiOkResponse({ description: 'User was successfully removed.', type: UserPublicEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The user with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user to be deleted',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<UserPublicEntity> {
    return this.userService.remove(id);
  }
}