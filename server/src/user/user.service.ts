import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { wrap } from '@mikro-orm/core';
import * as crypto from 'crypto';

import { User } from '../database/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    //create user
    const createdUser = this.userRepo.create(createUserDto);
    return createdUser;
  }


  async hashPassword(password: string) {
    const salt = '123456';
    const hash = crypto.createHash('md5').update(password + salt).digest('hex');
    return hash;
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findByName(username: string) {
    return this.userRepo.findOne({ username });
  }

  async findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    wrap(user).assign(updateUserDto);
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne(id);
    await this.remove(id);
    return user;
  }
}
