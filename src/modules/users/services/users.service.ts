import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { UsersNotFoundException } from "../exceptions/users-not-found.exception";
import * as bcrypt from "bcrypt";
import { UserResponseDto } from "../dtos/user-response.dto";
import { plainToInstance } from "class-transformer";
import { UserRequestCreateDto } from "../dtos/user-request-create.dto";
import { UserRequestUpdateDto } from "../dtos/user-request-update.dto";

const saltOrRounds = 10;

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  // TODO: Remove onModuleInit when up to production
  onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME;

    if (!email || !password || !name) {
      throw new Error(
        "Admin email, password and name must be set in environment variables.",
      );
    }

    this.createAdmin(email, password, name);
  }

  async createAdmin(email: string, password: string, name: string) {
    const existingAdmin = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });
    }
  }

  async create(data: UserRequestCreateDto) {
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    data.password = hashedPassword;

    return this.prisma.user.create({
      data,
    });
  }

  findAll() {
    const users = this.prisma.user.findMany();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOneByEmail(email: string) {
    const userFinded = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userFinded) {
      throw new UsersNotFoundException();
    }

    return userFinded;
  }

  async findOneById(id: string) {
    const userFinded = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userFinded) {
      throw new UsersNotFoundException();
    }

    const formattedUser = plainToInstance(UserResponseDto, userFinded, {
      excludeExtraneousValues: true,
    });

    return formattedUser;
  }

  async update(id: string, data: UserRequestUpdateDto) {
    await this.findOneById(id);

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
