import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { UsersNotFoundException } from "../exceptions/users-not-found.exception";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const userFinded = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userFinded) {
      throw new UsersNotFoundException();
    }

    return userFinded;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const userFinded = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userFinded) {
      throw new UsersNotFoundException();
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const userFinded = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userFinded) {
      throw new UsersNotFoundException();
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
