type SystemProps = {
  _isDeleted?: boolean;
  _isFake?: true;
  _isError?: true;
}

export type BaseEntity<T, IdType = string> = {
  id: IdType;
} & T & SystemProps;
