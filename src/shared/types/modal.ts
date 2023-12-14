export type ModalIdentity = {
  id: string,
  modalKey?: string | number
}

export type ModalProps<Props> = Props & Partial<ModalIdentity>