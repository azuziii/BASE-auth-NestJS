// // Not in use. Replaced with SessionGuard
// import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { ISession } from 'src/session/session.interface';
// import { Request } from 'express';
// import { User } from 'src/user/entities/user.entity';
// import { PUBLIC } from 'src/shared/decorators/public.decorator';
// import { SESSION_TOKEN } from 'src/session/constants';

// export class SessionStrategy implements CanActivate {
//   constructor(@Inject(ISession) private readonly sessionService: ISession) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const isPublic = Reflect.getMetadata(PUBLIC, context.getHandler());

//     if (isPublic) return true;

//     const request: Request = context.switchToHttp().getRequest();

//     const sessionToken = request.cookies[SESSION_TOKEN];
//     console.log(sessionToken);

//     if (!sessionToken) return false;

//     const user = request.user as User;
//     console.log(user);

//     return this.sessionService.verify(sessionToken);
//   }
// }
