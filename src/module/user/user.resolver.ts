import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserCreateInput, UserUpdateInput } from './user.input';

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
  async create(@Args('payload') payload: UserCreateInput): Promise<User> {
    const user = await this.userService.create(payload);
    pubSub.publish('userAdded', payload);
    return user;
  }

  @Mutation(returns => User)
  async update(@Args('id') id: number, @Args('payload') payload: UserUpdateInput): Promise<User> {
    return await this.userService.update(id, payload);
  }

  @Mutation(returns => Boolean)
  async remove(@Args('id') id: number): Promise<boolean> {
    const remove = await this.userService.remove(id);
    return !!remove;
  }
}
