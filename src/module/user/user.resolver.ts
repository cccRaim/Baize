import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(returns => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(returns => User)
  async userByUsername(@Args('username') username: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(username);
    }
    return user;
  }

  @Mutation(returns => User)
  async create(@Args('payload') payload: UserInput): Promise<User> {
    const user = await this.userService.create(payload);
    pubSub.publish('userAdded', payload);
    return user;
  }
}
