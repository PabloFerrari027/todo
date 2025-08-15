import { isEmpty } from 'class-validator';
import { InvalidName } from '../errors/invalid-name.error';

export class Name {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: Name): boolean {
    return this._value === other._value;
  }

  toJSON(): string {
    return this._value;
  }

  static compare(a: Name, b: Name): boolean {
    return a.equals(b);
  }

  static isValid(value: string): boolean {
    const isValid = !isEmpty(value);
    return isValid;
  }

  static create(value: string): Name {
    if (!this.isValid(value)) throw new InvalidName();
    return new Name(value);
  }
}
