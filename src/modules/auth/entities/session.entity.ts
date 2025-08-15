import { InvalidJSONFormat } from 'src/shared/errors/invalid-json-format';
import { Id, ValueType } from 'src/shared/value-objects/id.value-object';

export interface Props {
  id: Id;
  userId: Id;
  createdAt: Date;
}

export const JSONFormats = {
  SNAKE_CASE: 'SNAKE_CASE',
  CAMEL_CASE: 'CAMEL_CASE',
} as const;

export type JSONFormat = (typeof JSONFormats)[keyof typeof JSONFormats];

export interface SnakeCaseJSON {
  id: ValueType;
  user_id: ValueType;
  created_at: string;
}

export interface CamelCaseJSON {
  id: ValueType;
  userId: ValueType;
  createdAt: string;
}

export type SerializedSession<F extends JSONFormat> =
  F extends typeof JSONFormats.SNAKE_CASE ? SnakeCaseJSON : CamelCaseJSON;

export class Session {
  private readonly props: Props;

  private constructor(props: Props) {
    this.props = props;
  }

  get id(): Id {
    return this.props.id;
  }

  get userId(): Id {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toJSON<F extends JSONFormat>(format: F): SerializedSession<F> {
    switch (format) {
      case JSONFormats.SNAKE_CASE:
        return {
          id: this.id.value,
          user_id: this.userId.value,
          created_at: this.createdAt.toJSON(),
        } as SerializedSession<F>;

      case JSONFormats.CAMEL_CASE:
        return {
          id: this.id.value,
          userId: this.userId.value,
          createdAt: this.createdAt.toJSON(),
        } as SerializedSession<F>;

      default:
        throw new InvalidJSONFormat();
    }
  }

  equals(other: Session): boolean {
    return (
      JSON.stringify(this.toJSON('CAMEL_CASE')) ===
      JSON.stringify(other.toJSON('CAMEL_CASE'))
    );
  }

  static compare(a: Session, b: Session): boolean {
    return a.equals(b);
  }

  static fromJSON<F extends JSONFormat>(
    format: F,
    json: SerializedSession<F>,
  ): Session {
    switch (format) {
      case JSONFormats.SNAKE_CASE: {
        return Session.create({
          id: Id.from((json as SnakeCaseJSON).id),
          userId: Id.from((json as SnakeCaseJSON).user_id),
          createdAt: new Date((json as SnakeCaseJSON).created_at),
        });
      }

      case JSONFormats.CAMEL_CASE: {
        return Session.create({
          id: Id.from((json as CamelCaseJSON).id),
          userId: Id.from((json as CamelCaseJSON).userId),
          createdAt: new Date((json as CamelCaseJSON).createdAt),
        });
      }

      default:
        throw new InvalidJSONFormat();
    }
  }

  static create(props: Props): Session {
    return new Session(props);
  }
}
