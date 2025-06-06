import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ArticlesNotFoundException } from "@/modules/articles/exceptions/articles-not-found.exception";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ArticleRequestUpdateDto } from "../dtos/article-request-update.dto";

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ArticleUncheckedCreateInput) {
    return this.prisma.article.create({ data });
  }

  findAll() {
    return this.prisma.article.findMany({});
  }

  async findOne(id: string) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new ArticlesNotFoundException();
    }

    return existingArticle;
  }

  async update(id: string, data: ArticleRequestUpdateDto) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new ArticlesNotFoundException();
    }

    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new ArticlesNotFoundException();
    }

    return this.prisma.article.delete({
      where: { id },
    });
  }
}
