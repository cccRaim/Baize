import { Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserCreateInput {
  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @Length(8, 255)
  password: string;
}

@InputType()
export class UserUpdateInput {
  @Field(type => String, { nullable: true })
  @MaxLength(30)
  username: string;

  @Field(type => String, { nullable: true })
  @Length(8, 255)
  password: string;
}
