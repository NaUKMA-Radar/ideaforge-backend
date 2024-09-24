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
import { CreateUserRoleDto } from 'src/modules/user-role/DTO/create-user-role.dto';
import { UpdateUserRoleDto } from 'src/modules/user-role/DTO/update-user-role.dto';
import { UserRoleEntity } from 'src/modules/user-role/entities/user-role.entity';
import { UserRoleService } from 'src/modules/user-role/user-role.service';

@ApiTags(RoutesApiTags[Routes.UserRoles])
@Controller(Routes.UserRoles)
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'User role was successfully created.',
    type: UserRoleEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({
    description: 'Cannot create user role. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post()
  public async create(@Body() createUserRoleDto: CreateUserRoleDto): Promise<UserRoleEntity> {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of user roles',
    type: [UserRoleEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<UserRoleEntity[]> {
    return this.userRoleService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The user role with requested id.',
    type: UserRoleEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The user role with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user role to be found.',
    schema: { example: 1 },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: UserRoleEntity['id'],
    @Query() query?: string,
  ): Promise<UserRoleEntity> {
    return this.userRoleService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'User role was successfully updated.',
    type: UserRoleEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The user role with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update user role. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user role to be updated',
    schema: { example: 1 },
  })
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: UserRoleEntity['id'],
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRoleEntity> {
    return this.userRoleService.update(id, updateUserRoleDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'User role was successfully removed.',
    type: UserRoleEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The user role with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user role to be deleted',
    schema: { example: 1 },
  })
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: UserRoleEntity['id'],
  ): Promise<UserRoleEntity> {
    return this.userRoleService.remove(id);
  }
}
