type SystemProps = {
  _isDeleted?: boolean,
  _isFake?: true,
}

export type IdentityType = number | string

export type BaseEntity<T> = {
  id: IdentityType,
} & T & SystemProps;
