type FakeEntity = {
  isFake?: true,
}

type SystemProps = {
  _isDeleted?: boolean,
}

export type IdentityType = number | string

export type BaseEntity<T> = {
  id: IdentityType,
} & T & FakeEntity & SystemProps;
