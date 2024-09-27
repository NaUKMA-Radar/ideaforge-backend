import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreateDocumentTypeDto } from 'src/modules/document-type/DTO/create-document-type.dto';
import { UpdateDocumentTypeDto } from 'src/modules/document-type/DTO/update-document-type.dto';
import { DocumentTypeEntity } from 'src/modules/document-type/entities/document-type.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DocumentTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.DocumentTypeFindManyArgs): Promise<DocumentTypeEntity[]> {
    if (options) {
      return this.prismaService.documentType.findMany(options);
    }

    return this.prismaService.documentType.findMany();
  }

  public async findOne(
    options: Prisma.DocumentTypeFindUniqueOrThrowArgs,
  ): Promise<DocumentTypeEntity> {
    return this.prismaService.documentType.findUniqueOrThrow(options);
  }

  public async create(data: CreateDocumentTypeDto): Promise<DocumentTypeEntity> {
    return this.prismaService.documentType.create({ data });
  }

  public async update(
    id: DocumentTypeEntity['id'],
    data: UpdateDocumentTypeDto,
  ): Promise<DocumentTypeEntity> {
    return this.prismaService.documentType.update({ where: { id }, data });
  }

  public async remove(id: DocumentTypeEntity['id']): Promise<DocumentTypeEntity> {
    return this.prismaService.documentType.delete({ where: { id } });
  }
}
