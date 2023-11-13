import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Implement authentication with jwt service
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }
    const token = authHeader.split(" ")[1];
    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }
}
