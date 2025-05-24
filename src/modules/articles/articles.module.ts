import { Module } from "@nestjs/common";
import { ArticlesService } from "./services/articles.service";
import { ArticlesController } from "@/modules/articles/controllers/articles.controller";
import { PrismaModule } from "@/infra/database/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
