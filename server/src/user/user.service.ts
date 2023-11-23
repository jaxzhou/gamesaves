import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { wrap } from '@mikro-orm/core';

import { User } from '../database/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>, private readonly em: EntityManager) {
  }

  async create(createUserDto: CreateUserDto) {
    //create user
    const createdUser = this.userRepo.create(createUserDto);
    this.em.persistAndFlush(createdUser);
    return createdUser;
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
    this.em.flush();
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne(id);
    await this.remove(id);
    return user;
  }
}
