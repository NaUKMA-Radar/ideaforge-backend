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
import { CreateUserRegistrationMethodDto } from 'src/modules/user-registration-method/DTO/create-user-registration-method.dto';
import { UpdateUserRegistrationMethodDto } from 'src/modules/user-registration-method/DTO/update-user-registration-method.dto';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.enity';
import { UserRegistrationMethodService } from 'src/modules/user-registration-method/user-registration-method.service';

@ApiTags(RoutesApiTags[Routes.UserRegistrationMethods])
@Controller(Routes.UserRegistrationMethods)
export class UserRegistrationMethodController {
  constructor(private readonly userRegistrationMethodService: UserRegistrationMethodService) {}

  @Auth(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'User registration method was successfully created.',
    type: UserRegistrationMethodEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiConflictResponse({
    description: 'Cannot create user registration method. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Post()
  public async create(
    @Body() createUserRegistrationMethodDto: CreateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.create(createUserRegistrationMethodDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The list of user registration methods',
    type: [UserRegistrationMethodEntity],
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @Get()
  public async findAll(@Query() query?: string): Promise<UserRegistrationMethodEntity[]> {
    return this.userRegistrationMethodService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The user registration method with requested id.',
    type: UserRegistrationMethodEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The user registration method with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user registration method to be found.',
    schema: { example: 1 },
  })
  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
    @Query() query?: string,
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'User registration method was successfully updated.',
    type: UserRegistrationMethodEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The user registration method with the requested id was not found.',
  })
  @ApiConflictResponse({
    description: 'Cannot update user registration method. Invalid data was provided.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user registration method to be updated',
    schema: { example: 1 },
  })
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
    @Body() updateUserRegistrationMethodDto: UpdateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.update(id, updateUserRegistrationMethodDto);
  }

  @Auth(JwtAuthGuard)
  @ApiOkResponse({
    description: 'User registration method was successfully removed.',
    type: UserRegistrationMethodEntity,
  })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiForbiddenResponse({ description: 'The user is forbidden to perform this action.' })
  @ApiNotFoundResponse({
    description: 'The user registration method with the requested id was not found.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error was occured.' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user registration method to be deleted',
    schema: { example: 1 },
  })
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.remove(id);
  }
}
