import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import * as _ from 'lodash';
import { CreateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/create-paragraph-edition.dto';
import { UpdateParagraphEditionDto } from 'src/modules/paragraph-edition/DTO/update-paragraph-edition.dto';
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
          authorId: data.authorId || '',
        },
        include: { paragraph: { select: { id: true, isApproved: true } } },
      });

      if (createdParagraphEdition.paragraph.isApproved) {
        await tx.paragraph.update({
          where: { id: createdParagraphEdition.paragraphId },
          data: {
            isApproved: false,
            paragraphGrades: { deleteMany: {} },
          },
        });
      }

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

      if (updatedParagraphEdition.paragraph.isApproved) {
        await tx.paragraph.update({
          where: { id: updatedParagraphEdition.paragraphId },
          data: {
            isApproved: false,
            paragraphGrades: { deleteMany: {} },
          },
        });
      }

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

      await tx.paragraph.update({
        where: { id: removedParagraphEdition.paragraphId },
        data: {
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
