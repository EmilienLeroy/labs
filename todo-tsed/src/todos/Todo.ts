import { Model, ObjectID } from '@tsed/mongoose';
import { Groups, Property, Required } from '@tsed/schema';

@Model({
  collection: 'todos',
  schemaOptions: {
    timestamps: true,
  }
})
export class Todo {
  @ObjectID()
  @Groups('read')
  public _id: string;

  @Required()
  @Property()
  @Groups('read', 'create', 'update')
  public name: string;

  @Required()
  @Property()
  @Groups('read', 'update')
  public do: boolean;

}