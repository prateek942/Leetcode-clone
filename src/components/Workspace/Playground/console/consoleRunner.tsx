import React from 'react'
import { BsPlayFill, BsCloudArrowUp } from 'react-icons/bs'

type Props = {
	handleRun: () => void;
	handleSubmit: () => void;
	output: string | null;
};

// Bottom action bar of the code editor
const UserConsole = ({ handleRun, handleSubmit }: Props) => {
	return (
		<div className='flex h-12 shrink-0 items-center justify-end gap-2 border-t border-zinc-800 bg-zinc-900 px-3'>
			<button className='btn-secondary py-1.5' onClick={handleRun}>
				<BsPlayFill size={16} />
				Run
			</button>
			<button
				className='inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-400'
				onClick={handleSubmit}
			>
				<BsCloudArrowUp size={16} />
				Submit
			</button>
		</div>
	)
}

export default UserConsole
