import { Module } from "@nestjs/common";
import { ArticlesModule } from "@/modules/articles/articles.module";
import { PrismaModule } from "@/infra/database/prisma/prisma.module";

@Module({
  imports: [PrismaModule, ArticlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
