import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }), new UserService(null, null))).toBeDefined();
  });
});
