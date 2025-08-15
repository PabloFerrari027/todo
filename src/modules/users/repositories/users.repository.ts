import { ListingMetadata } from 'src/shared/typas/listing-metadata.type';
import { Id } from 'src/shared/value-objects/id.value-object';
import { ListingOutput } from 'src/shared/typas/listing-output.type';
import { Props, User } from '../entities/user.entity';
import { Email } from 'src/shared/value-objects/email.value-object';

export interface UsersRepository {
  create(user: User): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: Id): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  lsit(metadata?: ListingMetadata<keyof Props>): ListingOutput<User>;
  delete(id: Id): Promise<void>;
}
