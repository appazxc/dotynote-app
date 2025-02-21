export type Config = {
  devtools: Partial<{
    query: boolean;
    redux: boolean;
    router: boolean;
    tabRouter: boolean;
  }>;
  logging?: {
    sentry?: {
      enable: boolean;
      dsn: string;
    };
  };
  apiDelay?: number;
}
