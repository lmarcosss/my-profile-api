import { HttpException, HttpStatus } from "@nestjs/common";

export class ArticlesNotFoundException extends HttpException {
  constructor() {
    super(`Article not found`, HttpStatus.NOT_FOUND);
  }
}
