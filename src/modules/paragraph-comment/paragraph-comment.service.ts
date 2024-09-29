import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreateParagraphCommentDto } from 'src/modules/paragraph-comment/DTO/create-paragraph-comment.dto';
import { UpdateParagraphCommentDto } from 'src/modules/paragraph-comment/DTO/update-paragraph-comment.dto';
import { ParagraphCommentEntity } from 'src/modules/paragraph-comment/entities/paragraph-comment.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ParagraphCommentService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.ParagraphCommentFindManyArgs,
  ): Promise<ParagraphCommentEntity[]> {
    if (options) {
      return this.prismaService.paragraphComment.findMany(options);
    }

    return this.prismaService.paragraphComment.findMany();
  }

  public async findOne(
    options: Prisma.ParagraphCommentFindUniqueOrThrowArgs,
  ): Promise<ParagraphCommentEntity> {
    return this.prismaService.paragraphComment.findUniqueOrThrow(options);
  }

  public async create(data: CreateParagraphCommentDto): Promise<ParagraphCommentEntity> {
    return this.prismaService.paragraphComment.create({
      data: { ...data, paragraphId: data.paragraphId || '', authorId: data.authorId || '' },
    });
  }

  public async update(
    id: ParagraphCommentEntity['id'],
    data: UpdateParagraphCommentDto,
  ): Promise<ParagraphCommentEntity> {
    return this.prismaService.paragraphComment.update({ where: { id }, data });
  }

  public async remove(id: ParagraphCommentEntity['id']): Promise<ParagraphCommentEntity> {
    return this.prismaService.paragraphComment.delete({ where: { id } });
  }
}
