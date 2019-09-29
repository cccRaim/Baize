import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateInput, UserUpdateInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne(username);
  }

  async create(payload: UserCreateInput): Promise<User> {
    const user = new User();
    user.username = payload.username;
    user.password = payload.password;
    await this.userRepository.save(user);
    return user;
  }

  async update(id: number, payload: UserUpdateInput): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(id);
    Object.keys(payload).forEach(key => {
      userToUpdate[key] = payload[key];
    });
    await this.userRepository.save(userToUpdate);
    return userToUpdate;
  }

  async remove(id: number): Promise<boolean> {
    const userToRemove = await this.userRepository.findOne(id);
    await this.userRepository.remove(userToRemove);
    return true;
  }
}
