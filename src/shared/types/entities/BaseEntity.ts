type SystemProps = {
  _isDeleted?: boolean,
  _isFake?: true,
}

export type BaseEntity<T, IdType = string> = {
  id: IdType,
} & T & SystemProps;
