import { ListingMetadata } from 'src/shared/typas/listing-metadata.type';
import { Category, Props } from '../entities/category.entity';
import { Id } from 'src/shared/value-objects/id.value-object';
import { ListingOutput } from 'src/shared/typas/listing-output.type';

export interface CategoriesRepository {
  create(category: Category): Promise<Category>;
  save(category: Category): Promise<Category>;
  findById(id: Id): Promise<Category | null>;
  lsit(metadata?: ListingMetadata<keyof Props>): ListingOutput<Category>;
  listByName(
    name: string,
    metadata?: ListingMetadata<keyof Props>,
  ): ListingOutput<Category>;
  delete(id: Id): Promise<void>;
}
