import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
    ])
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}
