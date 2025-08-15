export class InvalidName extends Error {
  constructor() {
    super(`Invalid name`);
    this.name = 'InvalidName';
  }
}
