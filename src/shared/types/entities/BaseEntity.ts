type FakeEntity = {
  isFake?: true,
}

export type BaseEntity<T> = {
  id: string,
} & T & FakeEntity;
