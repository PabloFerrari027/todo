export type Order = 'ASC' | 'DESC';

export interface ListingMetadata<SortBy> {
  take?: number;
  skip?: number;
  order?: Order;
  sortBy?: SortBy;
}
