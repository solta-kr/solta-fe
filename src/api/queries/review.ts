import { queryOptions } from '@tanstack/react-query';
import { reviewApi } from '../api';

export const reviewQueryKeys = {
  all: ['reviews'] as const,
  pending: (name: string) => [...reviewQueryKeys.all, 'pending', name] as const,
  completed: (name: string) => [...reviewQueryKeys.all, 'completed', name] as const,
};

export const reviewQueryOptions = {
  pending: (name: string) =>
    queryOptions({
      queryKey: reviewQueryKeys.pending(name),
      queryFn: () => reviewApi.getReviews(name),
    }),
  completed: (name: string) =>
    queryOptions({
      queryKey: reviewQueryKeys.completed(name),
      queryFn: () => reviewApi.getCompletedReviews(name),
    }),
};
