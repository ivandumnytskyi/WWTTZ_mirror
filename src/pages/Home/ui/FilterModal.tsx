import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterType } from '@/shared/api/types/Filter'
import { FilterChoose } from '@/shared/api/types/Filter/FilterVariants'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFilterStore } from '@/shared/store/useFilterStore'

import Conformation from './Conformation'

const FilterModal = ({
	onClose,
	data,
	isLoading
}: {
	onClose: () => void
	data: FilterChoose[] | undefined
	isLoading: boolean
}) => {
	const { t } = useTranslation('filter')
	const savedFilters = useFilterStore(state => state.savedFilters)
	const setSavedFilters = useFilterStore(state => state.setSavedFilters)
	const [selectedOptions, setSelectedOptions] = useState<{
		[key: string]: boolean
	}>(() =>
		Object.fromEntries(
			savedFilters.flatMap(filter => filter.optionsIds.map(id => [id, true]))
		)
	)
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)

	const handleCheckboxChange = (optionId: string) => {
		setSelectedOptions(prev => ({
			...prev,
			[optionId]: !prev[optionId]
		}))
	}

	const buildRequest = (): SearchRequestFilter =>
		(data ?? [])
			.map(filter => ({
				id: filter.id,
				type: FilterType.OPTION as const,
				optionsIds: filter.options
					.filter(option => selectedOptions[option.id])
					.map(option => option.id)
			}))
			.filter(filter => filter.optionsIds.length > 0)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsOpenConfirmation(true)
	}

	const handleConfirm = () => {
		setSavedFilters(buildRequest())
		setIsOpenConfirmation(false)
		onClose()
	}

	const handleCancel = () => {
		setIsOpenConfirmation(false)
		onClose()
	}
	return (
		<>
			<div
				className="modal-backdrop bg-[rgba(27,27,27,0.3)] backdrop-blur-sm fixed inset-0"
				onClick={() => onClose()}
			></div>
			<div className="modal-content absolute z-20 w-[1280px] rounded-2xl bg-white h-max inset-0 flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center p-2">
				<h1 className="border-b border-[rgba(180,180,180,1)] w-[1214px] text-[40px] text-center font-medium">
					{t('title')}
				</h1>
				{isLoading ? (
					<p>{t('loading')}</p>
				) : (
					<form
						className="w-[1214px] flex flex-col items-center"
						onSubmit={handleSubmit}
					>
						{data?.map((item: FilterChoose) => (
							<div
								key={item.id}
								className="mb-4 w-full flex flex-col items-start border-b border-[rgba(180,180,180,1)] pb-4 gap-4"
							>
								<label className="font-medium text-2xl">{item.name}</label>
								<div className="grid grid-cols-3 gap-2 w-full">
									{item.options.map((option: { id: string; name: string }) => (
										<div
											key={option.id}
											className="flex items-center text-base space-x-2 col-span-1"
										>
											<input
												type="checkbox"
												id={option.id}
												name={option.name}
												checked={Boolean(selectedOptions[option.id])}
												onChange={() => handleCheckboxChange(option.id)}
											/>
											<label
												htmlFor={option.id}
												className="cursor-pointer text-[rgba(49,57,60,1)]"
											>
												{option.name}
											</label>
										</div>
									))}
								</div>
							</div>
						))}

						<button
							type="submit"
							className="bg-[rgba(255,95,0,1)] text-white text-base h-16 w-46 rounded-2xl"
						>
							{t('apply')}
						</button>
					</form>
				)}
				<button
					onClick={onClose}
					className="absolute top-4 right-4"
				>
					{t('closeIcon')}
				</button>
				<button
					onClick={() => setSelectedOptions({})}
					className="absolute bottom-8 right-6 text-[rgba(7,134,145,1)] underline"
				>
					{t('clearAll')}
				</button>
				{isOpenConfirmation && (
					<Conformation
						message={t('conformationMessage')}
						onConfirm={handleConfirm}
						onCancel={handleCancel}
					/>
				)}
			</div>
		</>
	)
}

export default FilterModal
