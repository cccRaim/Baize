import { Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from './user.entity';

@InputType()
export class UserCreateInput implements Partial<User> {
  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @Length(8, 255)
  password: string;
}

@InputType()
export class UserUpdateInput implements Partial<User> {
  @Field(type => String, { nullable: true })
  @MaxLength(30)
  username: string;

  @Field(type => String, { nullable: true })
  @Length(8, 255)
  password: string;
}
