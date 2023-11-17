import { logger } from '@mikro-orm/nestjs';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Implement authentication with jwt service
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      logger.warn('No token');
      throw new UnauthorizedException();
    }
    const token = authHeader.split(" ")[1];
    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!user) {
      logger.warn("Invalid token");
      throw new UnauthorizedException();
    }
    return (async () => {
      const userEntity = await this.userService.findOne(user.id);
      request.user = userEntity;
      return true;
    })();
  }
}
