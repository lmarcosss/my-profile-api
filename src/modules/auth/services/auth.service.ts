import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "@/modules/users/services/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.role === UserRoleEnum.ADMIN,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
