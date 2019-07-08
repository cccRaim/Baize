import { Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @Length(8, 255)
  password: string;
}
