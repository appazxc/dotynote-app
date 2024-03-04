type FakeEntity = {
  isFake?: true,
}

export type IdentityType = number | string

export type BaseEntity<T> = {
  id: IdentityType,
} & T & FakeEntity;
