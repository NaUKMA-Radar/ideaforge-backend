import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreateParagraphEditionCommentDto } from 'src/modules/paragraph-edition-comment/DTO/create-paragraph-edition-comment.dto';
import { UpdateParagraphEditionCommentDto } from 'src/modules/paragraph-edition-comment/DTO/update-paragraph-edition-comment.dto';
import { ParagraphEditionCommentEntity } from 'src/modules/paragraph-edition-comment/entities/paragraph-edition-comment.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ParagraphEditionCommentService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.ParagraphEditionCommentFindManyArgs,
  ): Promise<ParagraphEditionCommentEntity[]> {
    if (options) {
      return this.prismaService.paragraphEditionComment.findMany(options);
    }

    return this.prismaService.paragraphEditionComment.findMany();
  }

  public async findOne(
    options: Prisma.ParagraphEditionCommentFindUniqueOrThrowArgs,
  ): Promise<ParagraphEditionCommentEntity> {
    return this.prismaService.paragraphEditionComment.findUniqueOrThrow(options);
  }

  public async create(
    data: CreateParagraphEditionCommentDto,
  ): Promise<ParagraphEditionCommentEntity> {
    return this.prismaService.paragraphEditionComment.create({
      data: {
        ...data,
        paragraphEditionId: data.paragraphEditionId || '',
        authorId: data.authorId || '',
      },
    });
  }

  public async update(
    id: ParagraphEditionCommentEntity['id'],
    data: UpdateParagraphEditionCommentDto,
  ): Promise<ParagraphEditionCommentEntity> {
    return this.prismaService.paragraphEditionComment.update({ where: { id }, data });
  }

  public async remove(
    id: ParagraphEditionCommentEntity['id'],
  ): Promise<ParagraphEditionCommentEntity> {
    return this.prismaService.paragraphEditionComment.delete({ where: { id } });
  }
}
