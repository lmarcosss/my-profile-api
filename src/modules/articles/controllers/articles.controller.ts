import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ArticlesService } from "@/modules/articles/services/articles.service";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() data: Prisma.ArticleCreateInput) {
    return this.articlesService.create(data);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: Prisma.ArticleUpdateInput) {
    return this.articlesService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.articlesService.remove(id);
  }
}
