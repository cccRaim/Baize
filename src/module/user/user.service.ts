import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';

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

  async create(payload: UserInput): Promise<User> {
    const user = new User();
    user.username = payload.username;
    user.password = payload.password;
    await this.userRepository.save(user);
    return user;
  }
}
