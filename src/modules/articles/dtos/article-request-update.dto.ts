import { IsString, Length, IsBoolean, IsOptional } from "class-validator";

export class ArticleRequestUpdateDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  published: boolean;

  @IsOptional()
  @IsString()
  category: string;
}
