export class InvalidID extends Error {
  constructor(value: string) {
    super(`Invalid Id format: ${value}`);
    this.name = 'InvalidIdError';
  }
}
