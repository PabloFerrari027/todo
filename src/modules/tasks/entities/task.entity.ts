import { InvalidJSONFormat } from 'src/shared/errors/invalid-json-format';
import { Id, ValueType } from 'src/shared/value-objects/id.value-object';
import { Name } from 'src/shared/value-objects/name.value-object';

export type Status = '';

export interface Props {
  id: Id;
  name: Name;
  status: Status;
  categoryId: Id;
  updatedAt: Date;
  createdAt: Date;
}

export const JSONFormats = {
  SNAKE_CASE: 'SNAKE_CASE',
  CAMEL_CASE: 'CAMEL_CASE',
} as const;

export type JSONFormat = (typeof JSONFormats)[keyof typeof JSONFormats];

export interface SnakeCaseJSON {
  id: ValueType;
  name: string;
  status: Status;
  category_id: ValueType;
  created_at: string;
  updated_at: string;
}

export interface CamelCaseJSON {
  id: ValueType;
  name: string;
  status: Status;
  categoryId: ValueType;
  createdAt: string;
  updatedAt: string;
}

export type SerializedTask<F extends JSONFormat> =
  F extends typeof JSONFormats.SNAKE_CASE ? SnakeCaseJSON : CamelCaseJSON;

export class Task {
  private readonly props: Props;

  private constructor(props: Props) {
    this.props = props;
  }

  get id(): Id {
    return this.props.id;
  }

  get name(): Name {
    return this.props.name;
  }

  get status(): Status {
    return this.props.status;
  }

  get categoryId(): Id {
    return this.props.categoryId;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: Name) {
    this.props.name = name;
    this.touch();
  }

  toJSON<F extends JSONFormat>(format: F): SerializedTask<F> {
    switch (format) {
      case JSONFormats.SNAKE_CASE:
        return {
          id: this.id.value,
          name: this.name.value,
          status: this.status,
          category_id: this.categoryId.value,
          updated_at: this.updatedAt.toJSON(),
          created_at: this.createdAt.toJSON(),
        } as SerializedTask<F>;

      case JSONFormats.CAMEL_CASE:
        return {
          id: this.id.value,
          name: this.name.value,
          status: this.status,
          categoryId: this.categoryId.value,
          updatedAt: this.updatedAt.toJSON(),
          createdAt: this.createdAt.toJSON(),
        } as SerializedTask<F>;

      default:
        throw new InvalidJSONFormat();
    }
  }

  equals(other: Task): boolean {
    return (
      JSON.stringify(this.toJSON('CAMEL_CASE')) ===
      JSON.stringify(other.toJSON('CAMEL_CASE'))
    );
  }

  static compare(a: Task, b: Task): boolean {
    return a.equals(b);
  }

  static fromJSON<F extends JSONFormat>(
    format: F,
    json: SerializedTask<F>,
  ): Task {
    switch (format) {
      case JSONFormats.SNAKE_CASE: {
        return Task.create({
          id: Id.from((json as SnakeCaseJSON).id),
          name: Name.create((json as SnakeCaseJSON).name),
          status: (json as SnakeCaseJSON).status,
          categoryId: Id.from((json as SnakeCaseJSON).category_id),
          updatedAt: new Date((json as SnakeCaseJSON).updated_at),
          createdAt: new Date((json as SnakeCaseJSON).created_at),
        });
      }

      case JSONFormats.CAMEL_CASE: {
        return Task.create({
          id: Id.from((json as CamelCaseJSON).id),
          name: Name.create((json as SnakeCaseJSON).name),
          status: (json as SnakeCaseJSON).status,
          categoryId: Id.from((json as CamelCaseJSON).categoryId),
          updatedAt: new Date((json as CamelCaseJSON).updatedAt),
          createdAt: new Date((json as CamelCaseJSON).createdAt),
        });
      }

      default:
        throw new InvalidJSONFormat();
    }
  }

  static create(props: Props): Task {
    return new Task(props);
  }
}
