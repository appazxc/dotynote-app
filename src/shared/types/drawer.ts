export type DrawerIdentity = {
  id: string,
  extraId?: string | number
}

export type DrawerProps<Props> = Props & Pick<DrawerIdentity, 'extraId'>

export type OpenChangeDetails = {
  open: boolean
}