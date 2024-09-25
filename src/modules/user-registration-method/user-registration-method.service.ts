import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserRegistrationMethodDto } from 'src/modules/user-registration-method/DTO/create-user-registration-method.dto';
import { UpdateUserRegistrationMethodDto } from 'src/modules/user-registration-method/DTO/update-user-registration-method.dto';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.enity';

@Injectable()
export class UserRegistrationMethodService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.UserRegistrationMethodFindManyArgs,
  ): Promise<UserRegistrationMethodEntity[]> {
    if (options) {
      return this.prismaService.userRegistrationMethod.findMany(options);
    }

    return this.prismaService.userRegistrationMethod.findMany();
  }

  public async findOne(
    options: Prisma.UserRegistrationMethodFindUniqueOrThrowArgs,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.findUniqueOrThrow(options);
  }

  public async create(
    data: CreateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.create({ data });
  }

  public async update(
    id: UserRegistrationMethodEntity['id'],
    data: UpdateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.update({ where: { id }, data });
  }

  public async remove(
    id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.delete({ where: { id } });
  }
}
