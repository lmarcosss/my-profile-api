import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface LoggedUserType {
  sub: string;
  email: string;
  isAdmin: boolean;
}

export interface LoggedRequest {
  user: LoggedUserType;
}

export const LoggedUser = createParamDecorator<LoggedUserType>(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<LoggedRequest>();

    return request.user;
  },
);
