import { queryOptions } from '@tanstack/react-query';
import { feedApi } from '../api';

export const feedQueryOptions = {
	recent: () =>
		queryOptions({
			queryKey: ['feed', 'recent'],
			queryFn: feedApi.getRecentFeed,
			staleTime: 30 * 1000, // 30 seconds
		}),
};
