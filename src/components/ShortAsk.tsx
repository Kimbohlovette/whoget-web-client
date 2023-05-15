import React from 'react';
import { useRouter } from 'next/router';

const ShortAsk = (props: { ask: any }) => {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push(`../asks/${props.ask.id}`);
			}}
			className="flex flex-row gap-x-2 sm:gap-x-5"
		>
			<div className="h-12 rounded-full bg-slate-200 border aspect-square"></div>
			<div className="flex-1">
				<p className="w-full max-w-md md:max-w-lg">
					{props.ask.message}
				</p>
			</div>
			<div>
				<button className="px-8 py-2 text-white bg-primary-500 rounded-lg text-sm font-medium hover:bg-primary-600">
					Hide
				</button>
			</div>
		</div>
	);
};

export default ShortAsk;
