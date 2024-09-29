import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { ServerException } from 'src/core/exceptions/server.exception';
import { CreateParagraphEditionGradeDto } from 'src/modules/paragraph-edition-grade/DTO/create-paragraph-edition-grade.dto';
import { UpdateParagraphEditionGradeDto } from 'src/modules/paragraph-edition-grade/DTO/update-paragraph-edition-grade.dto';
import { ParagraphEditionGradeEntity } from 'src/modules/paragraph-edition-grade/entities/paragraph-edition-grade.entity';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

@Injectable()
export class ParagraphEditionGradeService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.ParagraphEditionGradeFindManyArgs,
  ): Promise<ParagraphEditionGradeEntity[]> {
    if (options) {
      return this.prismaService.paragraphEditionGrade.findMany(options);
    }

    return this.prismaService.paragraphEditionGrade.findMany();
  }

  public async findOne(
    options: Prisma.ParagraphEditionGradeFindUniqueOrThrowArgs,
  ): Promise<ParagraphEditionGradeEntity> {
    return this.prismaService.paragraphEditionGrade.findUniqueOrThrow(options);
  }

  public async create(data: CreateParagraphEditionGradeDto): Promise<ParagraphEditionGradeEntity> {
    return this.prismaService.$transaction(async tx => {
      const createdParagraphEditionGrade = await tx.paragraphEditionGrade.create({
        data: {
          ...data,
          paragraphEditionId: data.paragraphEditionId || '',
          userId: data.userId || '',
        },
      });

      const aggregations = await tx.paragraphEditionGrade.aggregate({
        where: { paragraphEditionId: createdParagraphEditionGrade.paragraphEditionId },
        _avg: { grade: true },
      });

      if (!aggregations._avg.grade) {
        throw new ServerException(
          'Cannot update paragraph edition rating because _avg of paragraph edition grades is null',
        );
      }

      await tx.paragraphEdition.update({
        where: { id: createdParagraphEditionGrade.paragraphEditionId },
        data: { rating: aggregations._avg.grade },
      });

      return createdParagraphEditionGrade;
    });
  }

  public async update(
    paragraphEditionId: ParagraphEditionEntity['id'],
    userId: UserPublicEntity['id'],
    data: UpdateParagraphEditionGradeDto,
  ): Promise<ParagraphEditionGradeEntity> {
    return this.prismaService.$transaction(async tx => {
      const updatedParagraphEditionGrade = await tx.paragraphEditionGrade.update({
        where: { paragraphEditionId_userId: { paragraphEditionId, userId } },
        data,
      });

      const aggregations = await tx.paragraphEditionGrade.aggregate({
        where: { paragraphEditionId: updatedParagraphEditionGrade.paragraphEditionId },
        _avg: { grade: true },
      });

      if (!aggregations._avg.grade) {
        throw new ServerException(
          'Cannot update paragraph edition rating because _avg of paragraph edition grades is null',
        );
      }

      await tx.paragraphEdition.update({
        where: { id: updatedParagraphEditionGrade.paragraphEditionId },
        data: { rating: aggregations._avg.grade },
      });

      return updatedParagraphEditionGrade;
    });
  }

  public async remove(
    paragraphEditionId: ParagraphEditionEntity['id'],
    userId: UserPublicEntity['id'],
  ): Promise<ParagraphEditionGradeEntity> {
    return this.prismaService.$transaction(async tx => {
      const removedParagraphEditionGrade = await tx.paragraphEditionGrade.delete({
        where: { paragraphEditionId_userId: { paragraphEditionId, userId } },
      });

      const aggregations = await tx.paragraphEditionGrade.aggregate({
        where: { paragraphEditionId: removedParagraphEditionGrade.paragraphEditionId },
        _avg: { grade: true },
      });

      if (!aggregations._avg.grade) {
        throw new ServerException(
          'Cannot update paragraph edition rating because _avg of paragraph edition grades is null',
        );
      }

      await tx.paragraphEdition.update({
        where: { id: removedParagraphEditionGrade.paragraphEditionId },
        data: { rating: aggregations._avg.grade },
      });

      return removedParagraphEditionGrade;
    });
  }
}
