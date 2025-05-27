import { UnauthorizedException } from "@nestjs/common";

export class UnauthorizedUserException extends UnauthorizedException {
  constructor() {
    super("User not found");
  }
}
