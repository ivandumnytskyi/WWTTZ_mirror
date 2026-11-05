import { useTranslation } from 'react-i18next'

const Conformation = ({
	onConfirm,
	onCancel,
	onClose,
	message
}: {
	onConfirm: () => void
	onCancel: () => void
	onClose: () => void
	message: string
}) => {
	const { t } = useTranslation('filter')

	return (
		<div
			className="absolute inset-0 z-30 flex justify-center rounded-2xl bg-[rgba(27,27,27,0.3)] backdrop-blur-sm pt-[180px]"
			onClick={e => {
				if (e.target === e.currentTarget) {
					onClose()
				}
			}}
		>
			<div className="relative modal-content flex flex-col justify-between items-center bg-white p-6 rounded-2xl w-full h-74">
				<p className="text-[40px] mb-4">{message}</p>
				<div className="flex gap-8">
					<button
						onClick={onCancel}
						className="border-2 w-[280px] h-[64px] cursor-pointer border-[rgba(180,180,180,1)] py-2 px-4 rounded-2xl"
					>
						{t('confirmClose')}
					</button>
					<button
						onClick={onConfirm}
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
