import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import * as path from 'path';
import { Routes } from 'src/core/enums/app.enums';
import { CreateDocumentDto } from 'src/modules/document/DTO/create-document.dto';
import { UpdateDocumentDto } from 'src/modules/document/DTO/update-document.dto';
import { DocumentEntity } from 'src/modules/document/entities/document.entity';
import { UpdateDocumentUploadedFiles } from 'src/modules/document/types/document.types';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

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

  public async update(
    id: DocumentEntity['id'],
    data: UpdateDocumentDto,
    files?: UpdateDocumentUploadedFiles,
  ): Promise<DocumentEntity> {
    const { file: fileInDto, usersToAdd, usersToUpdate, usersToRemove, ...otherData } = data;

    return this.prismaService.$transaction(async tx => {
      const document = await tx.document.update({
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

      if (fileInDto === 'null') {
        await tx.document.update({
          where: { id: document.id },
          data: { file: null },
        });

        if (document.file) {
          this.supabaseService.remove([document.file]);
        }

        return document;
      }

      if (files?.file?.length) {
        const image = files.file[0];
        const filename = `${Routes.Documents}/${uuid()}${path.extname(image.originalname)}`;

        this.supabaseService.upload(image, filename).then(async response => {
          if (response.file.filename) {
            await this.prismaService.document.update({
              where: { id: document.id },
              data: { file: response.file.filename },
            });

            if (document.file) {
              this.supabaseService.remove([document.file]);
            }
          }
        });
      }

      return tx.document.findUniqueOrThrow({ where: { id } });
    });
  }

  public async remove(id: DocumentEntity['id']): Promise<DocumentEntity> {
    return this.prismaService.document.delete({ where: { id } });
  }
}
