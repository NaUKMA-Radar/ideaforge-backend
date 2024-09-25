import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreateDocumentDto } from 'src/modules/document/DTO/create-document.dto';
import { UpdateDocumentDto } from 'src/modules/document/DTO/update-document.dto';
import { DocumentEntity } from 'src/modules/document/entities/document.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.DocumentFindManyArgs): Promise<DocumentEntity[]> {
    if (options) {
      return this.prismaService.document.findMany(options);
    }

    return this.prismaService.document.findMany();
  }

  public async findOne(options: Prisma.DocumentFindUniqueOrThrowArgs): Promise<DocumentEntity> {
    return this.prismaService.document.findUniqueOrThrow(options);
  }

  public async create(data: CreateDocumentDto): Promise<DocumentEntity> {
    const { usersToAdd, ...otherData } = data;

    return this.prismaService.document.create({
      data: {
        ...otherData,
        stageId: data.stageId || '',
        initialData: !otherData.initialData ? {} : otherData.initialData,
        usersToDocuments: {
          createMany: {
            data: usersToAdd || [],
          },
        },
      },
    });
  }

  public async update(id: DocumentEntity['id'], data: UpdateDocumentDto): Promise<DocumentEntity> {
    const { usersToAdd, usersToUpdate, usersToRemove, ...otherData } = data;

    return this.prismaService.$transaction(async tx => {
      await tx.document.update({
        data: {
          ...otherData,
          initialData: !otherData.initialData ? {} : otherData.initialData,
          usersToDocuments: {
            createMany: {
              data: usersToAdd || [],
            },
            deleteMany: usersToRemove || [],
          },
        },
        where: { id },
      });

      if (usersToUpdate) {
        await Promise.all(
          usersToUpdate.map(user =>
            tx.userToDocument.update({
              where: { userId_documentId: { userId: user.userId, documentId: id } },
              data: { userRoleId: user.userRoleId },
            }),
          ),
        );
      }

      return tx.document.findUniqueOrThrow({ where: { id } });
    });
  }

  public async remove(id: DocumentEntity['id']): Promise<DocumentEntity> {
    return this.prismaService.document.delete({ where: { id } });
  }
}
