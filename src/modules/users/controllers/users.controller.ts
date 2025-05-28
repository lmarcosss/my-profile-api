import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { Public } from "@/modules/auth/decorators/public.decorator";
import { UserRequestUpdateDto } from "../dtos/user-request-update.dto";
import {
  LoggedUser,
  LoggedUserType,
} from "@/modules/auth/decorators/logged-user.decorator";
import { UserRequestCreateDto } from "../dtos/user-request-create.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() data: UserRequestCreateDto) {
    return this.usersService.create(data);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UserRequestUpdateDto) {
    return this.usersService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @LoggedUser() user: LoggedUserType) {
    if (!user.isAdmin) {
      throw new Error("Only admins can delete users.");
    }

    return this.usersService.remove(id);
  }
}
