import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterItems } from '@/shared/api/useFilterItems'
import { useFilterStore } from '@/shared/store/useFilterStore'

import FilterModal from './FilterModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const { data, isLoading, error } = useFilterItems()
	const savedFilters = useFilterStore(state => state.savedFilters)
	console.log(error)
	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center gap-8">
			{isFilterModalOpen && (
				<FilterModal
					onClose={() => {
						setIsFilterModalOpen(false)
					}}
					isLoading={isLoading}
					data={data}
				/>
			)}
			<button onClick={() => setIsFilterModalOpen(true)}>
				{t('openFilterModal')}
			</button>
			<pre className="text-sm bg-gray-100 p-4 rounded-lg">
				{JSON.stringify(savedFilters, null, 2)}
			</pre>
		</section>
	)
}
