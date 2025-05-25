import { HttpException, HttpStatus } from "@nestjs/common";

export class UsersNotFoundException extends HttpException {
  constructor() {
    super("User not found", HttpStatus.NOT_FOUND);
  }
}
