import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import * as _ from 'lodash';
import { ServerException } from 'src/core/exceptions/server.exception';
import { CreateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/create-paragraph-edition.dto';
import { UpdateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/update-entity-edition.dto';
import { ParagraphEditionEntity } from 'src/modules/paragraph-edition/entities/paragraph-edition.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ParagraphEditionService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.ParagraphEditionFindManyArgs,
  ): Promise<ParagraphEditionEntity[]> {
    if (options) {
      return this.prismaService.paragraphEdition.findMany(options);
    }

    return this.prismaService.paragraphEdition.findMany();
  }

  public async findOne(
    options: Prisma.ParagraphEditionFindUniqueArgs,
  ): Promise<ParagraphEditionEntity> {
    return this.prismaService.paragraphEdition.findUniqueOrThrow(options);
  }

  public async create(data: CreateParagraphEditionDto): Promise<ParagraphEditionEntity> {
    return this.prismaService.$transaction(async tx => {
      const createdParagraphEdition = await tx.paragraphEdition.create({
        data: {
          ...data,
          paragraphId: data.paragraphId || '',
        },
        include: { paragraph: { select: { id: true, isApproved: true } } },
      });

      const aggregations = await tx.paragraphEdition.aggregate({
        where: { paragraphId: createdParagraphEdition.paragraphId },
        _avg: { rating: true },
      });

      if (!aggregations._avg.rating) {
        throw new ServerException(
          'Cannot update paragraph rating because _avg of paragraph edition ratings is null',
        );
      }

      await tx.paragraph.update({
        where: { id: createdParagraphEdition.paragraphId },
        data: {
          isApproved: false,
          rating: aggregations._avg.rating,
          ...(createdParagraphEdition.paragraph.isApproved && {
            isApproved: false,
            paragraphGrades: { deleteMany: {} },
          }),
        },
      });

      const { paragraph, ...createdParagraphEditionWithoutParagraph } = createdParagraphEdition;

      return createdParagraphEditionWithoutParagraph;
    });
  }

  public async update(
    id: ParagraphEditionEntity['id'],
    data: UpdateParagraphEditionDto,
  ): Promise<ParagraphEditionEntity> {
    return this.prismaService.$transaction(async tx => {
      const updatedParagraphEdition = await tx.paragraphEdition.update({
        where: { id },
        data: { ...data, rating: new Decimal(0), paragraphEditionGrades: { deleteMany: {} } },
        include: { paragraph: { select: { isApproved: true } } },
      });

      const mostRatedParagraphEdition = await tx.paragraphEdition.findFirst({
        where: { paragraphId: updatedParagraphEdition.paragraphId },
        select: { content: true },
        orderBy: { rating: 'desc', updatedAt: 'desc' },
        take: 1,
      });

      const aggregations = await tx.paragraphEdition.aggregate({
        where: { paragraphId: updatedParagraphEdition.paragraphId },
        _avg: { rating: true },
      });

      if (!aggregations._avg.rating) {
        throw new ServerException(
          'Cannot update paragraph rating because _avg of paragraph edition ratings is null',
        );
      }

      await tx.paragraph.update({
        where: { id: updatedParagraphEdition.paragraphId },
        data: {
          rating: aggregations._avg.rating,
          content: mostRatedParagraphEdition?.content || '',
          ...(updatedParagraphEdition.paragraph.isApproved && {
            isApproved: false,
            paragraphGrades: { deleteMany: {} },
          }),
        },
      });

      const { paragraph, ...updatedParagraphEditionWithoutParagraph } = updatedParagraphEdition;

      return updatedParagraphEditionWithoutParagraph;
    });
  }

  public async remove(id: ParagraphEditionEntity['id']): Promise<ParagraphEditionEntity> {
    return this.prismaService.$transaction(async tx => {
      const removedParagraphEdition = await tx.paragraphEdition.delete({
        where: { id },
        include: { paragraph: { select: { id: true, isApproved: true } } },
      });

      const mostRatedParagraphEdition = await tx.paragraphEdition.findFirst({
        where: { paragraphId: removedParagraphEdition.paragraphId },
        select: { content: true },
        orderBy: { rating: 'desc', updatedAt: 'desc' },
        take: 1,
      });

      const aggregations = await tx.paragraphEdition.aggregate({
        where: { paragraphId: removedParagraphEdition.paragraphId },
        _avg: { rating: true },
      });

      if (!aggregations._avg.rating) {
        throw new ServerException(
          'Cannot update paragraph rating because _avg of paragraph edition ratings is null',
        );
      }

      await tx.paragraph.update({
        where: { id: removedParagraphEdition.paragraphId },
        data: {
          rating: aggregations._avg.rating,
          content: mostRatedParagraphEdition?.content || '',
          ...(removedParagraphEdition.paragraph.isApproved && {
            isApproved: false,
            paragraphGrades: { deleteMany: {} },
          }),
        },
      });

      const { paragraph, ...removedParagraphEditionWithoutParagraph } = removedParagraphEdition;

      return removedParagraphEditionWithoutParagraph;
    });
  }
}
