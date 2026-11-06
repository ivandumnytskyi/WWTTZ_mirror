import { useQuery } from '@tanstack/react-query'

import type { FilterItem } from '@/shared/api/types/Filter/FilterItem'
import filterData from '@/shared/temp/filterData.json'

export const useFilterItems = () =>
	useQuery({
		queryKey: ['filterItems'],
		queryFn: async (): Promise<FilterItem[]> =>
			filterData.filterItems as FilterItem[]
	})
