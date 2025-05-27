import { IsString, Length, IsBoolean } from "class-validator";

export class ArticleRequestCreateDto {
  @IsString()
  @Length(2, 100)
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsString()
  category: string;
}
