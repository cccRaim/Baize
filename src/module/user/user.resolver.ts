import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './user.input';

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation(returns => User)
  async addRecipe(@Args('payload') payload: UserInput): Promise<User> {
    const user = await this.userService.create(payload);
    pubSub.publish('userAdded', payload);
    return user;
  }
}
