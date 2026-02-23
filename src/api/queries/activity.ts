import { queryOptions } from '@tanstack/react-query';
import { activityApi } from '../api';

export const activityQueryKeys = {
	all: ['activity'] as const,
	heatmap: (name: string, startDate: string, endDate: string) =>
		[...activityQueryKeys.all, 'heatmap', name, startDate, endDate] as const,
};

export const activityQueryOptions = {
	heatmap: (name: string, startDate: string, endDate: string) =>
		queryOptions({
			queryKey: activityQueryKeys.heatmap(name, startDate, endDate),
			queryFn: () => activityApi.getActivityHeatmap(name, startDate, endDate),
			enabled: !!name,
		}),
};
