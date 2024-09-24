import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
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
import { Auth } from 'src/core/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';

@ApiTags(RoutesApiTags[Routes.Users])
@Controller(Routes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(JwtAuthGuard)
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

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The list of users', type: [UserPublicEntity] })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<UserPublicEntity[]> {
    return this.userService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({ description: 'The user with requested id.', type: UserPublicEntity })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({ description: 'The user with the requested id was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the user to be found.',
    schema: { example: '23fbed56-1bb9-40a0-8977-2dd0f0c6c31f' },
  })
  @Get(':id')
  public async findById(
    @Param('id') id: UserPublicEntity['id'],
    @Query() query?: string,
  ): Promise<UserPublicEntity> {
    return this.userService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
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
    @Param('id') id: UserPublicEntity['id'],
    @Body() updateUserDto: UpdateUserDto,
    @AuthenticatedUser() user: UserPublicEntity,
    @UploadedFiles()
    @UploadRestrictions([{ fieldname: 'image', minFileSize: 1 }])
    files: UpdateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    if (id !== user.id) {
      throw new ForbiddenException({
        message: 'Cannot update the user with the id different from yours',
        error: 'Forbidden action',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }

    return this.userService.update(id, updateUserDto, files);
  }

  @Auth(JwtAuthGuard)
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
  public async remove(
    @Param('id') id: UserPublicEntity['id'],
    @AuthenticatedUser() user: UserPublicEntity,
  ): Promise<UserPublicEntity> {
    if (id !== user.id) {
      throw new ForbiddenException({
        message: 'Cannot remove the user with the id different from yours',
        error: 'Forbidden action',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }

    return this.userService.remove(id);
  }
}
