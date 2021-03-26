import { ConflictException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    try {
      if (data === 'id' || data == 'email') {
        if (request.user[data])
          return request.user[data];
        throw new ConflictException('user id not attached after authentication');
      }
      return request.user;
    }
    catch {
      throw new ConflictException('user id not attached after authentication');
    }
  },
);
