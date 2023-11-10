import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): string {
    return 'GameSaves 0.0.1';
  }
}
