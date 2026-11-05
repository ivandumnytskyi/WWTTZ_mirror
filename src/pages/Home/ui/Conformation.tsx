import { useTranslation } from 'react-i18next'

const Conformation = ({
	onClose,
	message
}: {
	onClose: () => void
	message: string
}) => {
	const { t } = useTranslation('filter')

	return (
		<div className="w-full h-full modal-backdrop bg-[rgba(27,27,27,0.3)] backdrop-blur-sm fixed inset-0 flex pt-25">
			<div className="relative modal-content flex flex-col justify-between items-center bg-white p-6 rounded-2xl w-full h-74">
				<p className="text-[40px] mb-4">{message}</p>
				<div className="flex gap-8">
					<button
						onClick={onClose}
						className="border-2 w-[280px] h-[64px] cursor-pointer border-[rgba(180,180,180,1)] py-2 px-4 rounded-2xl"
					>
						{t('confirmClose')}
					</button>
					<button
						onClick={onClose}
						className="bg-[rgba(255,95,0,1)] w-[280px] h-[64px] cursor-pointer text-white py-2 px-4 rounded-2xl"
					>
						{t('confirmApply')}
					</button>
				</div>
				<button
					onClick={onClose}
					className="absolute top-4 right-4"
				>
					{t('closeIcon')}
				</button>
			</div>
		</div>
	)
}

export default Conformation
