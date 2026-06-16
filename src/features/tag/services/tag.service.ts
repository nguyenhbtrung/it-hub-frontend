import { api } from '@/lib/api';

import { GetTagsQuery } from '../types/tag.types';

export async function getTags({ page = 1, limit = 10, q }: GetTagsQuery = {}) {
  return api.get<any>('/api/tags', {
    auth: false,
    query: {
      page,
      limit,
      q,
    },
  });
}
