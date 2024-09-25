import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateStageTypeDto } from 'src/modules/stage-type/DTO/create-stage.dto';
import { UpdateStageTypeDto } from 'src/modules/stage-type/DTO/update-stage.dto';
import { StageTypeEntity } from 'src/modules/stage-type/entities/stage-type.entity';

@Injectable()
export class StageTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.StageTypeFindManyArgs): Promise<StageTypeEntity[]> {
    if (options) {
      return this.prismaService.stageType.findMany(options);
    }

    return this.prismaService.stageType.findMany();
  }

  public async findOne(options: Prisma.StageTypeFindUniqueOrThrowArgs): Promise<StageTypeEntity> {
    return this.prismaService.stageType.findUniqueOrThrow(options);
  }

  public async create(data: CreateStageTypeDto): Promise<StageTypeEntity> {
    return this.prismaService.stageType.create({ data });
  }

  public async update(
    id: StageTypeEntity['id'],
    data: UpdateStageTypeDto,
  ): Promise<StageTypeEntity> {
    return this.prismaService.stageType.update({ where: { id }, data });
  }

  public async remove(id: StageTypeEntity['id']): Promise<StageTypeEntity> {
    return this.prismaService.stageType.delete({ where: { id } });
  }
}
