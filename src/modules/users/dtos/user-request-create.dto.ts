import { IsString, IsEmail, Length } from "class-validator";

export class UserRequestCreateDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
