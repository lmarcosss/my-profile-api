import { IsString, IsEmail, IsOptional, Length } from "class-validator";

export class UserRequestUpdateDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;
}
