import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterItems } from '@/shared/api/useFilterItems'

import FilterModal from './FilterModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
	const { data, isLoading, error } = useFilterItems()
	console.log(error)
	return (
		<section className="w-full h-dvh flex items-center justify-center">
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
		</section>
	)
}
