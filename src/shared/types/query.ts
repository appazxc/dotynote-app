import { Directions } from 'shared/constants/requests';

export type QueryFnData = { items: number []; hasNextPage: boolean; hasPrevPage: boolean }

export type PageParam = { 
  cursor?: number | null;
  direction?: Directions | null; 
}

export type TQueryFnData = {
  pageParams: PageParam[];
  pages: QueryFnData[];
}