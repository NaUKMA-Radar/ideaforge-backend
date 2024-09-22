import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { PasswordService } from 'src/modules/password/password.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from 'src/modules/user/DTO/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/DTO/update-user.dto';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import {
  CreateUserUploadedFiles,
  UpdateUserUploadedFiles,
} from 'src/modules/user/types/user.types';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  public async findAll(options?: Prisma.UserFindManyArgs): Promise<UserPublicEntity[]> {
    return this.prismaService.user.findMany(
      _.merge(options, { omit: { password: true, refreshToken: true } }),
    );
  }

  public async findOne(options?: Prisma.UserFindFirstOrThrowArgs): Promise<UserPublicEntity> {
    return this.prismaService.user.findFirstOrThrow(
      _.merge(options, { omit: { password: true, refreshToken: true } }),
    );
  }

  public async create(
    data: CreateUserDto,
    files?: CreateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    return this.prismaService.user.create({ data, omit: { password: true, refreshToken: true } });
  }

  public async update(
    id: string,
    data: UpdateUserDto,
    files?: UpdateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    return this.prismaService.user.update({
      data,
      where: { id },
      omit: { password: true, refreshToken: true },
    });
  }

  public async remove(id: string): Promise<UserPublicEntity> {
    return this.prismaService.user.delete({
      where: { id },
      omit: { password: true, refreshToken: true },
    });
  }
}
