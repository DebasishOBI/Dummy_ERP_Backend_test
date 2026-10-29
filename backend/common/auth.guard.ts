import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/** Minimal stand-in for the real auth guard: checks a bearer token header is present. */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers?.authorization;
    return typeof header === 'string' && header.startsWith('Bearer ');
  }
}
