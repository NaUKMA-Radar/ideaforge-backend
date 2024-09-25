import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateStageDto } from 'src/modules/stage/DTO/create-stage.dto';
import { UpdateStageDto } from 'src/modules/stage/DTO/update-stage.dto';
import { StageEntity } from 'src/modules/stage/entities/stage.entity';

@Injectable()
export class StageService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.StageFindManyArgs): Promise<StageEntity[]> {
    if (options) {
      return this.prismaService.stage.findMany(options);
    }

    return this.prismaService.stage.findMany();
  }

  public async findOne(options: Prisma.StageFindUniqueOrThrowArgs): Promise<StageEntity> {
    return this.prismaService.stage.findUniqueOrThrow(options);
  }

  public async create(data: CreateStageDto): Promise<StageEntity> {
    const { usersToAdd, ...otherData } = data;

    return this.prismaService.stage.create({
      data: {
        ...otherData,
        projectId: data.projectId || '',
        usersToStages: {
          createMany: {
            data: usersToAdd || [],
          },
        },
      },
    });
  }

  public async update(id: StageEntity['id'], data: UpdateStageDto): Promise<StageEntity> {
    const { usersToAdd, usersToUpdate, usersToRemove, ...otherData } = data;

    return this.prismaService.$transaction(async tx => {
      await tx.stage.update({
        data: {
          ...otherData,
          usersToStages: {
            createMany: {
              data: usersToAdd || [],
            },
            deleteMany: usersToRemove || [],
          },
        },
        where: { id },
      });

      if (usersToUpdate) {
        await Promise.all(
          usersToUpdate.map(user =>
            tx.userToStage.update({
              where: { userId_stageId: { userId: user.userId, stageId: id } },
              data: { userRoleId: user.userRoleId },
            }),
          ),
        );
      }

      return tx.stage.findUniqueOrThrow({ where: { id } });
    });
  }

  public async remove(id: StageEntity['id']): Promise<StageEntity> {
    return this.prismaService.stage.delete({ where: { id } });
  }
}
