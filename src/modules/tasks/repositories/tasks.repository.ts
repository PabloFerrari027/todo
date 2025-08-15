import { ListingMetadata } from 'src/shared/typas/listing-metadata.type';
import { Task, Props, Status } from '../entities/task.entity';
import { Id } from 'src/shared/value-objects/id.value-object';
import { ListingOutput } from 'src/shared/typas/listing-output.type';

export interface TasksRepository {
  create(task: Task): Promise<Task>;
  save(task: Task): Promise<Task>;
  findById(id: Id): Promise<Task | null>;
  lsit(metadata?: ListingMetadata<keyof Props>): ListingOutput<Task>;
  listByName(
    name: string,
    metadata?: ListingMetadata<keyof Props>,
  ): ListingOutput<Task>;
  listByStatus(
    status: Status,
    metadata?: ListingMetadata<keyof Props>,
  ): ListingOutput<Task>;
  listByCategoryId(
    categoryId: Id,
    metadata?: ListingMetadata<keyof Props>,
  ): ListingOutput<Task>;
  delete(id: Id): Promise<void>;
}
