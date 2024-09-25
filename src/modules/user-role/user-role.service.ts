import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserRoleDto } from 'src/modules/user-role/DTO/create-user-role.dto';
import { UpdateUserRoleDto } from 'src/modules/user-role/DTO/update-user-role.dto';
import { UserRoleEntity } from 'src/modules/user-role/entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.UserRoleFindManyArgs): Promise<UserRoleEntity[]> {
    if (options) {
      return this.prismaService.userRole.findMany(options);
    }

    return this.prismaService.userRole.findMany();
  }

  public async findOne(options: Prisma.UserRoleFindUniqueOrThrowArgs): Promise<UserRoleEntity> {
    return this.prismaService.userRole.findUniqueOrThrow(options);
  }

  public async create(data: CreateUserRoleDto): Promise<UserRoleEntity> {
    return this.prismaService.userRole.create({ data });
  }

  public async update(id: UserRoleEntity['id'], data: UpdateUserRoleDto): Promise<UserRoleEntity> {
    return this.prismaService.userRole.update({ where: { id }, data });
  }

  public async remove(id: UserRoleEntity['id']): Promise<UserRoleEntity> {
    return this.prismaService.userRole.delete({ where: { id } });
  }
}
