export type ModalIdentity = {
  id: string,
  extraId?: string | number
}

export type ModalProps<Props> = Props & Partial<ModalIdentity>

export type ModalBase<Props> = Props & {
  isOpen?: boolean,
}