import { useRouter } from '@tanstack/react-router';

export const useBuildTabHref = () => {
  const router = useRouter();

  return (path: string, params?: Record<string, string>) =>
    router.buildLocation({ to: path, params }).href;
};
