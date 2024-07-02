export type Config = {
  devtools: Partial<{
    query: boolean,
    redux: boolean,
    router: boolean,
    tabRouter: boolean,
  }>,
  apiDelay?: number,
}
