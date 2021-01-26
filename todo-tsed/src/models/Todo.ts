import { Model, ObjectID } from '@tsed/mongoose';
import { Property, Required } from '@tsed/schema';

@Model({
  collection: 'todos',
  schemaOptions: {
    timestamps: true,
  }
})
export class Todo {
  @ObjectID()
  public _id: string;

  @Required()
  @Property()
  public name: string;

  @Required()
  @Property()
  public do: boolean;

}