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

      const updatedParagraphEdition = await tx.paragraphEdition.update({
        where: { id: createdParagraphEditionGrade.paragraphEditionId },
        data: { rating: aggregations._avg.grade },
      });

      const mostRatedParagraphEdition = await tx.paragraphEdition.findFirst({
        where: { paragraphId: updatedParagraphEdition.paragraphId },
        select: {
          id: true,
          content: true,
          rating: true,
          paragraphEditionGrades: { orderBy: { updatedAt: 'desc' } },
        },
        orderBy: [{ rating: 'desc' }, { updatedAt: 'desc' }],
        take: 1,
      });

      if (mostRatedParagraphEdition?.id === updatedParagraphEdition.id) {
        await tx.paragraph.update({
          where: { id: updatedParagraphEdition.paragraphId },
          data: {
            content: mostRatedParagraphEdition?.content || updatedParagraphEdition.content,
            rating: mostRatedParagraphEdition?.rating || updatedParagraphEdition.rating,
          },
        });

        if (mostRatedParagraphEdition) {
          await tx.paragraphGrade.deleteMany({
            where: { paragraphId: updatedParagraphEdition.paragraphId },
          });

          await tx.paragraphGrade.createMany({
            data: mostRatedParagraphEdition.paragraphEditionGrades.map(({ grade, userId }) => ({
              grade,
              userId,
              paragraphId: updatedParagraphEdition.paragraphId,
            })),
          });
        }
      }

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

      const updatedParagraphEdition = await tx.paragraphEdition.update({
        where: { id: updatedParagraphEditionGrade.paragraphEditionId },
        data: { rating: aggregations._avg.grade },
      });

      const mostRatedParagraphEdition = await tx.paragraphEdition.findFirst({
        where: { paragraphId: updatedParagraphEdition.paragraphId },
        select: {
          id: true,
          content: true,
          rating: true,
          paragraphEditionGrades: { orderBy: { updatedAt: 'desc' } },
        },
        orderBy: [{ rating: 'desc' }, { updatedAt: 'desc' }],
        take: 1,
      });

      if (mostRatedParagraphEdition?.id === updatedParagraphEdition.id) {
        await tx.paragraph.update({
          where: { id: updatedParagraphEdition.paragraphId },
          data: {
            content: mostRatedParagraphEdition?.content || updatedParagraphEdition.content,
            rating: mostRatedParagraphEdition?.rating || updatedParagraphEdition.rating,
          },
        });

        if (mostRatedParagraphEdition) {
          await tx.paragraphGrade.deleteMany({
            where: { paragraphId: updatedParagraphEdition.paragraphId },
          });

          await tx.paragraphGrade.createMany({
            data: mostRatedParagraphEdition.paragraphEditionGrades.map(({ grade, userId }) => ({
              grade,
              userId,
              paragraphId: updatedParagraphEdition.paragraphId,
            })),
          });
        }
      }

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
        where: { paragraphEditionId },
        _avg: { grade: true },
      });

      const updatedParagraphEdition = await tx.paragraphEdition.update({
        where: { id: removedParagraphEditionGrade.paragraphEditionId },
        data: { rating: aggregations._avg.grade || 0 },
      });

      const mostRatedParagraphEdition = await tx.paragraphEdition.findFirst({
        where: { paragraphId: updatedParagraphEdition.paragraphId },
        select: {
          id: true,
          content: true,
          rating: true,
          paragraphEditionGrades: { orderBy: { updatedAt: 'desc' } },
        },
        orderBy: [{ rating: 'desc' }, { updatedAt: 'desc' }],
        take: 1,
      });

      if (mostRatedParagraphEdition?.id === updatedParagraphEdition.id) {
        await tx.paragraph.update({
          where: { id: updatedParagraphEdition.paragraphId },
          data: {
            content: mostRatedParagraphEdition?.content || updatedParagraphEdition.content,
            rating: mostRatedParagraphEdition?.rating || updatedParagraphEdition.rating,
          },
        });

        if (mostRatedParagraphEdition) {
          await tx.paragraphGrade.deleteMany({
            where: { paragraphId: updatedParagraphEdition.paragraphId },
          });

          await tx.paragraphGrade.createMany({
            data: mostRatedParagraphEdition.paragraphEditionGrades.map(({ grade, userId }) => ({
              grade,
              userId,
              paragraphId: updatedParagraphEdition.paragraphId,
            })),
          });
        }
      }

      return removedParagraphEditionGrade;
    });
  }
}
