import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ArticlesService } from "@/modules/articles/services/articles.service";
import {
  LoggedUser,
  LoggedUserType,
} from "@/modules/auth/decorators/logged-user.decorator";
import { ArticleRequestCreateDto } from "../dtos/article-request-create.dto";
import { ArticleRequestUpdateDto } from "../dtos/article-request-update.dto";
import { Public } from "@/modules/auth/decorators/public.decorator";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(
    @Body() data: ArticleRequestCreateDto,
    @LoggedUser() user: LoggedUserType,
  ) {
    const authorId = user.sub;

    return this.articlesService.create({
      ...data,
      authorId,
    });
  }

  @Public()
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: ArticleRequestUpdateDto) {
    return this.articlesService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.articlesService.remove(id);
  }
}
