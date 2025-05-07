import { Directions } from 'shared/constants/requests';

export type QueryFnData = { items: string[]; hasNextPage: boolean; hasPrevPage: boolean }

export type PageParam = { 
  cursor?: string | null;
  direction?: Directions | null; 
}

export type TQueryFnData = {
  pageParams: PageParam[];
  pages: QueryFnData[];
}