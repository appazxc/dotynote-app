export type ModalIdentity = {
  id: string,
  extraId?: string | number
}

export type ModalProps<Props> = Props & Pick<ModalIdentity, 'extraId'>

export type ModalBase<Props> = Props & {
  isOpen?: boolean,
}