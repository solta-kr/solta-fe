import { queryOptions } from '@tanstack/react-query';
import { xpApi } from '../api';

export const xpQueryOptions = {
  summary: (username: string) =>
    queryOptions({
      queryKey: ['xp', 'summary', username],
      queryFn: () => xpApi.getXpSummary(username),
      enabled: !!username,
    }),

  history: (username: string, period: string) =>
    queryOptions({
      queryKey: ['xp', 'history', username, period],
      queryFn: () => xpApi.getXpHistory(username, period),
      enabled: !!username,
    }),
};
