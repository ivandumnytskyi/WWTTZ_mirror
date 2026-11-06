import { create } from 'zustand'

import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	savedFilters: SearchRequestFilter
	setSavedFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterStore>(set => ({
	savedFilters: [],
	setSavedFilters: filters => set({ savedFilters: filters })
}))
