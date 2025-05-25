import { Module } from "@nestjs/common";
import { ArticlesModule } from "@/modules/articles/articles.module";
import { PrismaModule } from "@/infra/database/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
