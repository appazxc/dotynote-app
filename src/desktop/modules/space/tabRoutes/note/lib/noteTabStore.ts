type Store = {
  scroll?: number,
  queryKey: any[],
}

export const noteTabStore = new Map<string, Store>();