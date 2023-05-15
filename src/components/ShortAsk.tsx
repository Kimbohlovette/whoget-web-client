/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import { textShortener } from '@/shared/textShortener';

const ShortAsk = (props: { ask: any }) => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push(`../asks/${props.ask.id}`);
			}}
			className="flex flex-row gap-x-2 items-center sm:gap-x-5 text-sm text-slate-600 cursor-pointer"
		>
			<div className="h-14 rounded-md overflow-hidden bg-slate-200 border aspect-square">
				<img
					src={props.ask.imageUrl}
					alt=""
					className="w-full h-full object-center object-cover"
				/>
			</div>
			<div className="flex-1">
				<p className="w-full max-w-md md:max-w-lg">
					{textShortener(props.ask.message, 13)}
				</p>
			</div>
			<div>
				<button className="px-4 py-1 text-white bg-primary-500 rounded-md text-xs font-medium hover:bg-primary-600">
					{props.ask.status === 'visible' ? 'Hide' : 'Unhide'}
				</button>
			</div>
		</div>
	);
};

export default ShortAsk;
