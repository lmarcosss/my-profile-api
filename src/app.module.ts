import { Module } from "@nestjs/common";
import { ArticlesModule } from "@/modules/articles/articles.module";
import { PrismaModule } from "@/infra/database/prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
