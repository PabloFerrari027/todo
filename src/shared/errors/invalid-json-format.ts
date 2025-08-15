export class InvalidJSONFormat extends Error {
  constructor() {
    super(`Invalid JSON format`);
    this.name = 'InvalidJSONFormat';
  }
}
