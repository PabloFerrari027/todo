import {
  Category,
  JSONFormat,
  SerializedCategory,
} from '../entities/category.entity';

export class CategoryPresenter {
  static execute<F extends JSONFormat, K extends keyof SerializedCategory<F>>(
    category: Category,
    format: F,
    fields?: K[],
  ): Pick<SerializedCategory<F>, K> {
    const serialized = category.toJSON(format);
    if (!fields) return serialized as Pick<SerializedCategory<F>, K>;

    return Object.fromEntries(
      fields.map((field) => [field, serialized[field]]),
    ) as Pick<SerializedCategory<F>, K>;
  }
}
