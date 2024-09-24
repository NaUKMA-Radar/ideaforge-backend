import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import * as path from 'path';
import { Routes } from 'src/core/enums/app.enums';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProjectDto } from 'src/modules/project/DTO/create-project.dto';
import { UpdateProjectDto } from 'src/modules/project/DTO/update-project.dto';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import {
  CreateProjectUploadedFiles,
  UpdateProjectUploadedFiles,
} from 'src/modules/project/types/project.types';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async findAll(options?: Prisma.ProjectFindManyArgs): Promise<ProjectEntity[]> {
    if (options) {
      return this.prismaService.project.findMany(options);
    }

    return this.prismaService.project.findMany();
  }

  public async findOne(options: Prisma.ProjectFindFirstOrThrowArgs): Promise<ProjectEntity> {
    return this.prismaService.project.findFirstOrThrow(options);
  }

  public async create(
    data: CreateProjectDto,
    files?: CreateProjectUploadedFiles,
  ): Promise<ProjectEntity> {
    const { usersToAdd, ...otherData } = data;

    return this.prismaService.project
      .create({
        data: {
          ...otherData,
          socialMediaLinks: !otherData.socialMediaLinks
            ? Prisma.JsonNull
            : otherData.socialMediaLinks,
          usersToProjects: {
            createMany: {
              data: usersToAdd || [],
            },
          },
        },
      })
      .then(project => {
        if (files?.image?.length) {
          const image = files?.image[0];
          const filename = `${Routes.Projects}/${uuid()}${path.extname(image.originalname)}`;

          this.supabaseService.upload(image, filename).then(async response => {
            if (response.file.filename) {
              await this.prismaService.project.update({
                where: { id: project.id },
                data: { image: response.file.filename },
              });
            }
          });
        }

        return project;
      });
  }

  public async update(
    id: ProjectEntity['id'],
    data: UpdateProjectDto,
    files?: UpdateProjectUploadedFiles,
  ): Promise<ProjectEntity> {
    const { image: imageInDto, usersToAdd, usersToUpdate, usersToRemove, ...otherData } = data;

    return this.prismaService.$transaction(async tx => {
      const project = await tx.project.update({
        data: {
          ...otherData,
          socialMediaLinks: !otherData.socialMediaLinks
            ? Prisma.JsonNull
            : otherData.socialMediaLinks,
          usersToProjects: {
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
            tx.userToProject.update({
              where: { userId_projectId: { userId: user.userId, projectId: id } },
              data: { userRoleId: user.userRoleId },
            }),
          ),
        );
      }

      if (imageInDto === 'null') {
        await tx.project.update({
          where: { id: project.id },
          data: { image: null },
        });

        if (project.image) {
          this.supabaseService.remove([project.image]);
        }

        return project;
      }

      if (files?.image?.length) {
        const image = files.image[0];
        const filename = `${Routes.Projects}/${uuid()}${path.extname(image.originalname)}`;

        this.supabaseService.upload(image, filename).then(async response => {
          if (response.file.filename) {
            await this.prismaService.project.update({
              where: { id: project.id },
              data: { image: response.file.filename },
            });

            if (project.image) {
              this.supabaseService.remove([project.image]);
            }
          }
        });
      }

      return tx.project.findUniqueOrThrow({ where: { id } });
    });
  }

  public async remove(id: ProjectEntity['id']): Promise<ProjectEntity> {
    return this.prismaService.project.delete({ where: { id } }).then(project => {
      if (project.image) {
        this.supabaseService.remove([project.image]);
      }

      return project;
    });
  }
}
