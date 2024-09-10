export type MergeEntity<T, K> = Omit<T, keyof K> & K;
