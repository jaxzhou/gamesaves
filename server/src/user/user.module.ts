import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}
