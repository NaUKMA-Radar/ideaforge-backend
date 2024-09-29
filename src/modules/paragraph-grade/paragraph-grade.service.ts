import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { ServerException } from 'src/core/exceptions/server.exception';
import { CreateParagraphGradeDto } from 'src/modules/paragraph-grade/DTO/create-paragraph-grade.dto';
import { UpdateParagraphGradeDto } from 'src/modules/paragraph-grade/DTO/update-paragraph-grade.dto';
import { ParagraphGradeEntity } from 'src/modules/paragraph-grade/entities/paragraph-grade.entity';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

@Injectable()
export class ParagraphGradeService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.ParagraphGradeFindManyArgs,
  ): Promise<ParagraphGradeEntity[]> {
    if (options) {
      return this.prismaService.paragraphGrade.findMany(options);
    }

    return this.prismaService.paragraphGrade.findMany();
  }

  public async findOne(
    options: Prisma.ParagraphGradeFindUniqueOrThrowArgs,
  ): Promise<ParagraphGradeEntity> {
    return this.prismaService.paragraphGrade.findUniqueOrThrow(options);
  }

  public async create(data: CreateParagraphGradeDto): Promise<ParagraphGradeEntity> {
    return this.prismaService.$transaction(async tx => {
      const createdParagraphGrade = await tx.paragraphGrade.create({
        data: { ...data, paragraphId: data.paragraphId || '', userId: data.userId || '' },
        include: { paragraph: { select: { isApproved: true } } },
      });

      const aggregations = await tx.paragraphGrade.aggregate({
        where: { paragraphId: createdParagraphGrade.paragraphId },
        _avg: { grade: true },
      });

      if (!aggregations._avg.grade) {
        throw new ServerException(
          'Cannot update paragraph rating because _avg of paragraph grades is null',
        );
      }

      await tx.paragraph.update({
        where: { id: createdParagraphGrade.paragraphId },
        data: {
          rating: aggregations._avg.grade,
          ...(createdParagraphGrade.paragraph.isApproved && {
            isApproved: false,
          }),
        },
      });

      const { paragraph, ...createdParagraphGradeWithoutParagraph } = createdParagraphGrade;

      return createdParagraphGradeWithoutParagraph;
    });
  }

  public async update(
    paragraphId: ParagraphEntity['id'],
    userId: UserPublicEntity['id'],
    data: UpdateParagraphGradeDto,
  ): Promise<ParagraphGradeEntity> {
    return this.prismaService.$transaction(async tx => {
      const updatedParagraphGrade = await tx.paragraphGrade.update({
        where: { paragraphId_userId: { paragraphId, userId } },
        data,
        include: { paragraph: { select: { isApproved: true } } },
      });

      const aggregations = await tx.paragraphGrade.aggregate({
        where: { paragraphId: updatedParagraphGrade.paragraphId },
        _avg: { grade: true },
      });

      if (!aggregations._avg.grade) {
        throw new ServerException(
          'Cannot update paragraph rating because _avg of paragraph grades is null',
        );
      }

      await tx.paragraph.update({
        where: { id: updatedParagraphGrade.paragraphId },
        data: {
          rating: aggregations._avg.grade,
          ...(updatedParagraphGrade.paragraph.isApproved && {
            isApproved: false,
          }),
        },
      });

      const { paragraph, ...updatedParagraphGradeWithoutParagraph } = updatedParagraphGrade;

      return updatedParagraphGradeWithoutParagraph;
    });
  }

  public async remove(
    paragraphId: ParagraphEntity['id'],
    userId: UserPublicEntity['id'],
  ): Promise<ParagraphGradeEntity> {
    return this.prismaService.$transaction(async tx => {
      const removedParagraphGrade = await tx.paragraphGrade.delete({
        where: { paragraphId_userId: { paragraphId, userId } },
        include: { paragraph: { select: { isApproved: true } } },
      });

      const aggregations = await tx.paragraphGrade.aggregate({
        where: { paragraphId: removedParagraphGrade.paragraphId },
        _avg: { grade: true },
      });

      if (!aggregations._avg.grade) {
        throw new ServerException(
          'Cannot update paragraph rating because _avg of paragraph grades is null',
        );
      }

      await tx.paragraph.update({
        where: { id: removedParagraphGrade.paragraphId },
        data: {
          rating: aggregations._avg.grade,
          ...(removedParagraphGrade.paragraph.isApproved && {
            isApproved: false,
          }),
        },
      });

      const { paragraph, ...removedParagraphGradeWithoutParagraph } = removedParagraphGrade;

      return removedParagraphGradeWithoutParagraph;
    });
  }
}
