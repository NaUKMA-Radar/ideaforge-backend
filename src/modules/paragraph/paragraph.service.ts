import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreateParagraphDto } from 'src/modules/paragraph/DTO/create-paragraph.dto';
import { UpdateParagraphDto } from 'src/modules/paragraph/DTO/update-paragraph.dto';
import { ParagraphEntity } from 'src/modules/paragraph/entities/paragraph.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ParagraphService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.ParagraphFindManyArgs): Promise<ParagraphEntity[]> {
    if (options) {
      return this.prismaService.paragraph.findMany(options);
    }

    return this.prismaService.paragraph.findMany();
  }

  public async findOne(options: Prisma.ParagraphFindUniqueOrThrowArgs): Promise<ParagraphEntity> {
    return this.prismaService.paragraph.findUniqueOrThrow(options);
  }

  public async create(data: CreateParagraphDto): Promise<ParagraphEntity> {
    const { content, ...otherData } = data;

    return this.prismaService.paragraph.create({
      data: {
        ...otherData,
        content,
        documentId: otherData.documentId || '',
        paragraphEditions: { create: { content } },
      },
    });
  }

  public async update(
    id: ParagraphEntity['id'],
    data: UpdateParagraphDto,
  ): Promise<ParagraphEntity> {
    return this.prismaService.paragraph.update({ where: { id }, data });
  }

  public async remove(id: ParagraphEntity['id']): Promise<ParagraphEntity> {
    return this.prismaService.paragraph.delete({ where: { id } });
  }
}
