type SystemProps = {
  _isDeleted?: boolean,
  _isFake?: true,
}

export type BaseEntity<T> = {
  id: string,
} & T & SystemProps;
